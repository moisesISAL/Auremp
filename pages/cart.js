import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Cart.module.scss";
import AppContext from "../context/AppContext";
import PriceInfo from "../components/Cart/PriceInfo";
import ProductCart from "../components/Cart/ProductCart";

const Cart = () => {
  const { cartArray } = useContext(AppContext);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    console.log(cartArray)
    let aux = 0;
    cartArray.forEach(element => {
      aux = aux + (element.precio * element.cartQuantity)
    });
    setTotalCost(aux)
  }, [cartArray])

  return (
    <div>
      <Head>
        <title>Carrito de compras - Auremp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1>Carrito ({cartArray.length})</h1>
        {console.log(cartArray)}
        {cartArray.length > 0 ? (
          <div className={styles.items}>
            {cartArray.map((item) => {
              
              return <ProductCart product={item} />;
            })}
          </div>
        ) : (
          <div className={styles.noItems}>
            <h3>Parece que tu carrito esta vacio. </h3>
          </div>
        )}
        <PriceInfo ship_cost="GRATIS" total_cost={totalCost} />
        <div className={styles.continue}>
          <button className="btn btn-primary">Continuar con la compra</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
