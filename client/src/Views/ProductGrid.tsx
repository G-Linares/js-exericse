import React, { ReactElement } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";

import { navigateToRoute } from "../App";
import Hero from "../Components/Hero";
import { itemType } from "../utils/adminUtils";

// custom hook that catches all the dfetched data loading state of the fetch
import { useApiGet, TApiResponse } from "../utils/fetchProducts";

export default function ProductGrid(): ReactElement {
  // custom hook para el fetch, el URL que se pasa es el del GET para traer todos los items
  const { data, isLoading }: TApiResponse = useApiGet(
    `${process.env.REACT_APP_PRODUCT_API_ROUTE}`
  );

  //libreria de context para carrito para auziliarme
  const { addItem } = useCart();

  const handleAddCarrito = (item: itemType) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Item: ${item.nombre} agregado a carrito`,
      showConfirmButton: false,
      timer: 1500
    });
    item.id = item._id;
    addItem(item);
  };
  return (
    <div className="bg-white">
      <Hero />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <>
          {isLoading ? (
            <div className="w-full h-[600px] flex items-center justify-center">
              <RotatingLines
                strokeColor="gray"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 w-full">
              {data.map((item: itemType, idx: number) => {
                return (
                  <div className="group" key={idx}>
                    <Link to={navigateToRoute.goToProductDetails(item._id)}>
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={item.foto}
                          alt="Not Found"
                          className=" max-h-[320px] h-[320px] w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-1 text-lg font-medium text-gray-900">
                        {item.nombre}
                      </h3>
                      <p className="mt-1 text-sm text-gray-700">
                        Agave tipo: {item.type}
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        Region: {item.region}
                      </p>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        ${item.price}.00 MXN
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {item.descripcion.substring(0, 100)} ...{" "}
                        <strong>Ver más</strong>
                      </p>
                    </Link>
                    <button
                      className="btn flex mx-auto mt-5"
                      onClick={() => handleAddCarrito(item)}
                    >
                      {" "}
                      Agregar al Carrito
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      </div>
    </div>
  );
}
