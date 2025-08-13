import AuthForm from "@/components/AuthForm";
import React from "react";

function SignUp() {
  return (
    <section className="w-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
}

export default SignUp;
