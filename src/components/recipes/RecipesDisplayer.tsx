import { Fragment, useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import RecipeDisplayer from './RecipeDipslayer';
import { FullRecipeDetailsFromAPI } from '../../models/recipes';

import classes from './RecipesDisplayer.module.css';

const NUM_RECIPES_PER_PAGE = 10;

const RecipesDisplayer: React.FC<{
  fullRecipesByCategory: FullRecipeDetailsFromAPI[];
}> = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumOfPages, setTotalNumOfPages] = useState(0);
  const [recipesForCurrentPage, SetRecipesForCurrentPage] = useState<
    FullRecipeDetailsFromAPI[]
  >([]);

  useEffect(() => {
    setPageNumber(1);

    const totalNumOfPagesCalc = Math.ceil(
      props.fullRecipesByCategory.length / NUM_RECIPES_PER_PAGE
    );

    setTotalNumOfPages(totalNumOfPagesCalc);

    calcPage(1);
  }, []);

  const calcPage = (pageNumber: number) => {
    const lastIndex = props.fullRecipesByCategory.length - 1;
    const startIndex = (pageNumber - 1) * NUM_RECIPES_PER_PAGE;
    const endIndex = Math.min(pageNumber * NUM_RECIPES_PER_PAGE - 1, lastIndex);

    const subArray = props.fullRecipesByCategory.slice(
      startIndex,
      endIndex + 1
    );

    SetRecipesForCurrentPage(subArray);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);

    calcPage(value);
  };

  const recipes = recipesForCurrentPage.map((recipe) => (
    <RecipeDisplayer key={recipe.idMeal} recipe={recipe} />
  ));

  return (
    <Fragment>
      <div className={classes.recipes}>{recipes}</div>
      <Stack spacing={2}>
        <Pagination
          count={totalNumOfPages}
          page={pageNumber}
          onChange={handleChange}
        />
      </Stack>
    </Fragment>
  );
};

export default RecipesDisplayer;
