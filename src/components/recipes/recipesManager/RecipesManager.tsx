import { useContext } from 'react';

import RecipesHeader from '../RecipesHeader/RecipesHeader';
import RecipesDisplayer from '../RecipesDisplayer/RecipesDisplayer';

import { RecipesContext } from '../../../store/recipes-context';

import getConciseRecipesByCategory from '../../../api/recipes/get-concise-recipes-by-category';
import getFullRecipesByName from '../../../api/recipes/get-full-recipes-by-name';
import {
  ConciseRecipeByCategoryFromAPI,
  FullRecipeInnerUse,
} from '../../../models/recipes';

import {
  getFullRecipesFromAPI,
  transformFromAPIToInnerUse,
} from '../../../store/utlis';

const RecipesManager: React.FC = () => {
  const recipesCtx = useContext(RecipesContext);

  return (
    <div>
      <h1>Recipes</h1>
      <RecipesHeader />
      {recipesCtx.fullRecipes.length === 0 ? (
        <h1>List of recipes not ready yet</h1>
      ) : (
        <RecipesDisplayer fullRecipes={recipesCtx.fullRecipes} />
      )}
    </div>
  );
};

export default RecipesManager;
