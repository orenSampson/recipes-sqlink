import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

import { FullRecipeInnerUse } from '../../../../models/recipes';
import classes from './RecipeDisplayer.module.css';

const RecipeDisplayer: React.FC<{
  recipe: FullRecipeInnerUse;
}> = (props) => {
  return (
    <div>
      <Card className={classes.recipe}>
        <CardMedia
          component="img"
          height="194"
          src={`${props.recipe.strMealThumb}/preview`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography>{props.recipe.strMeal}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDisplayer;
