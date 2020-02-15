import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SoundCatalogContainer from "../../containers/SoundCatalogContainer";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <article className={styles.home}>
      <Header title="SoundBird 🐦" />
      <main>
        <SearchBar />
        <SoundCatalogContainer />
        <Link to="/login">
          <Button>Get Started</Button>
        </Link>
      </main>
      <Footer />
    </article>
  );
}
