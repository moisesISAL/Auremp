import React, { useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = (props) => {
  const [cartArray, setCartArray] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartArray(JSON.parse(localStorage.getItem("cartArray")));
  }, []);

  const addItemToCart = (value) => {
    let findDuplicated = false;
    cartArray.forEach((current, index) => {
      if (current.id === value.id) {
        let auxArray = cartArray;
        auxArray[index].cartQuantity += 1;
        setCartArray(auxArray);
        findDuplicated = true;

        localStorage.setItem("cartArray", JSON.stringify(cartArray));
      }
    });

    if (!findDuplicated) {
      setCartArray((cartArray) => [...cartArray, value]);

      localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }
  };

  const deleteItemToCart = (value) => {
    cartArray.forEach((current, index) => {
      if (current.id === value.id) {
        let auxArray = cartArray;
        if (auxArray[index].cartQuantity <= 1) {
          auxArray.splice(index, 1);
        } else {
          auxArray[index].cartQuantity -= 1;
        }

        setCartArray(auxArray);

        localStorage.setItem("cartArray", JSON.stringify(cartArray));
      }
    });
  };

  const updateQuantity = (nombre, variacion) => {
    let auxArray = cartArray;
    cartArray.forEach((e, index) => {
      if (e.nombre === nombre && e.variacions[0].nombre === variacion) {
        auxArray[index].quantity += 1;
      }
    });
    setCartArray(auxArray);
  };

  return (
    <AppContext.Provider
      value={{
        cartArray,
        addItemToCart,
        deleteItemToCart,
        updateQuantity,
        cartTotal,
        setCartTotal,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// AppProvider.getInitialProps = ({req}) => {
//   const cookies = parseCookies(req);

//   return {
//     cookiesCartArray: cookies.cartArray
//   }
// }

export default AppContext;
