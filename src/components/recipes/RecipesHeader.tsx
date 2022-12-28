import React, { useEffect, useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { getCategories } from '../../api/recipes-api-calls';
import classes from './RecipesHeader.module.css';

const RecipesHeader: React.FC = () => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [chosenCategory, setChosenCategory] = React.useState<string>('');

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getFunc = async () => {
      const categoriesFromAPI = await getCategories();

      const stringCatrgories: string[] = [];

      for (let index = 0; index < categoriesFromAPI.length; index++) {
        const element = categoriesFromAPI[index];

        stringCatrgories.push(element.strCategory);
      }

      setChosenCategory(stringCatrgories[0]);

      setCategories(stringCatrgories);
    };

    getFunc();
  }, []);

  const menuItems = categories.map((category) => {
    return (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    );
  });

  const onSelectChangeHandler = (event: SelectChangeEvent) => {
    setChosenCategory(event.target.value as string);
  };

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

  const searchMealName = (
    <div className={classes.form_control}>
      <FormControl variant="outlined">
        <div className={classes.search_meal_name}>
          <TextField
            label="Search"
            inputRef={searchRef}
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickSearch} edge="end">
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

  function handleClickSearch() {
    console.log('searchRef.current?.value :>> ', searchRef.current!.value);
    console.log('chosenCategory :>> ', chosenCategory);
  }

  let form;
  if (categories.length === 0) {
    form = <h6>header is not ready yet</h6>;
  } else {
    form = (
      <div className={classes.layout}>
        {selectCategory} {searchMealName}
      </div>
    );
  }

  return <div>{form}</div>;
};

export default RecipesHeader;
