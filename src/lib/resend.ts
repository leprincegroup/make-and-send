import { Resend } from "resend";

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

let _resend: Resend | undefined;
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    if (!_resend) {
      _resend = getResendClient();
    }
    return (_resend as unknown as Record<string | symbol, unknown>)[prop];
  },
});
