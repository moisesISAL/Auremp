import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const success = ({ payment_id, merchant_order_id, collection_status, data }) => {
    const { cartArray, cartTotal } = useContext(AppContext);

  useEffect(async () => {

    const auxArray = JSON.parse(window.localStorage.getItem("cartArray"))

    const pedidos = await axios.post(
        'http://localhost:1337/ordens',
        {
            total: 1.0,
            mail: "test@test.com",
            productos:auxArray,
            direccion: "ocampo 100",
            payment_id: payment_id,
            merchant_order_id: merchant_order_id,
            collection_status: collection_status
        },
        {
          headers: {
            Authorization:
              `Bearer ${data.jwt}`,
          },
        }
      );
  
        console.log(pedidos.data)
  },[]);

  return (
    <div>
      {console.log(payment_id, merchant_order_id, collection_status)}
      {/* {console.log(router.query.payment_id)} */}
      <h1>Success</h1>
    </div>
  );
};

success.getInitialProps = async ({ query }) => {
  const { payment_id, merchant_order_id, collection_status } = query;

  

  const { data } = await axios.post('http://localhost:1337/auth/local', {
  identifier: 'pedidos@auremp.com',
  password: 'Auremp2021!',
});

  

  return { payment_id, merchant_order_id, collection_status, data };
};

export default success;
