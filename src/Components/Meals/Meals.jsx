import React, {Fragment} from 'react';

//---------------------CSS--------------------
// import classes from './Meals.module.css';

//---------------------Comps------------------
import AMeals from './AMeals';
import MealsSummary from './MealsSummary';

export default function Meals() {
    return (
        <Fragment>
            <MealsSummary />
            <AMeals />
        </Fragment>
    )
}
