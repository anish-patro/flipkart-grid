// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0 < 0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
 
contract FlipC is ERC20 {
    address public  owner;
    constructor (uint initialSupply) ERC20("Flipcoin","FLP"){
        _mint(msg.sender, initialSupply);
        owner  = msg.sender;
        approve(owner, initialSupply);
    } 

    struct Product {
        string name;
        uint price;
        address owner;
        bool sold;
        string imageUrl;
    }

    struct Address{
        string city;
        string pin;
        string state;
        string mobile;
    }

    struct Transaction {
        uint time;
        uint price;
        uint pos;
    }

    mapping (address =>  Transaction[]) public transactions;
    mapping (address => Address) public Adresses;

    Product[] public products;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function CustomTransfer(uint value) public  {
      _mint(msg.sender, value);
       transactions[msg.sender].push(Transaction(block.timestamp,value,1));
    }

    function addProduct(string calldata _name, uint256 _price, string calldata _imageurl) external onlyOwner {
        require(_price > 0, "Price must be greater than 0");
        products.push(Product(_name, _price, owner, false, _imageurl));
    }

    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }

    function updateAdress(string calldata _city,string calldata _pin, string calldata _state, string calldata _mobile) public {
        Adresses[msg.sender] = Address(_city,_pin,_state,_mobile);
    }

    function myAddress() public view returns(Address memory){
        return Adresses[msg.sender];
    }

    function myTransactions() public  view returns(Transaction[] memory){
        return transactions[msg.sender];
    }

    function purchase(uint256 _id) public   {
        require(_id < products.length, "Invalid product ID");

        Product storage product = products[_id];

        require(!product.sold, "Product already sold");
        
        require(owner != msg.sender, "Owner cannot buy own product");
        require(balanceOf(msg.sender) >= product.price, "Insufficient balance");

        _burn(msg.sender, product.price);
        transactions[msg.sender].push(Transaction(block.timestamp,product.price,0));
        product.owner = msg.sender;
        product.sold = true;
    }

}