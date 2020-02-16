import React from "react";
import { Link } from "react-router-dom";
import Spacing from "../../components/Spacing";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SoundCatalogContainer from "../../containers/SoundCatalogContainer";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <article>
      <Header title="SoundBird 🐦" />
      <Spacing spaces={2} />
      <main className={styles.home} data-aos="fade">
        <SearchBar />
        <Spacing spaces={1} />
        <SoundCatalogContainer />
        <Spacing spaces={5} />
        <div data-aos="zoom-in" data-aos-anchor-placement="bottom top">
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </article>
  );
}
