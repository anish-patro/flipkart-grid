import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import Card from "../components/Card/Card";
import Loader from "../components/Loader";
import "./Profile.css";

import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

const Profile = () => {
  const { getTransactions, getAdress, getmyProducts, balance, signer } =
    useStateContext();
  const [home, setHome] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bal, setBal] = useState(0);
  const handleInfo = async () => {
    setIsLoading(true);

    const myproducts = await getmyProducts();

    setMyProducts(myproducts);
    setIsLoading(false);
  };

  const handleAddress = async () => {
    const home_address = await getAdress();
    setHome(home_address);
  };

  const totalbalance = async () => {
    const address = await signer.getAddress();
    const myBalance = await balance(address);
    setBal(myBalance);
  };

  const handleTransaction = async () => {
    const transactiondata = await getTransactions();
    transactiondata.reverse();
    setTransactions(transactiondata);
  };

  const navigate = useNavigate();
  useEffect(() => {
    handleInfo();
    handleAddress();
    handleTransaction();
    totalbalance();
  }, []);
  return (
    <div>
      {isLoading && <Loader />}

      <div className="purchased-products">
        <div className="text-2xl ml-3 mt-10 text-gray-500">
          Total FLP: {bal}
        </div>
        <div className="text-3xl ml-3 mt-10 text-gray-500">
          Purchased Products
        </div>
        <div className="grid grid-cols-3">
          {myProducts?.map((item) => {
            return <Card key={item.pId} {...item} />;
          })}
        </div>
      </div>
      <div className="transaction">
        <div className="text-3xl ml-3 mt-10 text-gray-500">My Transactions</div>
        <table className="loyalty-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((items) => {
              const now = new Date();
              dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
              console.log(now);
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
                    {dateFormat(
                      items.date * 1000,
                      "dddd, mmmm dS, yyyy, h:MM:ss TT"
                    )}
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
