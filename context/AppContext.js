import React, { useState } from "react";

const AppContext = React.createContext();

export const AppProvider = (props) => {
  const [cartArray, setCartArray] = useState([]);

  const addItemToCart = (value) => {
    let findDuplicated = false;
    cartArray.forEach((current, index) => {
      if (current.id === value.id) {
        let auxArray = cartArray;
        auxArray[index].cartQuantity += 1;
        setCartArray(auxArray);
        findDuplicated = true;
        console.log("duplicated");
      }
    });

    if(!findDuplicated){
      setCartArray((cartArray) => [...cartArray, value]);
    }

    console.log(cartArray);
  };

  const updateQuantity = (nombre, variacion) => {
    let auxArray = cartArray;
    cartArray.forEach((e, index) => {
      if (e.nombre === nombre && e.variacions[0].nombre === variacion) {
        auxArray[index].quantity += 1;
      }
    });
    setCartArray(auxArray);
    console.log(cartArray);
  };

  return (
    <AppContext.Provider value={{ cartArray, addItemToCart, updateQuantity }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
