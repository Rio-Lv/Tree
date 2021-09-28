import React, { useEffect } from "react";

function Universe() {
  const createUniverse = (N) => {
    const universe = [];
    for (let i = 0; i < N; i++) {
      const entity = [];
      for (let j = i; j < N - 1; j++) {
        entity.push(Math.random());
      }
      universe.push(entity);
    }
    return universe;
  };
  useEffect(() => {
    const universe = createUniverse(4);
    console.log("universe", universe);
  }, []);

  return <div></div>;
}

export default Universe;
