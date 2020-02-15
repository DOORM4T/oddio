import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SoundCatalogContainer from "../containers/SoundCatalogContainer";
import Button from "../components/Button";

export default function Home() {
  return (
    <>
      <Header title="SoundBird 🐦" />
      <main>
        <SearchBar />
        <SoundCatalogContainer />
        <div style={{ textAlign: "center" }}>
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </main>
      <footer>Made with 💖 and 💔 by Matt Seto</footer>
    </>
  );
}
