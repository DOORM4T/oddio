import React, { useState, useEffect, ReactNode, ReactNodeArray } from "react";
import Catalog from "../components/Catalog";

interface Sound {
  _id: string;
  author: string;
  category: string;
  created: Date;
  description: string;
  fame: number;
  name: string;
  sourceId: string;
  triggers: string[];
}

export default function SoundCatalogContainer() {
  const [sounds, setSounds] = useState<Sound[]>([]);

  useEffect(() => {
    setSounds([
      {
        _id: "123",
        author: "author",
        category: "test",
        created: new Date(),
        description: "description",
        fame: 2,
        name: "Boom",
        sourceId: "1234",
        triggers: ["kaboom"],
      },
      {
        _id: "456",
        author: "author2",
        category: "test",
        created: new Date(),
        description: "description",
        fame: 2,
        name: "Boom",
        sourceId: "1234",
        triggers: ["kaboom"],
      },
      {
        _id: "789",
        author: "author3",
        category: "test",
        created: new Date(),
        description: "description",
        fame: 2,
        name: "Boom",
        sourceId: "1234",
        triggers: ["kaboom"],
      },
    ]);
  }, []);

  function renderFunction() {
    return sounds.map((sound, index) => (
      <li key={sound._id}>
        `${sound.name} - ${index}`,
      </li>
    ));
  }

  return <Catalog render={renderFunction} />;
}
