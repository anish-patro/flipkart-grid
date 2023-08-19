import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import Card from "../components/Card/Card";
import Loader from "../components/Loader";
import "./Profile.css";

import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
const Profile = () => {
  const { getTransactions, getAdress, getmyProducts } = useStateContext();
  const [home, setHome] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInfo = async () => {
    setIsLoading(true);

    const myproducts = await getmyProducts();

    setMyProducts(myproducts);
    setIsLoading(false);
  };

  const handleAddress = async () => {
    const home_address = await getAdress();
    setHome(home_address);
    console.log(home);
  };

  const handleTransaction = async () => {
    const transactiondata = await getTransactions();
    setTransactions(transactiondata);
  };

  const navigate = useNavigate();
  useEffect(() => {
    handleInfo();
    handleAddress();
    handleTransaction();
  }, []);
  return (
    <div>
      {isLoading && <Loader />}
      <div className="purchased-products">
        <div className="text-3xl ml-3 mt-10 text-gray-500">
          Purchased products
        </div>

        {myProducts?.map((item) => {
          return <Card key={item.pId} {...item} />;
        })}
      </div>
      <div className="transaction">
        <div className="text-3xl ml-3 mt-10 text-gray-500">
          My Transactions...
        </div>
        <table className="loyalty-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="each-row"> */}
            {transactions?.map((items) => {
              return (
                <tr className="each-row" key={items.date}>
                  {items.positive === 1 ? (
                    <td className="text-green-500">+{items.amount}</td>
                  ) : (
                    <td className="text-red-500">-{items.amount}</td>
                  )}

                  {items.positive === 1 ? (
                    <td> Earned through quiz</td>
                  ) : (
                    <td>You Purchased in our FlipSite</td>
                  )}
                  <td>
                    {dateFormat(items.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className=" text-3xl ml-3 mt-10 text-gray-500">Address</div>

        <div className="ml-5 mt-5">
          {" "}
          {home?.city}, {home?.state}
        </div>
        <div className="ml-5 mt-2">{home?.pin}</div>
        <div className="ml-5 mt-2">+91 {home?.mobile}</div>

        <button
          className="bg-blue-500 m-3 p-3 rounded-xl"
          onClick={() => {
            navigate("/add-address");
          }}
        >
          {" "}
          Update Address{" "}
        </button>
      </div>
    </div>
  );
};

export default Profile;
