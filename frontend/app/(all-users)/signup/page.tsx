import Template from '@/components/core/auth/template';
import React from 'react'

export default function page() {
  return (
    <Template
      formType="signup"
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image="/assets/Images/signup.webp"
    />
  );
}
