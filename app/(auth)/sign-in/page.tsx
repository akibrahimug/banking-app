import AuthForm from "@/components/AuthForm";
import React from "react";
import { ensureDemoUser } from "@/lib/actions/user.actions";

async function SignIn() {
  // Pre-warm demo account so users always have working credentials
  await ensureDemoUser();
  return (
    <section className="w-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
}

export default SignIn;
