"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-driven fluid backdrop.
 *
 * A GPU fluid simulation (semi-Lagrangian advection + Jacobi pressure solve +
 * vorticity confinement — the standard Stable Fluids formulation) rendered to a
 * canvas. Pointer movement injects velocity and dye, so the background swirls
 * like water under the cursor.
 *
 * Everything is best-effort: if WebGL, the float textures, or any shader are
 * unavailable the component renders nothing and the CSS gradient behind it
 * remains the background. It also stays out of the way for reduced-motion.
 */

const SIM_RESOLUTION = 128;
const DYE_RESOLUTION = 512;
const DENSITY_DISSIPATION = 0.965;
const VELOCITY_DISSIPATION = 0.982;
const PRESSURE_DISSIPATION = 0.8;
const PRESSURE_ITERATIONS = 18;
const CURL = 26;
const SPLAT_RADIUS = 0.0022;
const SPLAT_FORCE = 5200;

// Brand palette the dye is tinted with.
const PALETTE = [
  [0.93, 0.41, 0.16], // orange
  [0.31, 0.36, 0.84], // indigo
  [0.55, 0.4, 0.85], // violet
  [0.96, 0.63, 0.47] // warm sand
];

const BASE_VERTEX = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const CLEAR_SHADER = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

const SPLAT_SHADER = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const ADVECTION_SHADER = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    gl_FragColor = dissipation * texture2D(uSource, coord);
    gl_FragColor.a = 1.0;
  }
