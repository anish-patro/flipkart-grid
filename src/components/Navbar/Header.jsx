import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context";
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  const { address, connect, getProducts, getAdress, owner, getInitialSupply } =
    useStateContext();

  useEffect(() => {
    // console.log(address);
    // console.log(owner);
    getProducts();
    getAdress();

    getInitialSupply();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <nav className="px-10 flex flex-row gap-8 bg-[#047BD5] justify-center text-white items-center">
        <div className="cursor-pointer py-0">
          <Link to="/" className="text-[20px] font-bold">
            Flipkart
          </Link>
          <div className="flex flex-row gap-[2px]">
            <div>Explore</div>
            <div className="text-yellow-600">FLP</div>
          </div>
        </div>
        <div className="flex flex-row bg-white rounded-sm cursor-pointer">
          <input
            type="search"
            placeholder="Search for products, brands and more"
            size="60"
            className="py-[12px] mr-[16px] ml-[56px] w-[30vw] h-[27px] text-black outline-none"
          />
          <BsSearch color="blue" className="w-10 h-8 p-2 flex justify-center" />
        </div>
        <Link to="/quiz" className="font-bold cursor-pointer">
          Earn
        </Link>
        {owner === address && (
          <Link to="/product" className="font-bold cursor-pointer">
            Add Products
          </Link>
        )}

        {address ? (
          <div
            onClick={() => {
              navigate("/profile");
            }}
          >
            <FaUserCircle className="cursor-pointer" size={30} />
          </div>
        ) : (
          <Link
            className="px-7 py-1 bg-white rounded-sm text-blue-600 cursor-pointer"
            onClick={connect()}
          >
            Connect Metamask
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;
