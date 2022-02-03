import React, {useContext, useEffect, useState} from 'react'

//---------------------Cart Context---------------------
import CartContext from '../../store/cart-context/cart-context';

//------------------Comps----------------------
import CartIcon from './Carticon/CartIcon'

//------------------CSS----------------------
import classes from './CartButton.module.css';

export default function CartButton(props) {

    let [isHighLight, setHighLight] = useState(false);

    //-----------------Cart Global State----------------
    let cartCTX = useContext(CartContext);
    
    let animationClasses = `${classes.button} ${isHighLight ? classes.bump : ''}`;

    //----------------------Side Effect for Addin and removing the animation class-----------
    useEffect(() => {
        if(cartCTX.items.length > 0) setHighLight(true);
        
       let id = setTimeout(()=> {
            setHighLight(false);
        }, 300);

        return () => {clearTimeout(id)}

    }, [cartCTX.items])

    let numberOfItem = cartCTX.items.reduce((acc, cItem) => {
        return acc + cItem.amount
    }, 0);

    return (
        <button className={animationClasses} onClick={props.showCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span >Your Cart</span>
            <span className={classes.badge}>{numberOfItem}</span>
        </button>
    )
}
