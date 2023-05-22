import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../utils/api/index";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm"

export default function AddCard() {

  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "", deckId: "" });
  const { deckId } = useParams()

  useEffect(() => {
    const deckInfo = async () => {
      const response = await readDeck(deckId);
      setDeck(() => response);
    };
    deckInfo();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCard({ ...card, deckId: deckId });
    await createCard(deckId, card);
    setCard({ front: "", back: "", deckId: "" });
  };

  function changeFront(event) {
    setCard({ ...card, front: event.target.value });
  }

  function changeBack(event) {
    setCard({ ...card, back: event.target.value });
  }

  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>

          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>

      <h4>{deck.name}: Add Card</h4>
      <CardForm
        submitHandler={handleSubmit}
        card={card}
        changeFront={changeFront}
        changeBack={changeBack}
      />
    </div>
  );
}