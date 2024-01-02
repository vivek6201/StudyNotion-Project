import Template from "@/components/core/auth/template";
import React from "react";

export default function page() {
  return (
    <Template
      formType="login"
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image="/assets/Images/login.webp"
    />
  );
}
