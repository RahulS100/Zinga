import React, {useRef, useState} from 'react';

//------------------------CSS------------------------
import classes from './MealForm.module.css';

//-------------------------Comps---------------------
import Input from '../../UI/Input/Input';

export default function MealForm(props) {

    //------------------Amount Check Flag State----------------------
    let [isAmountValid, setAmountValid] = useState(true);


    const amountRef = useRef(null);

    const handleAmountSubmit = (event) => {
        event.preventDefault();
        let amount = amountRef.current.value;
        let numAmount = +amount;
        if (amount === "" || numAmount <= 0 || numAmount > 5) {
            setAmountValid(false);
            return;
        }
        props.addCartItem(numAmount);
    }

    return (
        <form className={classes.form} onSubmit={handleAmountSubmit}>
            <Input label="Amount" input={
                {
                    id: "amount",
                    type: "number",
                    min: "1",
                    max: "5",
                    defaultValue: "1"
                }
            }  ref={amountRef} />
            <button>+ Add</button>
            {!isAmountValid && <p>Not a Valid Amount, Please Enter Between (1-5)</p>}
        </form>
    )
}
