import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {readDeck} from "../utils/api/index";


function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const history = useHistory();
    const {deckId} = useParams();
    const [cardIndexNumber, setCardIndexNumber] = useState(0);
    const [flip, setFlip] = useState(false);
    const [cardsLength, setCardsLength] = useState(0);


    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
             setDeck(response);
             setCards(response.cards);
             setCardsLength(response.cards.length);
        }
        loadDeck();
    }, [deckId]);

    const nextButtonHandler = () => {
        setCardIndexNumber(cardIndexNumber + 1)
        if (cardIndexNumber === cardsLength - 1) {
            if (
                window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")
            ) {
                setCardIndexNumber(0);
                setFlip(false);
            } else {
                history.push("/");
            }
        } 
        else {
            setCardIndexNumber(cardIndexNumber + 1);
            setFlip(false);
        }
    }
    
    if (cardsLength <= 2) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                Home
                            </Link>                
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>    
                </nav>
                <h1>{deck.name}: Study</h1>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cardsLength} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary ml-2 float-left">
                    Add Cards
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">  
                                Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>    
                </nav>
            </div>
            <div>
                <h1>{deck.name}: Study</h1>
            </div>
            <div className="card gap-4 d-md-block mt-2 mb-4">
                <div className="card-body">
                    <h2>Card {cardIndexNumber+1} of {cardsLength}</h2>
                    <div>
                        {flip ? <p>{cards[cardIndexNumber].back}</p> : <p>{cards[cardIndexNumber].front}</p>}
                    </div>
                    <button className="btn btn-secondary m-1" type="button" onClick={() => setFlip(!flip)}>Flip</button>
                    {flip ? <button className="btn btn-primary m-1" type="button" onClick={nextButtonHandler}>Next</button> : <p></p>}
                </div>
            </div>
        </div>
    )
}

export default Study;