`;

const DIVERGENCE_SHADER = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const CURL_SHADER = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const VORTICITY_SHADER = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const PRESSURE_SHADER = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const GRADIENT_SUBTRACT_SHADER = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const DISPLAY_SHADER = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    // Soft roll-off keeps the dye glowing rather than clipping to white.
    c = c / (1.0 + c);
    // Opaque: black contributes nothing under the page's screen blend.
    gl_FragColor = vec4(c, 1.0);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl, vertexShader, fragmentSource) {
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

  for (let i = 0; i < count; i += 1) {
    const name = gl.getActiveUniform(program, i).name;
    uniforms[name] = gl.getUniformLocation(program, name);
  }

  return { program, uniforms };
}

export default function FluidBackdrop({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const params = { alpha: false, depth: false, stencil: false, antialias: false, premultipliedAlpha: false };
    const gl2 = canvas.getContext("webgl2", params);
    const gl = gl2 || canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);

    if (!gl) return undefined;

    const isWebGL2 = Boolean(gl2);
    let halfFloat;
    let supportLinearFiltering;

    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    }

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;
    if (!halfFloatTexType) return undefined;

    gl.clearColor(0, 0, 0, 0);

    const supportRenderTextureFormat = (internalFormat, format, type) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

      gl.deleteTexture(texture);
      gl.deleteFramebuffer(fbo);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return status === gl.FRAMEBUFFER_COMPLETE;
    };

    const getSupportedFormat = (internalFormat, format, type) => {
      if (supportRenderTextureFormat(internalFormat, format, type)) {
        return { internalFormat, format };
      }

      if (!isWebGL2) return null;

      if (internalFormat === gl.R16F) return getSupportedFormat(gl.RG16F, gl.RG, type);
      if (internalFormat === gl.RG16F) return getSupportedFormat(gl.RGBA16F, gl.RGBA, type);
      return null;
    };

    const formatRGBA = isWebGL2
      ? getSupportedFormat(gl.RGBA16F, gl.RGBA, halfFloatTexType)
      : getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
    const formatRG = isWebGL2
      ? getSupportedFormat(gl.RG16F, gl.RG, halfFloatTexType)
      : getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
    const formatR = isWebGL2
      ? getSupportedFormat(gl.R16F, gl.RED, halfFloatTexType)
      : getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);

    if (!formatRGBA || !formatRG || !formatR) return undefined;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, BASE_VERTEX);
    if (!vertexShader) return undefined;

    const programs = {
      clear: createProgram(gl, vertexShader, CLEAR_SHADER),
      splat: createProgram(gl, vertexShader, SPLAT_SHADER),
      advection: createProgram(gl, vertexShader, ADVECTION_SHADER),
      divergence: createProgram(gl, vertexShader, DIVERGENCE_SHADER),
      curl: createProgram(gl, vertexShader, CURL_SHADER),
      vorticity: createProgram(gl, vertexShader, VORTICITY_SHADER),
      pressure: createProgram(gl, vertexShader, PRESSURE_SHADER),
      gradientSubtract: createProgram(gl, vertexShader, GRADIENT_SUBTRACT_SHADER),
      display: createProgram(gl, vertexShader, DISPLAY_SHADER)
    };

    if (Object.values(programs).some((entry) => !entry)) return undefined;

    // Fullscreen triangle pair.
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const blit = (target) => {
      if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }

      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    const filtering = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    const createFBO = (w, h, internalFormat, format, type, param) => {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        }
      };
    };

    const createDoubleFBO = (w, h, internalFormat, format, type, param) => {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        get write() {
          return fbo2;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    };

    const getResolution = (resolution) => {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1 / aspectRatio;

      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);

      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max };
    };

    let dye;
    let velocity;
    let divergence;
    let curlFbo;
    let pressure;

    const disposeFBO = (target) => {
      if (!target) return;
      gl.deleteTexture(target.texture);
      gl.deleteFramebuffer(target.fbo);
    };

    const disposeFramebuffers = () => {
      [dye, velocity, pressure].forEach((target) => {
        if (!target) return;
        disposeFBO(target.read);
        disposeFBO(target.write);
      });
      disposeFBO(divergence);
      disposeFBO(curlFbo);
    };

    const initFramebuffers = () => {
      disposeFramebuffers();

      const simRes = getResolution(SIM_RESOLUTION);
      const dyeRes = getResolution(DYE_RESOLUTION);

      dye = createDoubleFBO(
        dyeRes.width,
        dyeRes.height,
        formatRGBA.internalFormat,
        formatRGBA.format,
        halfFloatTexType,
        filtering
      );
      velocity = createDoubleFBO(
        simRes.width,
        simRes.height,
        formatRG.internalFormat,
        formatRG.format,
        halfFloatTexType,
        filtering
      );
      divergence = createFBO(
        simRes.width,
        simRes.height,
        formatR.internalFormat,
        formatR.format,
        halfFloatTexType,
        gl.NEAREST
      );
      curlFbo = createFBO(
        simRes.width,
        simRes.height,
        formatR.internalFormat,
        formatR.format,
        halfFloatTexType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        formatR.internalFormat,
        formatR.format,
        halfFloatTexType,
        gl.NEAREST
      );
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }

      return false;
    };

    resizeCanvas();
    initFramebuffers();

    const splat = (x, y, dx, dy, color) => {
      const { program, uniforms } = programs.splat;
      gl.useProgram(program);
      gl.uniform1i(uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(uniforms.point, x, y);
      gl.uniform3f(uniforms.color, dx, dy, 0);
      gl.uniform1f(uniforms.radius, SPLAT_RADIUS);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(uniforms.color, color[0], color[1], color[2]);
      blit(dye.write);
      dye.swap();
    };

    let colorIndex = Math.floor(Math.random() * PALETTE.length);
    const nextColor = (intensity) => {
      colorIndex = (colorIndex + 1) % PALETTE.length;
      const base = PALETTE[colorIndex];
      return [base[0] * intensity, base[1] * intensity, base[2] * intensity];
    };

    const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, down: false, seeded: false };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;

      if (!pointer.seeded) {
        pointer.seeded = true;
        pointer.x = x;
        pointer.y = y;
        return;
      }

      pointer.dx = (x - pointer.x) * SPLAT_FORCE;
      pointer.dy = (y - pointer.y) * SPLAT_FORCE;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = Math.abs(pointer.dx) > 0 || Math.abs(pointer.dy) > 0;
    };

    const onPointerMove = (event) => {
      updatePointer(event);
    };

    const onPointerDown = (event) => {
      updatePointer(event);
      pointer.down = true;
      splat(pointer.x, pointer.y, pointer.dx * 1.6, pointer.dy * 1.6, nextColor(0.5));
    };

    const onPointerUp = () => {
      pointer.down = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    // A gentle drift so the page still breathes when nobody is moving.
    const idleSplat = () => {
      if (document.hidden) return;
      const x = Math.random();
      const y = Math.random() * 0.6 + 0.2;
      const dx = (Math.random() - 0.5) * 900;
      const dy = (Math.random() - 0.5) * 900;
      splat(x, y, dx, dy, nextColor(0.22));
    };

    for (let i = 0; i < 5; i += 1) idleSplat();
    const idleTimer = window.setInterval(idleSplat, 2600);

    let lastTime = performance.now();
    let raf = 0;

    const step = (dt) => {
      gl.disable(gl.BLEND);

      // Curl
      gl.useProgram(programs.curl.program);
      gl.uniform2f(programs.curl.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.curl.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlFbo);

      // Vorticity confinement
      gl.useProgram(programs.vorticity.program);
      gl.uniform2f(programs.vorticity.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.vorticity.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(programs.vorticity.uniforms.uCurl, curlFbo.attach(1));
      gl.uniform1f(programs.vorticity.uniforms.curl, CURL);
      gl.uniform1f(programs.vorticity.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // Divergence
      gl.useProgram(programs.divergence.program);
      gl.uniform2f(programs.divergence.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.divergence.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // Decay pressure
      gl.useProgram(programs.clear.program);
      gl.uniform1i(programs.clear.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(programs.clear.uniforms.value, PRESSURE_DISSIPATION);
      blit(pressure.write);
      pressure.swap();

      // Jacobi pressure solve
      gl.useProgram(programs.pressure.program);
      gl.uniform2f(programs.pressure.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.pressure.uniforms.uDivergence, divergence.attach(0));

      for (let i = 0; i < PRESSURE_ITERATIONS; i += 1) {
        gl.uniform1i(programs.pressure.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // Make the velocity field divergence-free
      gl.useProgram(programs.gradientSubtract.program);
      gl.uniform2f(
        programs.gradientSubtract.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(programs.gradientSubtract.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(programs.gradientSubtract.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // Advect velocity, then dye
      gl.useProgram(programs.advection.program);
      gl.uniform2f(programs.advection.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velocityId = velocity.read.attach(0);
      gl.uniform1i(programs.advection.uniforms.uVelocity, velocityId);
      gl.uniform1i(programs.advection.uniforms.uSource, velocityId);
      gl.uniform1f(programs.advection.uniforms.dt, dt);
      gl.uniform1f(programs.advection.uniforms.dissipation, VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // texelSize intentionally stays at the velocity grid's scale here.
      gl.uniform1i(programs.advection.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(programs.advection.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(programs.advection.uniforms.dissipation, DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    };

    const render = () => {
      gl.disable(gl.BLEND);
      gl.useProgram(programs.display.program);
      gl.uniform1i(programs.display.uniforms.uTexture, dye.read.attach(0));
      blit(null);
    };

    const frame = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.0166);
      lastTime = now;

      if (resizeCanvas()) initFramebuffers();

      if (pointer.moved) {
        pointer.moved = false;
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, nextColor(0.3));
      }

      step(dt);
      render();

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(idleTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      disposeFramebuffers();

      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
