import { useState } from 'react';

import RecipesHeader from './RecipesHeader';
import RecipesDisplayer from './RecipesDisplayer';
import getRecipesByCategory from '../../api/recipes/get-recipes-by-category';
import getFullMealDetailsByID from '../../api/recipes/get-full-meal-details-byID';
import { FullRecipeDetailsFromAPI } from '../../models/recipes';

const RecipesManager: React.FC = () => {
  // const [chosenCategory, setChosenCategory] = useState<string>('');
  const [fullRecipesByCategory, setFullRecipesByCategory] = useState<
    FullRecipeDetailsFromAPI[]
  >([]);

  const onCategoryChangeHandler = async (nameOfCategory: string) => {
    setFullRecipesByCategory([]);
    const recipesByCategoryFromAPI = await getRecipesByCategory(nameOfCategory);

    const fullRecipesDetails: FullRecipeDetailsFromAPI[] = [];

    console.log(
      'recipesByCategoryFromAPI length',
      recipesByCategoryFromAPI.length
    );

    for (let index = 0; index < recipesByCategoryFromAPI.length; index++) {
      const someRecipe = recipesByCategoryFromAPI[index];

      try {
        const fullDetailrecipe = await getFullMealDetailsByID(
          someRecipe.idMeal
        );

        fullRecipesDetails.push(fullDetailrecipe);
      } catch (error) {
        console.log('error', error);
      }
    }

    console.log('fullRecipesDetails :>> ', fullRecipesDetails);

    setFullRecipesByCategory(fullRecipesDetails);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <RecipesHeader onCategoryChangeHandler={onCategoryChangeHandler} />
      {fullRecipesByCategory.length === 0 ? (
        <h1>List of recipes not ready yet</h1>
      ) : (
        <RecipesDisplayer fullRecipesByCategory={fullRecipesByCategory} />
      )}
    </div>
  );
};

export default RecipesManager;
