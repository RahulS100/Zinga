import React, {useState} from 'react';

//--------------------Comps-----------------------
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';

//-----------------------Cart Context Global State-----------------------
import Provider from './store/cart-context/CartContextProvider';

function App() {
  //-------------------State for Hide and Show Cart--------------------
  let [cartShow, setCartShow] = useState(false);

  //--------------------------Handlers for Show and Hide the Cart------------
  function showCart() {
      setCartShow(true);
  }

  function hideCart() {
      setCartShow(false);
  }


  return (
  
    <Provider>
      {cartShow && <Cart hideCart={hideCart} /> }
      <Header showCart={showCart} />
      <Meals />
    </Provider>
  );
}

export default App;
