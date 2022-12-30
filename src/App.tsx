import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';

import RecipesPage from './pages/RecipesPage';
import AddRecipePage from './pages/AddRecipePage';
import { RecipesContext } from './store/recipes-context';

function App() {
  const recipesCtx = useContext(RecipesContext);

  let routes;
  if (recipesCtx.categories.length === 0) {
    routes = <h1>App not ready yet</h1>;
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
      </Routes>
    );
  }

  return <Container maxWidth="xl">{routes}</Container>;
}

export default App;
