import Head from "next/head";
import { twoDecimals } from "../../utils/format";
import { API_URL } from "../../utils/urls";
import {
  CheckCircle,
  Slash,
  UserCheck,
} from "react-feather";
import Image from "next/image";
import styles from "../../styles/Slug.module.scss";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { useRouter } from 'next/router'

const Product = ({ product }) => {
  const [currentImg, setCurrentImg] = useState("");
  const { addItemToCart } = useContext(AppContext);
  const path = useRouter().asPath;

  useEffect(() => {
    setCurrentImg(`${API_URL}${product.imagenes[0].url}`);
   
  }, [path]);

  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <div className={styles.main}>
        <div className={styles.thumbnails}>
          {product.imagenes &&
            product.imagenes.map((imagen) => (
              <div className={styles.tnail_image}>
                <Image
                  src={`${API_URL}${imagen.formats.thumbnail.url}`}
                  width="90"
                  height="120"
                ></Image>
              </div>
            ))}
        </div>
        <div className={styles.image}>
          <div className={styles.nav}>
            <Image
              src="/left gold.png"
              alt="Picture of the author"
              width="100"
              height="100"
            />
          </div>
          <div className={styles.current_image}>
          <Image
              src={currentImg ? ` ${currentImg}` : '/lifestyle.jpg'}
              alt="Picture of the author"
              width="480"
              height="620"
            />
          </div>
          <div className={styles.nav}>
            <Image
              src="/right.png"
              alt="Picture of the author"
              width="100"
              height="100"
            />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.top}>
            <h3>{product.nombre}</h3>
            <p className={styles.price}>$ {twoDecimals(product.precio)} MXN</p>
            <p>{product.contenido}</p>
          </div>

          <div className={styles.bottom}>
            <button
              className="btn btn-primary"
              onClick={() => {
                addItemToCart(product);
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      <div className={styles.banner}>
        <h3>
          Cuidamos cada <span className="gold_text">detalle</span> de nuestros
          productos
        </h3>
        <div className={styles.legends}>
          <p>
            {" "}
            <Slash /> Sin pruebas en animales
          </p>{" "}
          <p>
            {" "}
            <CheckCircle /> Avalados por la PROFECO
          </p>{" "}
          <p>
            {" "}
            <UserCheck /> Eficazia comprobada.
          </p>
        </div>
      </div>
      {/* <img src={`${API_URL}product.imagen_principal)}></img> */}
      <div className={styles.brief}>
        <div className={styles.container}>
          <h3>Ficha Técnica</h3>
          <div className={styles.image}>
            <Image
              src={`${API_URL}${product.info.url}`}
              alt="Picture of the author"
              width={product.info ? `${product.info.width}` : ""}
              height={product.info ? `${product.info.height}` : ""}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/productos/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0], //Because the API response for filters is an array
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all the possible paths
  const product_res = await fetch(`${API_URL}/productos/`);
  const products = await product_res.json();

  //Return them to NextJs context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, //Tells nextjs to show a 404 if the param doesnt exist
  };
}

export default Product;
