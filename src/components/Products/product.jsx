import { useState } from "react";
import "./product.css";
import { useStateContext } from "../../context";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, seturl] = useState("");
  const { ListProduct } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleclick = async () => {
    setIsLoading(true);
    const item = {
      name,
      price,
      url,
    };
    await ListProduct(item);
    setIsLoading(false);
    navigate("/");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex justify-center">
        <div className="login-container">
          <section className="login">
            <header>
              <h2>Add Product</h2>
            </header>
            <div className="login-form">
              <input
                type="text"
                className="login-input"
                placeholder="Product Name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                className="login-input"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                type="text"
                className="login-input"
                placeholder="Image URL"
                value={url}
                onChange={(e) => {
                  seturl(e.target.value);
                }}
              />
              <div className="submit-container">
                <button className="login-button" onClick={handleclick}>
                  Add
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Modal;
