import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SoundCatalogContainer from "../containers/SoundCatalogContainer";
import Button from "../components/Button";
import Footer from "../components/Footer";

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
      <Footer />
    </>
  );
}
