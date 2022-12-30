import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import { RecipesContext } from '../../../store/recipes-context';
import classes from './RecipesHeader.module.css';

const RecipesHeader: React.FC = (props) => {
  const recipesCtx = useContext(RecipesContext);

  useEffect(() => {
    recipesCtx.setChosenCategoryHandler(recipesCtx.categories[1]);

    recipesCtx.onCategoryChange(recipesCtx.categories[1]);
  }, []);

  const searchRecipesByNameRef = useRef<HTMLInputElement>(null);

  const menuItems = recipesCtx.categories.map((category) => {
    return (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    );
  });

  const onSelectChangeHandler = (event: SelectChangeEvent) => {
    searchRecipesByNameRef.current!.value = '';

    recipesCtx.setChosenCategoryHandler(event.target.value as string);

    recipesCtx.onCategoryChange(event.target.value as string);
  };

  function handleSearchRecipesByName() {
    recipesCtx.setChosenCategoryHandler('');

    recipesCtx.onClickSearchRecipesByName(
      searchRecipesByNameRef.current!.value
    );
  }

  const selectCategory = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <InputLabel id="category">Pick a Category</InputLabel>
        <Select
          className={classes.select_category}
          labelId="category"
          defaultValue=""
          value={recipesCtx.chosenCategory}
          label="category"
          onChange={onSelectChangeHandler}
        >
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );

  const searchRecipesByName = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <div className={classes.search_recipes_by_name}>
          <TextField
            label="Search"
            inputRef={searchRecipesByNameRef}
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchRecipesByName} edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </FormControl>
    </div>
  );

  return (
    <form className={classes.layout}>
      {selectCategory} {searchRecipesByName}
      <div className={classes.form_control}>
        <FormControl>
          <Link to="/add-recipe">
            <Button variant="contained" size="large">
              Add Recipe
            </Button>
          </Link>
        </FormControl>
      </div>
    </form>
  );
};

export default RecipesHeader;
