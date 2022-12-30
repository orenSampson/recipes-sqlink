import { useContext } from 'react';

import RecipesHeader from '../RecipesHeader/RecipesHeader';
import RecipesDisplayer from '../RecipesDisplayer/RecipesDisplayer';

import { RecipesContext } from '../../../store/recipes-context';

const RecipesManager: React.FC = () => {
  const recipesCtx = useContext(RecipesContext);

  let recipesDisplayerJSX = <h1>List of recipes not ready yet</h1>;
  if (recipesCtx.fullRecipes.length > 0) {
    recipesDisplayerJSX = (
      <RecipesDisplayer fullRecipes={recipesCtx.fullRecipes} />
    );
  }

  return (
    <div>
      <h1>Recipes</h1>
      <RecipesHeader />
      {recipesDisplayerJSX}
    </div>
  );
};

export default RecipesManager;
