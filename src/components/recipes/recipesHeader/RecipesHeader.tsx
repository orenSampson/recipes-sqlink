import React, { useEffect, useRef } from 'react';
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

import getCategories from '../../../api/recipes/get-categories';
import classes from './RecipesHeader.module.css';

const RecipesHeader: React.FC<{
  onCategoryChangeHandler: (nameOfCategory: string) => void;
  onClickSearchRecipesByNameHandler: (name: string) => void;
}> = (props) => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [chosenCategory, setChosenCategory] = React.useState<string>('');

  const searchRecipesByNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getCategiesFuncUseEffect = async () => {
      const categoriesFromAPI = await getCategories();

      const stringCatrgories: string[] = [];

      for (let index = 0; index < categoriesFromAPI.length; index++) {
        const element = categoriesFromAPI[index];

        stringCatrgories.push(element.strCategory);
      }

      setChosenCategory(stringCatrgories[0]);
      props.onCategoryChangeHandler(stringCatrgories[0]);

      setCategories(stringCatrgories);
    };

    getCategiesFuncUseEffect();
  }, []);

  const menuItems = categories.map((category) => {
    return (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    );
  });

  const onSelectChangeHandler = (event: SelectChangeEvent) => {
    searchRecipesByNameRef.current!.value = '';

    setChosenCategory(event.target.value as string);
    props.onCategoryChangeHandler(event.target.value as string);
  };

  function handleSearchRecipesByName() {
    setChosenCategory('');

    props.onClickSearchRecipesByNameHandler(
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
          value={chosenCategory}
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

  let form;
  if (categories.length === 0) {
    form = <h6>header is not ready yet</h6>;
  } else {
    form = (
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
  }

  return <div>{form}</div>;
};

export default RecipesHeader;
