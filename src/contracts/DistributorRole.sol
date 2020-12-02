pragma solidity ^0.5.0;
import "node_modules/@openzeppelin/contracts/access/Roles.sol";
        

contract DistributorRole{
    using Roles for Roles.Role;


    event DistributorAdded(address indexed account);
  event DistributorRemoved(address indexed account);

    Roles.Role private Distributors;

    modifier onlyDistributor() {
    require(isDistributor());
    _;
  }
  modifier notDistributor() {
    require(!isDistributor());
    _;
  }


  function isDistributor() public view returns (bool) {
    return Distributors.has(msg.sender);
  }

  function addDistributor() public notDistributor {
    Distributors.add(msg.sender);
    emit DistributorAdded(msg.sender);
  }
    function renounceDistributor() public {
    _removeDistributor(msg.sender);
  }
   function _removeDistributor(address account) internal {
    Distributors.remove(account);
    emit DistributorRemoved(account);
  }
}