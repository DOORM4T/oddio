import React from "react";
import Header from "../components/Header";
import LoginForm from "../containers/LoginForm";
import Spacing from "../components/Spacing";

export default function Account() {
  return (
    <article>
      <Header title="Account 🔐" />
      <Spacing spaces={3} />
      <LoginForm />
    </article>
  );
}
