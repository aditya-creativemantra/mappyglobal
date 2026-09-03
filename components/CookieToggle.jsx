"use client";

export default function CookieToggle({ id, label, checked, disabled, onChange }) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-7 text-center">
      <p className="text-sm font-bold text-[#2c3272]">{label}</p>
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative h-8 w-16 rounded-full transition-colors ${
          checked ? "bg-[#ed6929]" : "bg-[#c3c7d8]"
        } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${
            checked ? "left-9" : "left-1"
          }`}
        />
      </button>
      {disabled ? <span className="text-[11px] uppercase tracking-[0.14em] text-[#6c7290]">Always on</span> : null}
    </div>
  );
}
