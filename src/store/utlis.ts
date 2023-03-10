import {
  ConciseRecipeByCategoryFromAPI,
  FullRecipeFromAPI,
  FullRecipeInnerUse,
} from '../models/recipes';
import getFullRecipeByID from '../api/recipes/get-full-recipe-by-ID';

export const getFullRecipesFromAPI = async (
  conciseRecipesByCategoryFromAPI: ConciseRecipeByCategoryFromAPI[]
) => {
  const fullRecipesFromAPI: FullRecipeFromAPI[] = [];

  for (let index = 0; index < conciseRecipesByCategoryFromAPI.length; index++) {
    const someConciseRecipeByCategoryFromAPI =
      conciseRecipesByCategoryFromAPI[index];

    try {
      const fullDetailrecipe = await getFullRecipeByID(
        someConciseRecipeByCategoryFromAPI.idMeal
      );

      fullRecipesFromAPI.push(fullDetailrecipe);
    } catch (error) {
      console.log('error', error);
    }
  }

  return fullRecipesFromAPI;
};

export const transformFromAPIToInnerUse = (
  fullRecipesFromAPI: FullRecipeFromAPI[]
) => {
  const fullRecipesInnerUse = fullRecipesFromAPI.map(
    (someFullRecipeFromAPI) => {
      const someFullRecipeInnerUse: FullRecipeInnerUse = {
        idMeal: someFullRecipeFromAPI.idMeal,
        strMeal: someFullRecipeFromAPI.strMeal || '',
        strCategory: someFullRecipeFromAPI.strCategory || '',
        strInstructions: someFullRecipeFromAPI.strInstructions || '',
        strMealThumb: someFullRecipeFromAPI.strMealThumb || '',
        strIngredientsArray: [],
      };

      for (let index = 1; index <= 20; index++) {
        const currentIngredientKey = `strIngredient${index}`;
        const currentIngredient =
          someFullRecipeFromAPI[
            currentIngredientKey as keyof FullRecipeFromAPI
          ];

        if (currentIngredient) {
          someFullRecipeInnerUse.strIngredientsArray.push(currentIngredient);
        }
      }

      return someFullRecipeInnerUse;
    }
  );

  return fullRecipesInnerUse;
};
