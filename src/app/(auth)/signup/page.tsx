import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign up | Make & Send",
  description: "Create your Make & Send account",
};

async function signUpWithPassword(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    redirect("/signup?error=Please+fill+in+all+fields");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/signup?message=Check+your+email+to+confirm+your+account");
}

async function signUpWithGoogle() {
  "use server";

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    redirect(data.url);
  }
}

export default async function SignupPage(props: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <h1 className="mb-2 text-center text-xl font-bold text-navy">
        Create an account
      </h1>
      <p className="mb-6 text-center text-sm text-navy/60">
        Get started with Make &amp; Send
      </p>

      {searchParams.error && (
        <div className="mb-4 rounded-lg bg-coral/10 px-4 py-2.5 text-sm text-coral">
          {searchParams.error}
        </div>
      )}

      {searchParams.message && (
        <div className="mb-4 rounded-lg bg-mint/10 px-4 py-2.5 text-sm text-mint">
          {searchParams.message}
        </div>
      )}

      <form action={signUpWithPassword} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className="w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={6}
            placeholder="At least 6 characters"
            className="w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
        >
          Create account
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-navy/[0.08]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-navy/40">or</span>
        </div>
      </div>

      <form action={signUpWithGoogle}>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-cream/60"
        >
          <svg className="size-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-navy/60">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-gold-dark hover:text-gold"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
