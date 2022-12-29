import React, { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import getCategories from '../api/recipes/get-categories';

const AddRecipePage: React.FC = () => {
  const [categories, setCategories] = React.useState<string[]>([]);

  return (
    <form>
      <Typography variant="h4" gutterBottom>
        Add Recipe
      </Typography>
      <TextField label="Meal Name" variant="outlined" />
      <TextField label="Meal Name" variant="outlined" />
    </form>
  );
};

export default AddRecipePage;
