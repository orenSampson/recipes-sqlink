import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';

import { FullRecipeInnerUse } from '../../../models/recipes';
import { RecipesContext } from '../../../store/recipes-context';

import classes from './AddRecipe.module.css';

const AddRecipe: React.FC = () => {
  const [ingredientsArray, setingredientsArray] = useState<string[]>([]);

  const recipesCtx = useContext(RecipesContext);

  const mealNameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const imageURLRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);

  const mealName = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <div className={classes.input_field}>
          <TextField label="Meal Name" inputRef={mealNameRef} type="text" />
        </div>
      </FormControl>
    </div>
  );

  const category = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <InputLabel id="category">Pick a Category</InputLabel>
        <Select
          className={classes.select_category}
          labelId="category"
          defaultValue=""
          label="category"
          inputRef={categoryRef}
        >
          {recipesCtx.categories.map((category) => {
            return (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );

  const imageURL = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <div className={classes.input_field}>
          <TextField label="Image URL" inputRef={imageURLRef} type="text" />
        </div>
      </FormControl>
    </div>
  );

  const instructions = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <div className={classes.input_field}>
          <TextField
            label="Instructions"
            multiline
            maxRows={6}
            inputRef={instructionsRef}
            type="text"
          />
        </div>
      </FormControl>
    </div>
  );

  const ingredient = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <div className={classes.input_field}>
          <TextField label="Ingredient" inputRef={ingredientRef} type="text" />
        </div>
      </FormControl>
      <Button variant="contained" onClick={onAddIngredientHandler}>
        +
      </Button>
    </div>
  );

  function onAddIngredientHandler() {
    const newIngredient = ingredientRef.current!.value.trim();

    if (newIngredient) {
      setingredientsArray((prevIngredientsArray) => {
        return [...prevIngredientsArray, newIngredient];
      });

      ingredientRef.current!.value = '';
    }
  }

  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newRecipe: FullRecipeInnerUse = {
      idMeal: crypto.randomUUID(),
      strMeal: mealNameRef.current!.value,
      strCategory: categoryRef.current!.value,
      strMealThumb: imageURLRef.current!.value,
      strInstructions: instructionsRef.current!.value,
      strIngredientsArray: ingredientsArray,
    };

    recipesCtx.onAddUserFullRecipeHandler(newRecipe);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Typography variant="h4" gutterBottom>
        Add Recipe
      </Typography>
      {mealName}
      {category}
      {imageURL}
      {instructions}
      {ingredient}
      <div className={classes.form_control}>
        <Link to="/">
          <Button variant="contained" size="large">
            back
          </Button>
        </Link>
        <Button
          type="submit"
          variant="outlined"
          disabled={
            !mealNameRef.current?.value.trim() &&
            !categoryRef.current?.value &&
            !imageURLRef.current?.value.trim() &&
            !instructionsRef.current?.value.trim() &&
            !ingredientsArray.length
          }
        >
          Add Recipe
        </Button>
      </div>
    </form>
  );
};

export default AddRecipe;
