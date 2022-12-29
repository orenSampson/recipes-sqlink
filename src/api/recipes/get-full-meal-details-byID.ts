import axios from 'axios';

import { FullRecipeDetailsFromAPI } from '../../models/recipes';

interface GetFullRecipesDetailsResponse {
  meals: FullRecipeDetailsFromAPI[];
}

const getFullMealDetailsByID = async (recipeID: string) => {
  const GET_RECIPES_BY_CATEGORY_URL =
    'https://www.themealdb.com/api/json/v1/1/lookup.php';

  const { data } = await axios.get<GetFullRecipesDetailsResponse>(
    GET_RECIPES_BY_CATEGORY_URL,
    { params: { i: recipeID } }
  );

  return data.meals[0];
};

export default getFullMealDetailsByID;
