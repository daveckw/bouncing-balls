import React, { useState, useEffect, useCallback } from "react";
import Ball from "./components/Ball";

const App = () => {
  //
  const [actors, setActors] = useState({
    actor1: {
      id: "actor1",
      x: 100,
      y: 100,
      vx: 2,
      vy: 2,
      color: "red",
      mass: 2,
    },
    actor2: {
      id: "actor2",
      x: 200,
      y: 200,
      vx: -1.5,
      vy: 1.5,
      color: "blue",
      mass: 1.5,
    },
    actor3: {
      id: "actor3",
      x: 300,
      y: 300,
      vx: 1,
      vy: -1,
      color: "green",
      mass: 1.3,
    },
    actor4: {
      id: "actor4",
      x: 500,
      y: 500,
      vx: 1,
      vy: -1,
      color: "yellow",
      mass: 1.8,
    },
  });

  const ballRadius = 25; // Assuming diameter is 50

  const checkCollision = useCallback((actor1, actor2) => {
    const dx = actor1.x - actor2.x;
    const dy = actor1.y - actor2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < ballRadius * 2;
  }, []);

  const resolveCollision = useCallback((actor1, actor2) => {
    const dx = actor2.x - actor1.x;
    const dy = actor2.y - actor1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normal vector
    const nx = dx / distance;
    const ny = dy / distance;

    // Tangent vector
    const tx = -ny;
    const ty = nx;

    // Dot product tangent
    const dpTan1 = actor1.vx * tx + actor1.vy * ty;
    const dpTan2 = actor2.vx * tx + actor2.vy * ty;

    // Dot product normal
    const dpNorm1 = actor1.vx * nx + actor1.vy * ny;
    const dpNorm2 = actor2.vx * nx + actor2.vy * ny;

    // Conservation of momentum in 1D
    const m1 =
      (dpNorm1 * (actor1.mass - actor2.mass) + 2 * actor2.mass * dpNorm2) /
      (actor1.mass + actor2.mass);
    const m2 =
      (dpNorm2 * (actor2.mass - actor1.mass) + 2 * actor1.mass * dpNorm1) /
      (actor1.mass + actor2.mass);

    // Update velocities
    const newVx1 = tx * dpTan1 + nx * m1;
    const newVy1 = ty * dpTan1 + ny * m1;
    const newVx2 = tx * dpTan2 + nx * m2;
    const newVy2 = ty * dpTan2 + ny * m2;

    // Separate the balls slightly to prevent sticking
    const overlap = 2 * ballRadius - distance;
    const separationX = (overlap / 2) * nx;
    const separationY = (overlap / 2) * ny;

    return {
      [actor1.id]: {
        ...actor1,
        vx: newVx1,
        vy: newVy1,
        x: actor1.x - separationX,
        y: actor1.y - separationY,
      },
      [actor2.id]: {
        ...actor2,
        vx: newVx2,
        vy: newVy2,
        x: actor2.x + separationX,
        y: actor2.y + separationY,
      },
    };
  }, []);

  const handleCollisions = useCallback(() => {
    setActors((prevActors) => {
      const newActors = { ...prevActors };
      const actorList = Object.values(newActors);
      for (let i = 0; i < actorList.length; i++) {
        for (let j = i + 1; j < actorList.length; j++) {
          if (checkCollision(actorList[i], actorList[j])) {
            const resolvedActors = resolveCollision(actorList[i], actorList[j]);
            Object.assign(newActors, resolvedActors);
          }
        }
      }
      return newActors;
    });
  }, [checkCollision, resolveCollision]);

  const updatePositions = useCallback(() => {
    //
    setActors((prevActors) => {
      const newActors = { ...prevActors };
      Object.values(newActors).forEach((actor) => {
        let newX = actor.x + actor.vx;
        let newY = actor.y + actor.vy;
        let newVx = actor.vx;
        let newVy = actor.vy;

        // Check and handle horizontal boundaries
        if (newX <= 0) {
          newVx = Math.abs(actor.vx); // Ensure positive velocity
        } else if (newX + ballRadius * 2 >= window.innerWidth) {
          newVx = -Math.abs(actor.vx); // Ensure negative velocity
        }

        // Check and handle vertical boundaries
        if (newY <= 0) {
          newVy = Math.abs(actor.vy); // Ensure positive velocity
        } else if (newY + ballRadius * 2 >= window.innerHeight) {
          newVy = -Math.abs(actor.vy); // Ensure negative velocity
        }

        newActors[actor.id] = {
          ...actor,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      });
      return newActors;
    });
  }, []);

  const addRandomActor = () => {
    const newId = `actor${Object.keys(actors).length + 1}`;
    const newActor = {
      id: newId,
      x: Math.random() * (window.innerWidth - ballRadius * 2),
      y: Math.random() * (window.innerHeight - ballRadius * 2),
      vx: (Math.random() - 0.5) * 6, // Random velocity between -2 and 2
      vy: (Math.random() - 0.5) * 6, // Random velocity between -2 and 2
      color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`,
      mass: Math.random() * 1.5 + 0.5, // Random mass between 0.5 and 2
    };

    setActors((prevActors) => ({
      ...prevActors,
      [newId]: newActor,
    }));
  };

  useEffect(() => {
    //
    const intervalId = setInterval(() => {
      updatePositions();
      handleCollisions();
    }, 10); // Update ~60 times per second

    return () => clearInterval(intervalId);
    //
  }, [updatePositions, handleCollisions]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {Object.values(actors).map((actor) => (
        <Ball key={actor.id} {...actor} />
      ))}
      <button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={addRandomActor}
      >
        Add Actor
      </button>
    </div>
  );
};

export default App;
