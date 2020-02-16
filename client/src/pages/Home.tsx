import React from "react";
import { Link } from "react-router-dom";
import Spacing from "../components/Spacing";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SoundCatalogContainer from "../containers/SoundCatalogContainer";
import Button from "../components/Button";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <article>
      <Header title="SoundBird 🐦" />
      <main data-aos="fade">
        <Spacing spaces={2} />
        <SearchBar />
        <Spacing spaces={1} />
        <SoundCatalogContainer />
        <Spacing spaces={5} />
        <div data-aos="fade">
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </article>
  );
}
