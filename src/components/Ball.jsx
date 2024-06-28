import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Ball = ({ id, x, y, vx, vy, color }) => {
  const circleDiameter = 50;

  return (
    <Container
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
      maxWidth="none"
      disableGutters
    >
      <Box
        display={"none"}
        position="absolute"
        left={10}
        top={10 + (parseInt(id.slice(-1)) - 1) * 60}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>Velocity:</Typography>
          <Typography>{`x: ${vx.toFixed(2)}, y: ${vy.toFixed(2)}`}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>Position:</Typography>
          <Typography>{`x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`}</Typography>
        </Box>
      </Box>

      <div
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: circleDiameter,
          height: circleDiameter,
          borderRadius: "50%",
          background: color,
        }}
      />
    </Container>
  );
};

export default Ball;
