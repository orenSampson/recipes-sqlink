import React, { Fragment } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import RecipesPage from './pages/RecipesPage';
import AddRecipePage from './pages/AddRecipePage';

function App() {
  return (
    <Fragment>
      <Container maxWidth="xl">
        <nav>
          <ul>
            <li>
              <Link to="/">Recipes</Link>
            </li>
            <li>
              <Link to="/add-recipe">Add Recipe</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<RecipesPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
        </Routes>
      </Container>
    </Fragment>
  );
}

export default App;
