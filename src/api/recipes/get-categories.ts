import axios from 'axios';

// import { CategoryFromAPI } from '../models/recipes';

export interface CategoryFromAPI {
  strCategory: string;
}

interface GetCategoriesResponse {
  meals: CategoryFromAPI[];
}

const getCategories = async () => {
  const GET_CATEGORIES_URL =
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  try {
    const { data } = await axios.get<GetCategoriesResponse>(GET_CATEGORIES_URL);

    return data.meals;
  } catch (error) {
    console.log('error :>> ', error);

    return [];
  }
};

export default getCategories;
