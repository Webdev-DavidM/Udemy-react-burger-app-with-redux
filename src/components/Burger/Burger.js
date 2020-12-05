import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let ingredientsArray = [];
  Object.keys(props.ingredients).forEach((igKey) => {
    if (props.ingredients[igKey].amount !== 0) {
      for (let i = 0; i < props.ingredients[igKey].amount; i++) {
        ingredientsArray.push(
          <BurgerIngredient type={igKey} key={igKey + i} />
        );
      }
    }
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
