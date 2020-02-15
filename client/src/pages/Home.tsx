import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SoundCatalogContainer from "../containers/SoundCatalogContainer";

export default function Home() {
  return (
    <>
      <Header title="SoundBird 🐦" />
      <main>
        <SearchBar />
        <SoundCatalogContainer />
        <button>Get Started</button>
      </main>
      <footer>Made with 💖 and 💔 by Matt Seto</footer>
    </>
  );
}
