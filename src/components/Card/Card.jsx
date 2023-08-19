import React, { useEffect, useState } from "react";
import "./card.css";
import { useStateContext } from "../../context";
import Loader from "../Loader";

const Card = ({ imageUrl, name, price, sold, pId }) => {
  const { buyProduct } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async (pId) => {
    setIsLoading(true);
    await buyProduct(pId);
    setIsLoading(false);
  };
  return (
    <div className="product-card">
      <div className="badge">{sold ? "Sold" : "Hot"}</div>
      <div className="product-tumb">
        <img src={imageUrl} alt="" />
      </div>
      <div className="product-details">
        <span className="product-catagory">{name}</span>
        <h4>
          <a href="/">{name}</a>
        </h4>

        <div className="product-bottom-details">
          <span
            className="product-price"
            onClick={() => {
              handleBuy(pId);
            }}
          >
            FLP<b>{price}</b>
          </span>

          <div className="product-links">
            <a href="/">
              <i className="fa fa-heart"></i>
            </a>
            <a href="/">
              <i className="fa fa-shopping-cart"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
