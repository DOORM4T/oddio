import React from "react";
import styles from "./Catalog.module.scss";

interface CatalogProps {
  render: () => object[];
}

export default function Catalog({ render }: CatalogProps) {
  return (
    <section className={styles.catalog}>
      <button className="button-left">◀</button>
      <ul>{render()}</ul>
      <button className="button-right">▶</button>
    </section>
  );
}
