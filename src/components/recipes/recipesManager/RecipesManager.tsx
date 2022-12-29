import { useState } from 'react';

import RecipesHeader from '../recipesHeader/RecipesHeader';
import RecipesDisplayer from '../recipesDisplayer/RecipesDisplayer';
import getConciseRecipesByCategory from '../../../api/recipes/get-concise-recipes-by-category';
import getFullRecipesByName from '../../../api/recipes/get-full-recipes-by-name';
import {
  ConciseRecipeByCategoryFromAPI,
  FullRecipeInnerUse,
} from '../../../models/recipes';

import { getFullRecipesFromAPI, transformFromAPIToInnerUse } from './utlis';

const RecipesManager: React.FC = () => {
  const [fullRecipes, setFullRecipes] = useState<FullRecipeInnerUse[]>([]);

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

    console.log('fullRecipesByNameInnerUse', fullRecipesByNameInnerUse);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <RecipesHeader
        onCategoryChangeHandler={onCategoryChangeHandler}
        onClickSearchRecipesByNameHandler={onClickSearchRecipesByNameHandler}
      />
      {fullRecipes.length === 0 ? (
        <h1>List of recipes not ready yet</h1>
      ) : (
        <RecipesDisplayer fullRecipes={fullRecipes} />
      )}
    </div>
  );
};

export default RecipesManager;
