import { useState } from 'react';

import RecipesHeader from '../recipesHeader/RecipesHeader';
// import RecipesDisplayer from '../recipesDisplayer/RecipesDisplayer';
import getConciseRecipesByCategory from '../../../api/recipes/get-concise-recipes-by-category';
import {
  ConciseRecipeByCategoryFromAPI,
  FullRecipeInnerUse,
} from '../../../models/recipes';
// import { FullRecipeFromAPI } from '../../../models/recipes';

import { getFullRecipesFromAPI, transformFromAPIToInnerUse } from './utlis';

const RecipesManager: React.FC = () => {
  const [fullRecipesByCategory, setFullRecipesByCategory] = useState<
    FullRecipeInnerUse[]
  >([]);

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

    console.log(
      'conciseRecipesByCategoryFromAPI :>> ',
      conciseRecipesByCategoryFromAPI
    );

    // const fullRecipesFromAPI = await getFullRecipesFromAPI(
    //   conciseRecipesByCategoryFromAPI
    // );

    // await transformFromAPIToInnerUse(fullRecipesFromAPI);

    // setFullRecipesByCategory(fullRecipesInnerUse);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <RecipesHeader onCategoryChangeHandler={onCategoryChangeHandler} />
      {/* {fullRecipesByCategory.length === 0 ? (
        <h1>List of recipes not ready yet</h1>
      ) : (
        <RecipesDisplayer fullRecipesByCategory={fullRecipesByCategory} />
      )} */}
    </div>
  );
};

export default RecipesManager;
