pragma solidity ^0.5.0;
import "node_modules/@openzeppelin/contracts/access/Roles.sol";
        

contract RetailerRole{
    using Roles for Roles.Role;


    event RetailerAdded(address indexed account);
  event RetailerRemoved(address indexed account);

    Roles.Role private Retailers;

    modifier onlyRetailer() {
    require(isRetailer());
    _;
  }
  modifier notRetailer() {
    require(!isRetailer());
    _;
  }


  function isRetailer() public view returns (bool) {
    return Retailers.has(msg.sender);
  }
  //string memory name
  function addRetailer() public notRetailer {
    Retailers.add(msg.sender);
    emit RetailerAdded(msg.sender);
  }
    function renounceRetailer() public {
    _removeRetailer(msg.sender);
  }
   function _removeRetailer(address account) internal {
    Retailers.remove(account);
    emit RetailerRemoved(account);
  }
}