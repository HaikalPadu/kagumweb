import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from './mail.ts';

async function request(body, method = 'POST') {
  const req = { method, headers: { 'content-type': 'application/json' }, socket: { remoteAddress: 'local-test' }, body };
  let result;
  const res = { statusCode: 200, setHeader() {}, end(raw) { result = { status: this.statusCode, body: JSON.parse(raw) }; } };
  await handler(req, res); return result;
}
test('rejects GET without sending', async () => assert.equal((await request({}, 'GET')).status, 405));
test('rejects invalid email', async () => assert.equal((await request({ topic: 'Contact enquiry', fields: { name: 'Test', email: 'invalid' } })).status, 400));
test('requires career employment type', async () => assert.equal((await request({ topic: 'Career application', fields: { consent: 'on', name: 'Test', email: 'test@example.com' } })).status, 400));
test('requires a social management package', async () => assert.equal((await request({ topic: 'Kagum Digital application', fields: { consent: 'on', name: 'Test', email: 'test@example.com', service: 'Social Media Management' } })).status, 400));
test('never reports success when SMTP is missing', async () => {
  // This test deliberately disables SMTP to ensure no test email is sent.
  const previous = process.env.SMTP_HOST; delete process.env.SMTP_HOST;
  try { const result = await request({ topic: 'Programme registration', fields: { consent: 'on', name: 'Test', email: 'test@example.com', selection: 'AI Fundamentals' } }); assert.equal(result.status, 503); assert.equal(result.body.ok, undefined); }
  finally { if (previous !== undefined) process.env.SMTP_HOST = previous; }
});
