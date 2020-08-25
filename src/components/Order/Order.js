import React from 'react';
import classes from './Order.css';

export default function order(props) {
  let ingredients = [];
  for (const [key, value] of Object.entries(props.ingredients)) {
    ingredients.push(`${key}  ${value}`);
  }
  return (
    <div className={classes.Order}>
      <p>Ingredients </p>
      <div>
        {ingredients.map((ingred) => (
          <span className={classes.Ing}>{ingred}</span>
        ))}
      </div>
      <p>
        Price <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
}
