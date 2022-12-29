import axios from 'axios';

import { FullRecipeFromAPI } from '../../models/recipes';

interface GetFullRecipesByNameResponse {
  meals: FullRecipeFromAPI[];
}

const getFullRecipesByName = async (searchValue: string) => {
  const GET_RECIPES_BY_CATEGORY_URL =
    'https://www.themealdb.com/api/json/v1/1/search.php';

  const { data } = await axios.get<GetFullRecipesByNameResponse>(
    GET_RECIPES_BY_CATEGORY_URL,
    { params: { s: searchValue } }
  );

  return data.meals;
};

export default getFullRecipesByName;
