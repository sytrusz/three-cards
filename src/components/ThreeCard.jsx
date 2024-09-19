import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Player from './Player';

function getRandomCard() {
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const suits = ['hearts', 'clubs', 'spades', 'diamonds'];
  const value = values[Math.floor(Math.random() * values.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const cardImage = `/Cards/${getCardName(value)}_of_${suit}.png`;

  return { value, suit, cardImage };
}

function getCardName(value) {
  if (value === 11) return 'jack';
  if (value === 12) return 'queen';
  if (value === 13) return 'king';
  return value.toString();
}

function evaluateHand(cards) {
  const valueCounts = cards.reduce((acc, card) => {
    acc[card.value] = (acc[card.value] || 0) + 1;
    return acc;
  }, {});

  const sortedCards = cards.slice().sort((a, b) => b.value - a.value);
  const counts = Object.values(valueCounts).sort((a, b) => b - a);

  if (counts[0] === 3) {
    return { type: 'Three-of-a-Kind', highCard: sortedCards[0].value };
  } else if (counts[0] === 2) {
    return { type: 'One-Pair', highCard: sortedCards[0].value, kicker: sortedCards[2].value };
  } else {
    return { type: 'High Card', highCards: sortedCards.map(card => card.value) };
  }
}

function determineWinner(hand1, hand2) {
  const handHierarchy = ['Three-of-a-Kind', 'One-Pair', 'High Card'];

  const rank1 = handHierarchy.indexOf(hand1.type);
  const rank2 = handHierarchy.indexOf(hand2.type);

  if (rank1 < rank2) return 1; // hand1 wins
  if (rank1 > rank2) return 2; // hand2 wins

  // Compare cards of the same type
  if (hand1.type === 'One-Pair') {
    if (hand1.highCard > hand2.highCard) return 1;
    if (hand1.highCard < hand2.highCard) return 2;
    return hand1.kicker > hand2.kicker ? 1 : 2;
  } else if (hand1.type === 'High Card') {
    for (let i = 0; i < hand1.highCards.length; i++) {
      if (hand1.highCards[i] > hand2.highCards[i]) return 1;
      if (hand1.highCards[i] < hand2.highCards[i]) return 2;
    }
  }
  return 0;
}

function ThreeCard() {
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const drawCards = () => {
    const player1InitialCards = Array.from({ length: 3 }, getRandomCard);
    const player2InitialCards = Array.from({ length: 3 }, getRandomCard);

    setPlayer1Cards(player1InitialCards);
    setPlayer2Cards(player2InitialCards);

    const player1Hand = evaluateHand(player1InitialCards);
    const player2Hand = evaluateHand(player2InitialCards);

    const winner = determineWinner(player1Hand, player2Hand);

    if (winner === 1) {
      setPlayer1Score(player1Score + 1);
    } else if (winner === 2) {
      setPlayer2Score(player2Score + 1);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Three Cards</Typography>
      <Box display="flex" justifyContent="space-around">
        <Player playerName="Player 1" cards={player1Cards} score={player1Score} />
        <Player playerName="Player 2" cards={player2Cards} score={player2Score} />
      </Box>
      <Box textAlign="center" mt={2}>
        <Button variant="contained" onClick={drawCards}>Draw Cards</Button>
      </Box>
    </Box>
  );
}

export default ThreeCard;
