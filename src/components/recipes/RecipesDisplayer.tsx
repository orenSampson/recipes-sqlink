import RecipeDisplayer from './RecipeDipslayer';
import { FullRecipeDetailsFromAPI } from '../../models/recipes';

import classes from './RecipesDisplayer.module.css';

const RecipesDisplayer: React.FC<{
  fullrecipesByCategory: FullRecipeDetailsFromAPI[];
}> = (props) => {
  const recipes = props.fullrecipesByCategory.map((recipe) => (
    <RecipeDisplayer key={recipe.idMeal} recipe={recipe} />
  ));

  return <div className={classes.recipes}>{recipes}</div>;
};

export default RecipesDisplayer;
