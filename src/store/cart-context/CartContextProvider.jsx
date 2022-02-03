import React, {useReducer} from 'react';
import CartContext from '../cart-context/cart-context';

//-----------------------Reducer Default Value---------------
const defaultValue = {
    items: [],
    totalAmount: 0
};

//--------------------Reducer Function-------------------------
const reducerFunction = (state, action) => {

    if(action.type === "ADD") {
        const totalAmount = state.totalAmount + action.item.amount * action.item.price;

        let indexOfItem = state.items.findIndex(ele => ele.id === action.item.id);
        let existingItem = state.items[indexOfItem];

        let updatedItems = [...state.items];

        if(existingItem) {
           let updatedItem = {...existingItem,
                        amount: action.item.amount + existingItem.amount
            };

            updatedItems[indexOfItem] = updatedItem;
        }
        else {
            updatedItems = [...state.items, action.item];
        }

        return {
            items: updatedItems,
            totalAmount: totalAmount
        };
    } else if(action.type === "REMOVE") {
       const indexOfItem = state.items.findIndex(ele => ele.id === action.id);
       const existingItem = state.items[indexOfItem];
       const updatedPrice = state.totalAmount - existingItem.price;

       let updatedItems;
       if(existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
       } else {
         const updatedItem = {...existingItem, amount: existingItem.amount - 1};
           updatedItems = [...state.items];
           updatedItems[indexOfItem] = updatedItem;
       }

       return {
           items: updatedItems,
           totalAmount: updatedPrice
       };
    }
    else if(action.type === "CLEAR") {
        return defaultValue;
    }
    return defaultValue;
}

export default function CartContextProvider(props) {

    let [cartItems, setCartItemReducer] = useReducer(reducerFunction, defaultValue);

    function setItem(item) {
        setCartItemReducer({type: "ADD", item: item})
    }

    function removeItem(id) {
        setCartItemReducer({type: "REMOVE", id: id})
    }

    function  clearCart() {
            setCartItemReducer({type: "CLEAR"})
    }

    /*--------------Single Item in Items Arraya Structure--------------
    {name: "",
     id: 0,
     amount: 0,
     price: 0
    }
    */


    let cartContext = {
        items: cartItems.items,
        totalAmount: cartItems.totalAmount,
        setItem: setItem,
        removeItem: removeItem,
        clearCart: clearCart
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
