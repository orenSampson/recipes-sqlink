import React, { useState, useEffect } from 'react';

import { CategoriesArray } from '../models/recipes';
import getCategories from '../api/recipes/get-categories';

type RecipesContextObj = {
  categories: CategoriesArray;
  chosenCategory: string;
  getCategoriesFromAPI: () => void;
  setChosenCategory: (category: string) => void;
};

export const RecipesContext = React.createContext<RecipesContextObj>({
  categories: [],
  chosenCategory: '',
  getCategoriesFromAPI: () => {},
  setChosenCategory: (category: string) => {},
});

interface Props {
  children: React.ReactNode;
}

const RecipesContextProvider: React.FC<Props> = (props) => {
  const [categories, setCategories] = useState<CategoriesArray>([]);
  const [chosenCategory, setChosenCategory] = useState<string>('');

  useEffect(() => {
    getCategoriesFromAPIHandler();
  }, []);

  const getCategoriesFromAPIHandler = async () => {
    const categoriesFromAPI = await getCategories();

    const stringCatrgories: CategoriesArray = categoriesFromAPI.map(
      (someCategoryFromAPI) => someCategoryFromAPI.strCategory
    );

    console.log('stringCatrgories', stringCatrgories);

    setCategories(stringCatrgories);
  };

  const setChosenCategoryHandler = (category: string) => {
    setChosenCategory(category);
  };

  const recipesContextValue: RecipesContextObj = {
    categories,
    chosenCategory,
    getCategoriesFromAPI: getCategoriesFromAPIHandler,
    setChosenCategory: setChosenCategoryHandler,
  };

  return (
    <RecipesContext.Provider value={recipesContextValue}>
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
