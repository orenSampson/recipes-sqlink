import axios from 'axios';

// import { CategoryFromAPI } from '../models/recipes';

export interface RecipesFromAPI {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface GetRecipesByCategoryResponse {
  meals: RecipesFromAPI[];
}

const getRecipesByCategory = async (category: string) => {
  const GET_RECIPES_BY_CATEGORY_URL =
    'https://www.themealdb.com/api/json/v1/1/filter.php';

  try {
    const { data } = await axios.get<GetRecipesByCategoryResponse>(
      GET_RECIPES_BY_CATEGORY_URL,
      { params: { c: category } }
    );

    return data.meals;
  } catch (error) {
    console.log('error :>> ', error);

    return [];
  }
};

export default getRecipesByCategory;
