import React, {useEffect, useState} from 'react';

//---------------------------Comps-----------------------
import Card from '../UI/Card/Card';
import MealItem from './MealItems/MealItem';


//-------------------CSS-------------------
import classes from './AMeals.module.css';


export default function AMeals() {
  //----------------------Meals State-------------------
  let [meals, setMeals] = useState([]);
  let [isLoading, setLoading] = useState(false);
  let [httpErr, setHttpErr] = useState();


  //----------------------Getting the Meals Data form Database------------------
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
          let res = await fetch(process.env.ALLMEALS);

          if(!res.ok) {
              throw new Error("Something Went Wrong!");
          }

          let MEALS = await res.json();
          let MEALSDATA = [];
          for(const key in MEALS) {
            const newMeal = {
              id: key,
              name: MEALS[key].name,
              description: MEALS[key].description,
              price: MEALS[key].price
            }

            //------------Collectiong and Formatting the Data-----------------
            MEALSDATA.push(newMeal);
            setLoading(false);
          }  
          setMeals(MEALSDATA)    
         } catch(err) {
           setHttpErr(err);
         }
      }

      fetchData();
    },[]);

    //---------------Checking for Error and Showing User a Error message---------------------
    let flag = <p>Loading...</p>;
    if(httpErr) flag =  <p>{httpErr.message}</p>;

    let listofmeals = meals.map((meal) => {return <MealItem name={meal.name} description={meal.description} price={meal.price} key={meal.id} id={meal.id}></MealItem>});

    return (
        <section className={classes.meals}>
            <Card>
            <ul>
                {!isLoading ? listofmeals : <p>{flag}</p>}
            </ul>
            </Card>
        </section>
    )
}
