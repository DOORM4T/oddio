import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <nav>
        <button>
          <Link to="/">🎤</Link>
        </button>
        <button>
          <Link to="/">⚙</Link>
        </button>
        <button>
          <Link to="/">👤</Link>
        </button>
      </nav>
    </header>
  );
}
