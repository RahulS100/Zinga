import classes from './Checkout.module.css';
import {useRef, useState} from 'react';

const Checkout = (props) => {

  let [formValid, setFormValid] = useState(false);

  let nameRef = useRef();
  let streetRef = useRef();
  let postalRef = useRef();
  let cityRef = useRef();

  const empty = value => value.trim() !== ""; 
  const digit5 = value => value.trim().length && value.trim() !== ""; 

  const confirmHandler = (event) => {
    event.preventDefault();

    const nameValid = empty(nameRef.current.value);
    const streetValid = empty(streetRef.current.value);
    const cityValid = empty(cityRef.current.value);
    const postalValid = digit5(postalRef.current.value);

    const formValid = nameValid && streetValid && cityValid && postalValid;
    setFormValid(false);

    //*********************Order the cart Item**************************/
    if(formValid) {
      props.order({
        name: nameRef.current.value,
        address: streetRef.current.value,
        city: cityRef.current.value,
        potsal: postalRef.current.value
      });
    }
    else {
      setFormValid(true);
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
      </div>
      {formValid && <p>Please enter Valid Values!</p>}
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;