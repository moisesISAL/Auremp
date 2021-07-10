import React, { useContext, useState } from "react";
import styles from "../../styles/Cart.module.scss";
import AppContext from "../../context/AppContext";

const Summary = () => {
  const { checkoutBtn, cartArray, cartTotal } = useContext(AppContext);
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState();
  const [empresa, setEmpresa] = useState();
  const [domicilio, setDomicilio] = useState();
  const [ciudad, setCiudad] = useState();
  const [estado, setEstado] = useState();
  const [codigoPostal, setCodigoPostal] = useState();
  const [telefono, setTelefono] = useState();
  const [disabled, setDisabled] = useState();

  return (
    <div className={styles.sum}>
      <div className={styles.shipping_info}>
        <form>
          <p> Información de contacto </p>
          <input
            type="email"
            value={email}
            className={styles.sum_mail}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p>Dirección de envio</p>
          <div className={styles.fullname}>
            <input
              value={nombre}
              type="text"
              className=""
              placeholder="Nombre"
              onChange={(e) => setNombre(e.target.value)}
            ></input>
            <input
              value={apellido}
              type="text"
              className=""
              placeholder="Apellido"
              onChange={(e) => setApellido(e.target.value)}
            ></input>
          </div>
          <input
            value={empresa}
            type="text"
            className=""
            placeholder="Empresa (opcional)"
            onChange={(e) => setEmpresa(e.target.value)}
          ></input>
          <input
            value={domicilio}
            type="text"
            onChange={(e) => setDomicilio(e.target.value)}
            className=""
            placeholder="Domicilio"
          ></input>
          <input
            value={ciudad}
            type="text"
            className=""
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Ciudad"
          ></input>
          <div className={styles.zipcode}>
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className=""
              placeholder="Estado"
            ></input>
            <input
              type="text"
              value={codigoPostal}
              className=""
              onChange={(e) => setCodigoPostal(e.target.value)}
              placeholder="Codigo Postal"
            ></input>
          </div>
          <input
            value={telefono}
            type="text"
            className=""
            placeholder="Número de Teléfono (10 digitos)"
            onChange={(e) => setTelefono(e.target.value)}
          ></input>
          <div className={styles.pay} ref={checkoutBtn}>
            <h3>Pago seguro mediante MercadoPago</h3>
          </div>
        </form>
      </div>
      <div className={styles.cart_info}>
        <div className={styles.sum_products}>
          {cartArray.map((p) => (
            <div className={styles.sum_p}>
              <div className={styles.sum_thumbnail}>
                <img src={`${p.imagen_principal.formats.thumbnail.url}`} />
              </div>
              <div className={styles.info}>
                <h4>{p.nombre}</h4>

                <div className={styles.sec}>
                  <p>${p.precio}</p>
                  <p>Cantidad: {p.cartQuantity}</p>
                </div>
              </div>

              <p className={styles.sum_price}>${p.precio * p.cartQuantity}</p>
            </div>
          ))}

          <div className={styles.sum_shipping}>
            <p>Costo de envio: </p>
            <p>Gratis</p>
          </div>
          <div className={styles.sum_total}>
            <p>Total: </p>
            <p>
              ${cartTotal} <span>MXN</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
