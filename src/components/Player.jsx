import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function Player({ playerName, cards, score }) {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{playerName}</Typography>
        <Box display="flex" justifyContent="center" gap={1}>
          {cards.map((card, index) => (
            <Box key={index} sx={{ padding: '3px', textAlign: 'center' }}>
              <img src={card.cardImage} alt={`${card.value} of ${card.suit}`} style={{ width: '110px', height: '150px' }} />
            </Box>
          ))}
        </Box>
        <Typography variant="h6" sx={{ marginTop: '10px' }}>Score: {score}</Typography>
      </CardContent>
    </Card>
  );
}

export default Player;