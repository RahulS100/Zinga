import React, { useContext, useState } from "react";

//----------------------------CSS-----------------------
import classes from "./Cart.module.css";

//---------------------------Comps---------------------
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";

//-----------------------Cart Global State--------------
import CartContext from "../../store/cart-context/cart-context";

export default function Cart(props) {
  //-----------------------------Checkout State----------------------------
  let [checkout, setCheckout] = useState(false);
  let [isSubmitting, setSubmitting] = useState(false);
  let [submitted, setSubmitted] = useState(false);

  let cartCTX = useContext(CartContext);

  //---------------------Condtionally Render Order Btn if there any item in Cart----------------
  const orderBtnShow = cartCTX.totalAmount <= 0;

  let totalPrice = `$${cartCTX.totalAmount.toFixed(2)}`;

  //--------------------Add and Remove Item Handlers-------------------------
  function removeItem(id) {
    cartCTX.removeItem(id);
  }

  function addItem(item) {
    cartCTX.setItem({ ...item, amount: 1 });
  }

  function orderHandle() {
    setCheckout(true);
  }

  //------------------------------Send Order Data to Server----------------------
  async function orderNow(userData) {
    setSubmitting(true);
    await fetch(process.env.ORDER_DB,
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: cartCTX.items,
        }),
        header: { "Content-Type": "application/json" },
      }
    );
    setSubmitting(false);
    setSubmitted(true);
    cartCTX.clearCart();
  }

  let item = (
    <ul className={classes["cart-items"]}>
      {cartCTX.items.map((data) => {
        return (
          <CartItem
            key={data.id}
            name={data.name}
            price={data.price}
            id={data.id}
            amount={data.amount}
            addItem={addItem.bind(null, data)}
            removeItem={removeItem.bind(null, data.id)}
          ></CartItem>
        );
      })}{" "}
    </ul>
  );

  const cartButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.hideCart}>
        Cancel
      </button>
      {!orderBtnShow && (
        <button className={classes.button} onClick={orderHandle}>
          Order
        </button>
      )}
    </div>
  );

  const ModalData = (
    <React.Fragment>
      {item}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      {checkout && <Checkout order={orderNow} onCancel={props.hideCart} />}
      {!checkout && cartButton}
    </React.Fragment>
  );

  const Submitting = <p>Ordering...</p>;

  console.log(classes.button);

  const Submitted = (
    <React.Fragment>
      <p>Order Placed Successfully</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.hideCart}>
        Close
      </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {!isSubmitting && !submitted && ModalData}
      {isSubmitting && Submitting}
      {submitted && Submitted}
    </Modal>
  );
}
