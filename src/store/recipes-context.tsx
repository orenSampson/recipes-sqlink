import React, { useState, useEffect } from 'react';

import {
  CategoriesArray,
  ConciseRecipeByCategoryFromAPI,
  FullRecipeInnerUse,
} from '../models/recipes';

import getCategories from '../api/recipes/get-categories';
import getConciseRecipesByCategory from '../api/recipes/get-concise-recipes-by-category';
import getFullRecipesByName from '../api/recipes/get-full-recipes-by-name';

import { getFullRecipesFromAPI, transformFromAPIToInnerUse } from './utlis';

type RecipesContextObj = {
  categories: CategoriesArray;
  chosenCategory: string;
  fullRecipes: FullRecipeInnerUse[];
  getCategoriesFromAPI: () => void;
  setChosenCategoryHandler: (category: string) => void;
  onCategoryChange: (nameOfCategory: string) => void;
  onClickSearchRecipesByName: (name: string) => void;
};

export const RecipesContext = React.createContext<RecipesContextObj>({
  categories: [],
  chosenCategory: '',
  fullRecipes: [],
  getCategoriesFromAPI: () => {},
  setChosenCategoryHandler: (category: string) => {},
  onCategoryChange: (nameOfCategory: string) => {},
  onClickSearchRecipesByName: (name: string) => {},
});

interface Props {
  children: React.ReactNode;
}

const RecipesContextProvider: React.FC<Props> = (props) => {
  const [categories, setCategories] = useState<CategoriesArray>([]);
  const [chosenCategory, setChosenCategory] = useState<string>('');
  const [fullRecipes, setFullRecipes] = useState<FullRecipeInnerUse[]>([]);

  useEffect(() => {
    getCategoriesFromAPIHandler();
  }, []);

  const getCategoriesFromAPIHandler = async () => {
    const categoriesFromAPI = await getCategories();

    const stringCatrgories: CategoriesArray = categoriesFromAPI.map(
      (someCategoryFromAPI) => someCategoryFromAPI.strCategory
    );

    setCategories(stringCatrgories);
  };

  const setChosenCategoryHandler = (category: string) => {
    setChosenCategory(category);
  };

  const onCategoryChangeHandler = async (nameOfCategory: string) => {
    let conciseRecipesByCategoryFromAPI: ConciseRecipeByCategoryFromAPI[];
    try {
      conciseRecipesByCategoryFromAPI = await getConciseRecipesByCategory(
        nameOfCategory
      );
    } catch (error) {
      console.log('error :>> ', error);
      return;
    }

    const fullRecipesFromAPI = await getFullRecipesFromAPI(
      conciseRecipesByCategoryFromAPI
    );

    const fullRecipesInnerUse = transformFromAPIToInnerUse(fullRecipesFromAPI);

    setFullRecipes(fullRecipesInnerUse);
  };

  const onClickSearchRecipesByNameHandler = async (name: string) => {
    const fullRecipesByName = await getFullRecipesByName(name);

    const fullRecipesByNameInnerUse =
      transformFromAPIToInnerUse(fullRecipesByName);

    setFullRecipes(fullRecipesByNameInnerUse);
  };

  const recipesContextValue: RecipesContextObj = {
    categories,
    chosenCategory,
    fullRecipes,
    getCategoriesFromAPI: getCategoriesFromAPIHandler,
    setChosenCategoryHandler,
    onCategoryChange: onCategoryChangeHandler,
    onClickSearchRecipesByName: onClickSearchRecipesByNameHandler,
  };

  return (
    <RecipesContext.Provider value={recipesContextValue}>
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
