import {
  ConciseRecipeByCategoryFromAPI,
  FullRecipeFromAPI,
  FullRecipeInnerUse,
} from '../../../models/recipes';

import getFullRecipeByID from '../../../api/recipes/get-full-recipe-by-ID';

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

export const transformFromAPIToInnerUse = async (
  fullRecipesFromAPI: FullRecipeFromAPI[]
) => {
  const fullRecipesInnerUse = fullRecipesFromAPI.map(
    (someFullRecipeFromAPI) => {
      console.log('someFullRecipeFromAPI', someFullRecipeFromAPI);

      const someFullRecipeInnerUSe: FullRecipeInnerUse = {
        idMeal: someFullRecipeFromAPI.idMeal,
        strMeal: someFullRecipeFromAPI.strMeal,
        strDrinkAlternate: someFullRecipeFromAPI.strDrinkAlternate,
        strCategory: someFullRecipeFromAPI.strCategory,
        strArea: someFullRecipeFromAPI.strArea,
        strInstructions: someFullRecipeFromAPI.strInstructions,
        strMealThumb: someFullRecipeFromAPI.strMealThumb,
        strTags: someFullRecipeFromAPI.strTags,
        strYoutube: someFullRecipeFromAPI.strYoutube,
        strIngredientsArray: [],
        strMeasuresArray: [],
        strSource: someFullRecipeFromAPI.strSource,
        strImageSource: someFullRecipeFromAPI.strImageSource,
        strCreativeCommonsConfirmed:
          someFullRecipeFromAPI.strCreativeCommonsConfirmed,
        dateModified: someFullRecipeFromAPI.dateModified,
      };

      for (let index = 1; index <= 20; index++) {
        const currentIngredientKey = `strIngredient${index}`;
        const currentstrMeasureKey = `strMeasure${index}`;
        const currentIngredient =
          someFullRecipeFromAPI[
            currentIngredientKey as keyof FullRecipeFromAPI
          ];
        const currentstrMeasure =
          someFullRecipeFromAPI[
            currentstrMeasureKey as keyof FullRecipeFromAPI
          ];

        if (currentIngredient) {
          someFullRecipeInnerUSe.strIngredientsArray.push(currentIngredient);
        }

        if (currentstrMeasure) {
          someFullRecipeInnerUSe.strMeasuresArray.push(currentstrMeasure);
        }
      }

      console.log('someFullRecipeInnerUSe', someFullRecipeInnerUSe);

      return someFullRecipeInnerUSe;
    }
  );

  return fullRecipesInnerUse;
};
