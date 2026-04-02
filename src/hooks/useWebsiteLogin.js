import { useState } from "react";

export function useWebsiteLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically interact with your authentication API
    console.log("Login attempt:", { email, password });
    // Implement actual login logic here
  };

  const handleForgot = () => {
    console.log("Forgot password for:", email);
    // Implement password reset logic
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    handleForgot
  };
}
