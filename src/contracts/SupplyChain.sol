pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract SupplyChain  {

  // Define a variable called 'sku' for Stock Keeping Unit (SKU)

  // Define a variable called 'upc' for Universal Product Code (UPC)
  uint  public upc=0;

  uint public cropc=0;

  uint public productc=0;

  uint public unionc=0;



  mapping (uint => Crop) public crops;

  mapping (uint => Product) public products;

  mapping (uint => Union) public unions;


// Define enum 'State' with the following values:
  enum State
  {
    NotUpForSale ,
    ForSale,
    Sold,
    soldToUnion
  
  }

    enum CropState {
        Harvested,  // 0
        Processed  // 1
    }

    enum Unionpayment {
      lending,
      Crowdsourcing
    }
    enum Memberpaidstate {
        notsent,
          sent
    }

// this.boughtstate[this.bstate.value]
  enum Grade
  {
    A,
    B,
    C,
    D,
    E
  }
  enum BoughtState
  {
    None,
    Crop,
    Union,
    Others
  }


    struct Crop {
        uint upc;  // Universal Product Code (UPC)
        uint cropNumber;
        string cropName;
        uint kg;
        string location;
        uint price;
        State  salestate;
        CropState cropstate;
        Grade cropgrade;
        address payable farmOwner;
        address payable newowner;
        // address payable Distributor;
  
  }

  struct Union {
    uint upc;  // Universal Product Code (UPC)
    uint uNumber;
    address payable uowner;
    uint receivedkg;
    uint maxkg;
    string cropName;
    string location;
    uint amountpaid;
    uint presentmember;
    uint priceperkg;
    uint priceforsale;
    address payable newowner;

  }

  struct UnionState {
    State productState;
   // Grade minReqgrade;
    CropState cropstate;
    Unionpayment payment;
    Memberpaidstate paidstate;

  }

  struct Unionmembers {
    uint cropid;
    address payable cropowner;
    uint pricegot;
  }
  mapping (uint=>UnionState) public unionstate;
  mapping ( uint=>mapping(uint=>Unionmembers))  public members;

  



  struct Product {
      uint upc;  // Universal Product Code (UPC)
      uint previousNumber;
      BoughtState bstate;
      uint productNumber;
      string productname;
      string productdescription;
      State productState;
      address payable productowner;
      uint price;
      address payable Distributor;
      address payable Retailer;

  }



    function harvestCrop(
        string memory _cropName,
        uint _kg,
        string memory _location,
        uint _cropstate,
        uint _price) public
    {
        cropc = cropc + 1;
        crops[cropc].upc = ++upc;
        crops[cropc].cropNumber = cropc;
        crops[cropc].cropName = _cropName;
        crops[cropc].kg = _kg;
        crops[cropc].price = _price;
        crops[cropc].location = _location;
        crops[cropc].cropstate = CropState(_cropstate);
        crops[cropc].salestate = State.ForSale;
        crops[cropc].farmOwner = msg.sender;

    }



    function Registerunion(
        string memory _cropName,
        uint _maxkg,
        string memory _location,
        uint _priceperkg,
        uint _cropstate,
        uint _paymentstate
    ) public
    {
        unionc = unionc+1;
        unions[unionc].uNumber = unionc;
        unions[unionc].upc = ++upc;
        unions[unionc].uowner = msg.sender;
        unions[unionc].maxkg = _maxkg;
        unions[unionc].cropName = _cropName;
        unions[unionc].location = _location;
        unions[unionc].priceperkg = _priceperkg;
        unionstate[unionc].cropstate = CropState(_cropstate);
        unionstate[unionc].payment = Unionpayment(_paymentstate);
    }
    

    function registerProduct(string memory _productname,
      uint _price, uint _id, string memory _productdescription, uint boughtstate ) public
    {
     
      products[++productc].upc = ++upc;
      products[productc].productNumber = productc;
      products[productc].productname = _productname;
      products[productc].productowner = msg.sender;
      products[productc].price = _price;
      products[productc].productState = State.ForSale;
      if(BoughtState.Crop==BoughtState(boughtstate))
      {
        require(_id<=cropc,"invalid crop id");
        require(crops[_id].newowner==msg.sender || (crops[_id].farmOwner== msg.sender && crops[_id].salestate== State.ForSale ),"only owner can call");
        products[productc].bstate = BoughtState.Crop;
        products[productc].previousNumber = _id;
      }
      else if(BoughtState.Union==BoughtState(boughtstate))
      {
        require(_id<=unionc,"invalid union id");
        require(unions[_id].newowner == msg.sender || (unions[_id].uowner == msg.sender && unionstate[_id].productState == State.ForSale ),"only owner can call");
        products[productc].bstate = BoughtState.Union;
        products[productc].previousNumber = _id;
      }
     
      products[productc].productdescription = _productdescription;

    }


    function joinunion(uint _cropid, uint _uNumber) public
    {
      require(unionstate[_uNumber].payment <= Unionpayment.Crowdsourcing, "union is no longer functioning");
       require(msg.sender==crops[_cropid].farmOwner);
       require(keccak256(abi.encodePacked(crops[_cropid].cropName)) == keccak256(abi.encodePacked(unions[_uNumber].cropName)));
       require(unions[_uNumber].maxkg>(unions[_uNumber].receivedkg+crops[_cropid].kg));
      unions[_uNumber].presentmember = unions[_uNumber].presentmember + 1;
      members[_uNumber][unions[_uNumber].presentmember].cropid = _cropid;
      members[_uNumber][unions[_uNumber].presentmember].cropowner = msg.sender;
      unions[_uNumber].receivedkg = unions[_uNumber].receivedkg+crops[_cropid].kg;
      crops[_cropid].salestate = State.soldToUnion;
      crops[_cropid].newowner = unions[_uNumber].uowner;


    }


    function cropPurchase(uint _cropid) public payable {
      
      Crop memory crop = crops[_cropid];
      address(crop.farmOwner).transfer(msg.value);
      crop.newowner = msg.sender;
      crop.salestate = State.Sold;

      crops[_cropid] = crop;

    }

    function productPurchase(uint _productid) public payable {
      Product memory product = products[_productid];

      address(product.productowner).transfer(msg.value);
      product.productState = State.Sold;
      product.Retailer = msg.sender;


      products[_productid] = product;



    }

    modifier unionowner(uint _unionid) {

      require(msg.sender==unions[_unionid].uowner,"only union owner can call");
      _;

    }

    function closeunion(uint _unionid ,uint _price) public
    unionowner(_unionid){
      Union memory union = unions[_unionid];
      union.maxkg = union.receivedkg;
      union.priceforsale = _price;
      unionstate[_unionid].productState = State.ForSale;
      unions[_unionid] = union;


    }
    function calculatepayment(uint _unionid) public
    {
      unions[_unionid].amountpaid = 0;
      for (uint i = 1;i<=unions[_unionid].presentmember;i++)
      {
        members[_unionid][i].pricegot = unions[_unionid].priceperkg*crops[members[_unionid][i].cropid].kg;
        unions[_unionid].amountpaid = unions[_unionid].amountpaid + members[_unionid][i].pricegot;
        crops[members[_unionid][i].cropid].price = members[_unionid][i].pricegot;
      }
    }



    function unionCroppurchase(uint _unionid) public payable {
      Union memory union = unions[_unionid];

      address(union.uowner).transfer(msg.value);
      unionstate[_unionid].productState = State.Sold;
      union.newowner = msg.sender;
      unions[_unionid] = union;

    }

    function sendunionmoney(uint _unionid) public payable
    {
      require(unions[_unionid].amountpaid!=0,"amount can't be zero");
      require(msg.sender==unions[_unionid].uowner);
      for (uint i = 1;i<=unions[_unionid].presentmember;i++)
      {
       
        address(members[_unionid][i].cropowner).transfer(members[_unionid][i].pricegot);
      }

      unionstate[unionc].paidstate = Memberpaidstate.sent;
    }



}