import React, { useContext, useState } from "react";
import styles from "../../styles/Cart.module.scss";
import Image from "next/image";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import { Plus, Minus } from "react-feather";
import AppContext from "../../context/AppContext";

const ProductCart = ({ product, setRender }) => {
  const { addItemToCart, deleteItemToCart } = useContext(AppContext);
  const [rerender, setRerender] = useState(true);

  return (
    <div className={styles.product}>
      <div className={styles.image}>
        <Image
          src={`${API_URL}${product.imagen_principal.formats.thumbnail.url}`}
          width="90"
          height="120"
        ></Image>
      </div>
      <div className={styles.info}>
        <h3>{product.nombre}</h3>
      </div>
      <div className={styles.quantity}>
        <div className={styles.box}>
          <Minus
            className="gold_text pointer"
            onClick={() => {
              deleteItemToCart(product);
              setRerender(!rerender);
              setRender(!rerender)
            }}
          />
          <p>{product.cartQuantity}</p>
          <Plus
            className="gold_text pointer"
             onClick={() => {
              addItemToCart(product);
              setRerender(!rerender);
              setRender(!rerender)
            }}
          />
        </div>
        <p className={styles.stock}>Disponibles: {product.stock} </p>
      </div>
      <div className={styles.product_price}>
        <h3>$ {product.precio * product.cartQuantity}</h3>
        <p>MXN</p>
      </div>
    </div>
  );
};

export default ProductCart;
