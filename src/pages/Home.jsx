import React, { useEffect, useState } from "react";

import AutoSlider from "../components/Carousel/AutoSlider";
import Card from "../components/Card/Card";
import { useStateContext } from "../context";
import Loader from "../components/Loader";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getProducts, products, connect } = useStateContext();

  const fetchallproduct = async () => {
    setIsLoading(true);
    const data = await getProducts();
    setProduct(data);
    // console.log(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchallproduct();
    connect();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <AutoSlider />

      <div className="grid grid-cols-3">
        {product.map((item) => {
          return <Card key={item.pId} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
