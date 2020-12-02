pragma solidity ^0.5.0;
import "node_modules/@openzeppelin/contracts/access/Roles.sol";
  

contract ConsumerRole{
    using Roles for Roles.Role;


    event ConsumerAdded(address indexed account);
  event ConsumerRemoved(address indexed account);

    Roles.Role private Consumers;

    modifier onlyConsumer() {
    require(isConsumer());
    _;
  }
  modifier notConsumer() {
    require(!isConsumer());
    _;
  }


  function isConsumer() public view returns (bool) {
    return Consumers.has(msg.sender);
  }

  function addConsumer() public notConsumer {
    Consumers.add(msg.sender);
    emit ConsumerAdded(msg.sender);
  }
    function renounceConsumer() public {
    _removeConsumer(msg.sender);
  }
   function _removeConsumer(address account) internal {
    Consumers.remove(account);
    emit ConsumerRemoved(account);
  }
}