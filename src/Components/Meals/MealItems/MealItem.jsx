import React, {useContext} from 'react';

//------------------------CSS---------------------
import classes from './MealItem.module.css';

//------------------------Comps-------------------
import MealForm from '../MealForm/MealForm';

//-------------Cart Global Context-----------------
import CartContext from '../../../store/cart-context/cart-context';

export default function MealItem(props) {

    let cartCTX = useContext(CartContext);

    const addCartItem = (amount) => {;
            cartCTX.setItem({id: props.id, 
                            amount: amount,
                            price: props.price,
                            name: props.name
            });
    }  

    let price = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes.meal}>
            <div >
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
            <MealForm addCartItem={addCartItem} />
            </div>
        </li>
    )
}
