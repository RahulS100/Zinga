import { createContext } from "react";

const cartContext = createContext({
    items: [],
    totalAmount: 0,
    setItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

export default cartContext;