import { useContext, createContext, useState } from "react";

import { ethers } from "ethers";

import ABI from "./abi";
import { _TypedDataEncoder } from "ethers/lib/utils";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);

  const rpcprovider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/49d6a6a5608841fab0772f2db421dfbb"
  );

  const owner = "0x2dc4c32b9Cf6A589905F21F9E128AEBA827Cd87d";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  async function connect() {
    await provider.send("eth_requestAccounts", []);

    const Address = await signer.getAddress();
    setAddress(Address);
  }

  const contractRead = new ethers.Contract(
    "0x41D4bfFadd39B87b29ace389D83bDa8992d44DF7",
    ABI,
    provider
  );
  const contractWrite = contractRead.connect(signer);

  const rpccontract = new ethers.Contract(
    "0x41D4bfFadd39B87b29ace389D83bDa8992d44DF7",
    ABI,
    rpcprovider
  );

  const getProducts = async () => {
    const product = await rpccontract.getAllProducts();
    const parsedproduct = product.map((product, i) => ({
      owner: product.owner,
      name: product.name,
      price: ethers.utils.formatEther(product.price),
      sold: product.sold,
      imageUrl: product.imageUrl,
      pId: i,
    }));

    return parsedproduct;
  };

  const getmyProducts = async () => {
    const data = await getProducts();

    const filteredproducts = data.filter(
      (campaign) => campaign.owner === address
    );
    return filteredproducts;
  };
  const getInitialSupply = async () => {
    const k = await contractWrite.totalSupply();
    // console.log(ethers.utils.formatEther(k));
  };

  const custom = async () => {
    try {
      const amountString = "50";
      const ethe = ethers.utils.parseEther(amountString);

      const tx = await contractWrite.CustomTransfer(ethe);
      await tx.wait();
    } catch (e) {
      console.log(e);
    }
  };

  const updateaddress = async (_city, _pin, _state, _mobile) => {
    const tx = await contractWrite.updateAdress(_city, _pin, _state, _mobile);
    await tx.wait();
  };

  const getAdress = async () => {
    const home_address = await contractWrite.myAddress();
    return home_address;
  };

  const getTransactions = async () => {
    const data = await contractWrite.myTransactions();
    const parsedproduct = data.map((product, i) => ({
      amount: ethers.utils.formatEther(product.price),
      date: product.time.toNumber(),
      positive: product.pos.toNumber(),
    }));

    console.log(parsedproduct);
    return parsedproduct;
  };

  const buyProduct = async (pid) => {
    try {
      await contractWrite.purchase(pid);
    } catch (error) {
      alert("You may not have enough balance or product maybe sold");
    }
  };

  const ListProduct = async (item) => {
    const _price = ethers.utils.parseEther(item.price);
    const tx = await contractWrite.addProduct(item.name, _price, item.url);

    await tx.wait();
  };

  const balance = async (param) => {
    const data = await contractWrite.balanceOf(param);
    return ethers.utils.formatEther(data);
  };

  return (
    <StateContext.Provider
      value={{
        connect,
        address,
        products,
        owner,
        getProducts,
        getInitialSupply,
        custom,
        getAdress,
        getTransactions,
        updateaddress,
        buyProduct,
        ListProduct,
        balance,
        getmyProducts,
        signer,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
