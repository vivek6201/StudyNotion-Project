import React, { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CustomButton({
  children,
  ...props
}: CustomButtonProps) {
  return <button {...props}>{children}</button>;
}
