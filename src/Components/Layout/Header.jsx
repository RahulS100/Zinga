import React, {Fragment} from 'react'

//-----------------------CSS-------------------------
import classes from './Header.module.css';

//-----------------------Image-----------------------
import MealsImg from '../../Assets/Images/meals.jpg';

//------------------------Comps--------------------
import CartButton from './CartButton';

export default function Header(props) {
    return (
        <Fragment>
            <header className={classes.header}>
                <h2>Zinga Meals</h2>
                <CartButton showCart={props.showCart} />
            </header>
            <div>
                <img src={MealsImg} alt='Zinga Meals' className={classes['main-image']} />
            </div>
        </Fragment>
    )
}
