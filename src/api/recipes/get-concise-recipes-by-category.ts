import axios from 'axios';

import { ConciseRecipeByCategoryFromAPI } from '../../models/recipes';

interface GetConciseRecipesByCategoryResponse {
  meals: ConciseRecipeByCategoryFromAPI[];
}

const getConciseRecipesByCategory = async (category: string) => {
  const GET_RECIPES_BY_CATEGORY_URL =
    'https://www.themealdb.com/api/json/v1/1/filter.php';

  const { data } = await axios.get<GetConciseRecipesByCategoryResponse>(
    GET_RECIPES_BY_CATEGORY_URL,
    { params: { c: category } }
  );

  return data.meals;
};

export default getConciseRecipesByCategory;
