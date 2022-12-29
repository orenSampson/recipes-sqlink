import axios from 'axios';

import { FullRecipeFromAPI } from '../../models/recipes';

interface GetFullRecipesResponse {
  meals: FullRecipeFromAPI[];
}

const getFullRecipeByID = async (recipeID: string) => {
  const GET_RECIPES_BY_CATEGORY_URL =
    'https://www.themealdb.com/api/json/v1/1/lookup.php';

  const { data } = await axios.get<GetFullRecipesResponse>(
    GET_RECIPES_BY_CATEGORY_URL,
    { params: { i: recipeID } }
  );

  return data.meals[0];
};

export default getFullRecipeByID;
