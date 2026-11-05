# Direct application email

All four forms (programme registration, career applications, Kagum Digital and Contact Us) POST directly to `/api/applications`. No redirect or email-app handoff is used. The recipient is fixed on the server to info@kagum.co; the visitor's email is Reply-To.

## Required setup

Copy `.env.example` to `.env.local` and enter the SMTP settings from Kagum's email provider. Never commit credentials or paste passwords into chat. Set the same variables in the Vercel project environment and redeploy:

- `SMTP_HOST`: outgoing email server
- `SMTP_PORT`: 587 for STARTTLS or 465 for TLS
- `SMTP_USER`: authorised mailbox/login
- `SMTP_PASS`: SMTP password/app password
- `SMTP_FROM`: sender address authorised by that provider

Restart `npm run dev` after changing `.env.local`. Vite runs the endpoint locally; Vercel deploys `api/applications.ts` as a server function. `vite preview` serves static output only and does not run the email function.

The frontend displays success only after the SMTP server accepts the message. Missing configuration returns 503 with an honest error and preserves the form fields. SMTP acceptance does not guarantee inbox delivery; confirm actual receipt after configuring the provider.

The endpoint validates field sizes, email and origin, requires encrypted SMTP, and limits bursts in each server instance. Production-wide rate limiting should be configured in Vercel for public traffic. CVs are links, not file attachments.

Configuration follows https://nodemailer.com/smtp.
