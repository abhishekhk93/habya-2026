"use client";

import { useState } from "react";
import Link from "next/link";
import { signInFormStyles as s } from "./AuthForm.styles";
import type { SignInFormProps } from "./AuthForm.types";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export default function AuthForm(props: SignInFormProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h1 className={s.header}>
          {activeTab === 'login' ? 'Login' : 'Register'}
        </h1>

        {activeTab === 'login' ? <LoginForm {...props} /> : <RegisterForm {...props} />}

        <div className={s.toggleContainer}>
          {activeTab === 'login' ? (
            <p>
              Don't have an account? 
              <button 
                type="button" 
                onClick={() => setActiveTab('register')} 
                className={s.toggleLink}
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account? 
              <button 
                type="button" 
                onClick={() => setActiveTab('login')} 
                className={s.toggleLink}
              >
                Login
              </button>
            </p>
          )}
        </div>

        <Link href="/" className={s.backLink}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
