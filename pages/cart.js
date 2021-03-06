import React, { useContext, useEffect, useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Cart.module.scss";
import AppContext from "../context/AppContext";
import PriceInfo from "../components/Cart/PriceInfo";
import ProductCart from "../components/Cart/ProductCart";
import axios from "axios";
import Summary from "../components/Cart/Summary";

const Cart = ({token}) => {
  const { cartArray, checkoutBtn, cartTotal, setCartTotal } = useContext(AppContext);
  
  const [render, setRender] = useState();
  const [summary, setSummary] = useState(false);
  const [review, setReview] = useState(false);
  const [data, setData] = useState();
  

  async function onClickCheckout() {
    const orderData = {
      quantity: 1,
      description: "Monto a pagar",
      price: cartTotal,
    };

    fetch("https://mercadopago-auremp.herokuapp.com/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result);
      });
  }

  useEffect(() => {
    var aux = 0;
    
    if (cartArray !== null) {
     cartArray.forEach((element) => {
        aux = aux + element.precio * element.cartQuantity;
        window.localStorage.setItem("totalCost", aux);
      });
      
    }
    
    setCartTotal(aux);
    
  }, [render]);

  useEffect(() => {
    const script = document.createElement("script");

    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src =
      "https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    if (data !== undefined) {
      script.dataset.preferenceId = data.id;
      setSummary(true);
    }

    if (review) {
      checkoutBtn.current.appendChild(script);
    }
    // console.log(data.id);
  }, [data, summary, review]);

  return (
    <div>
      <Head>
        <title>Carrito de compras - Auremp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
      </Head>
      {summary === false ? (
        <div className={styles.main}>
          <h1>Carrito ({cartArray.length})</h1>
          {cartArray.length > 0 ? (
            <div className={styles.items}>
              {cartArray.map((item) => {
                return (
                  <ProductCart
                    setRender={setRender}
                    key={item.id}
                    product={item}
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.noItems}>
              <h3>Parece que tu carrito esta vacio. </h3>
            </div>
          )}
          <PriceInfo ship_cost="GRATIS" total_cost={cartTotal} />
          <div className={styles.continue}>
            <button
              onClick={() => onClickCheckout()}
              className="btn btn-primary "
            >
              Ir a pagar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Summary token={token} review={review} setReview={setReview}/>
        </div>
      )}
    </div>
  );
};

export default Cart;

export async function getStaticProps() {

  const {data} = await axios.post("https://strapi-auremp.herokuapp.com/auth/local/", {
    identifier: process.env.STRAPI_IDENTIFIER,
    password: process.env.STRAPI_PASSWORD,
  });

  return {
    props:{ token: data }
   
  };
}
