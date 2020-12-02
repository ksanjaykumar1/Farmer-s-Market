pragma solidity ^0.5.0;
import "node_modules/@openzeppelin/contracts/access/Roles.sol";
        

contract FarmerRole{
    using Roles for Roles.Role;


    event FarmerAdded(address indexed account);
  event FarmerRemoved(address indexed account);

    Roles.Role private farmers;

    modifier onlyFarmer() {
    require(isFarmer());
    _;
  }
  modifier notFarmer() {
    require(!isFarmer());
    _;
  }


  function isFarmer() public view returns (bool) {
    return farmers.has(msg.sender);
  }

  // string memory name
  function addFarmer() public notFarmer {
    farmers.add(msg.sender);//name
    emit FarmerAdded(msg.sender);
  }
    function renounceFarmer() public {
    _removeFarmer(msg.sender);
  }
   function _removeFarmer(address account) internal {
    farmers.remove(account);
    emit FarmerRemoved(account);
  }

//   function displayFarmerName(address account) public returns(string memory name)
//   {
//     return (farmers.displayname( account));
//   }
}