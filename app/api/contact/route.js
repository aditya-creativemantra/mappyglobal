const REQUIRED_FIELDS = ["name", "email", "contact", "industry", "location", "service"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const submission = REQUIRED_FIELDS.reduce((accumulator, field) => {
    accumulator[field] = clean(body?.[field]);
    return accumulator;
  }, {});

  const missing = REQUIRED_FIELDS.filter((field) => !submission[field]);

  if (missing.length) {
    return Response.json({ error: "Please complete every field." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(submission.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (submission.name.length > 120 || submission.email.length > 160) {
    return Response.json({ error: "Please shorten your name or email address." }, { status: 400 });
  }

  const record = { ...submission, receivedAt: new Date().toISOString() };

  // Forward the enquiry if a destination is configured; otherwise it is logged
  // server-side so nothing is silently dropped.
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const forwarded = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });

      if (!forwarded.ok) {
        console.error("Contact enquiry forwarding failed", forwarded.status, record);
        return Response.json({ error: "We could not send your enquiry. Please try again." }, { status: 502 });
      }
    } catch (forwardError) {
      console.error("Contact enquiry forwarding error", forwardError, record);
      return Response.json({ error: "We could not send your enquiry. Please try again." }, { status: 502 });
    }
  } else {
    console.info("Contact enquiry received", record);
  }

  return Response.json({ ok: true });
}
