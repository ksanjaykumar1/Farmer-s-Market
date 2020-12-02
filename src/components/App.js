import React, { Component } from "react";

import { BrowserRouter , Router, Route, Link, Switch } from 'react-router-dom'; 

import Identicon from 'identicon';
import SupplyChain from "../abis/SupplyChain.json";
import Web3 from 'web3';
import "./App.css";
import Navbar from "./Navbar";
import Product from "./Product";
import Crops from "./Crop";
import Union from "./Union";
import DisplayProductOverview from "./DisplayProductsOverview";
import DisplayCropOverview from "./DisplayCropOverview";
import DisplayUnionOverview from "./DisplayUnionOverview";
import UnionClose from "./UnionClose";
import Trackcrop from "./Trackcrop";


class App extends Component {
 
  async  componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
    
    
  }
  

  async loadWeb3() {
    
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData(){
    
     const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account:accounts[0]})
    const networkId =await web3.eth.net.getId()
    const networkSupplyChain= SupplyChain.networks[networkId]
    if (networkSupplyChain)
    {
      let supplyChain = new  web3.eth.Contract(SupplyChain.abi,networkSupplyChain.address)
      this.setState({supplyChain:supplyChain})

      const upc=await supplyChain.methods.upc().call()
      console.log(upc)
      this.setState({upc})

      const cropc=await supplyChain.methods.cropc().call()
      this.setState({cropc})

      const productc=await supplyChain.methods.productc().call()
      this.setState({productc})

      const unionc=await supplyChain.methods.unionc().call()
      this.setState({unionc})

      //to store crops
      for (var i = 1; i <= cropc; i++) {
        const crop = await supplyChain.methods.crops(i).call()
  
        this.setState({
          crops: [...this.state.crops, crop]
        })
        // console.log({crops:this.state.crops})

      }
      // console.log(this.state.crops)
      // let  x=this.state.crops[1]
      // console .log(x.location)

      // to store unions
      for ( i = 1; i <= unionc; i++) {
        const unionb = await supplyChain.methods.unions(i).call()
        
        const unionstate = await supplyChain.methods.unionstate(i).call()
        // const memberscount = unionb.args.presentmember;
        console.log(unionb.presentmember)
        this.setState({ members:[]})
        for (var j=1;j<=unionb.presentmember;j++)
        {
           const member= await supplyChain.methods.members(i,j).call()
           this.setState({ members:[...this.state.members,member]})
        }
        console.log(this.state.members)
        let union ={
          union:unionb,unionstate:unionstate,members:this.state.members 
        }
        this.setState({
          unions: [...this.state.unions, union]
        })
        // console.log({unions:this.state.unions})
      }
      
      //to store products
      for ( i = 1; i <= productc; i++) {
        const product = await supplyChain.methods.products(i).call()
  
        this.setState({
          products: [...this.state.products,product]
        })
        // console.log({products:this.state.products})
      }
    }

    
      


    

  }

  RegisterFarmerHandler=()=>{

    this.state.supplyChain.methods.addFarmer().send({ from: this.state.account })

  }

  RegisterDistributorHandler=()=>{

    this.state.supplyChain.methods.addDistributor().send({ from: this.state.account })

  }
  RegisterConsumerHandler=()=>{

    this.state.supplyChain.methods.addConsumer().send({ from: this.state.account })

  }
  RegisterRetailerHandler=()=>{

    this.state.supplyChain.methods.addRetailer().send({ from: this.state.account }) 

  }


  onpostCrop =(event,cropname,kg,location ,price,cropstate)=>{
    event.preventDefault()
    this.state.supplyChain.methods.harvestCrop(cropname,kg,location,cropstate ,price
      ).send({ from: this.state.account })
  }

  onpostUnion =(event,cropname,kg,location ,priceperkg,cropstate,paymentstate)=>{
    event.preventDefault()
    this.state.supplyChain.methods.Registerunion(cropname,kg,location,priceperkg,cropstate,paymentstate
      ).send({ from: this.state.account })
  }

  // onpostProduct=(event,productname,
  //   price,description) =>{
  //   // this.setState({ loading: true })
  //   event.preventDefault()
  //   this.state.supplyChain.methods.registerProduct(
  //     productname,
  //   price,
  //   description
      
  //     ).send({ from: this.state.account })
    
  // }

  // onpostProductCrop=(event,productname,
  //   price, cropid,description) =>{
  //   // this.setState({ loading: true })
  //   event.preventDefault()
  //   this.state.supplyChain.methods.registerProductCrop(
  //     productname,
  //   price,
  //   cropid,
  //   description
      
  //     ).send({ from: this.state.account })
    
  // }
  onpostProduct=(event,productname,
    price,id,
    description,bstate) =>{
    // this.setState({ loading: true })
    event.preventDefault()
    this.state.supplyChain.methods.registerProduct(
      productname,
    price,
    id,
    description, bstate
      
      ).send({ from: this.state.account })
    
  }

  onUnionClose=(event,upc,price)=>{
    event.preventDefault()
    this.state.supplyChain.methods.closeunion(upc,price).send({ from: this.state.account })
  }

  onjoinunion=(event,cropid,unionid)=>{
    event.preventDefault()
    this.state.supplyChain.methods.joinunion(cropid,unionid).send({ from: this.state.account })
  }

  oncropPurchase=(event,cropNumber,price)=>{
    event.preventDefault()
    this.state.supplyChain.methods.cropPurchase(cropNumber).send({ from: this.state.account,value:price })
  }

  onproductPurchase=(event,cropNumber,price)=>{
    event.preventDefault()
    this.state.supplyChain.methods.productPurchase(cropNumber).send({ from: this.state.account,value:price })
  }

  onunionCroppurchase=(event,uNumber,price)=>{
    event.preventDefault()
    this.state.supplyChain.methods.unionCroppurchase(uNumber).send({ from: this.state.account,value:price })
  }
  onsendunionmoney=(event,uNumber,price)=>{
    event.preventDefault()
    this.state.supplyChain.methods.sendunionmoney(uNumber).send({from:this.state.account,value:price})
  }
  oncalculatepayment=(event,uNumber)=>{
    event.preventDefault()
    this.state.supplyChain.methods.calculatepayment(uNumber).send({from:this.state.account})
  }
   ondisplaycrop =(event,cropid)=>{
    event.preventDefault()
    // const crop = await supplyChain.methods.crops(cropid).call()
    const dcorp = this.state.crops[cropid]
    console.log(dcorp);
  }
   onproductprevious =(event,bstate,previousNumber)=>{
    event.preventDefault()
   
    if (bstate==1)
    {
    const dcorp = this.state.crops[previousNumber];
    console.log(dcorp);
    this.state.displaycrop=(<Trackcrop
                    dcrop={this.state.dcrop}
 />)

    }
    else
    {
       const dunion =this.state.unions[previousNumber];
    console.log(dunion)
    }

  }

  constructor(props){

     super(props)
    this. state = { 
     web3: null, 
     account: null, 
     contract: null,
     supplyChain:null,
     crops:[],
     products:[],
     unions:[],
     members:[],
     upc:0,
     cropc:0,
     productc:0,
     unionc:0,
     displaycrop:null
    
    }


  }


  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       SimpleStorageContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   // await contract.methods.set(5).send({ from: accounts[0] });

  //   // // Get the value from the contract to prove it worked.
  //   // const response = await contract.methods.get().call();

  //   // // Update state with the result.
  //   // this.setState({ storageValue: response });
  // };

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <BrowserRouter>
      <div  >
        <Navbar account= {this.state.account}/>
{/*   
        <button className="container-fluid mt-5"onClick={this.RegisterFarmerHandler} >Register has Farmer</button>
        <button onClick={this.RegisterDistributorHandler} >Register has Distributor</button>
        <button onClick={this.RegisterRetailerHandler} >Register has Retailer</button>
        <button onClick={this.RegisterConsumerHandler} >Register has Consumer</button> */}

      
      

        
        

<Switch>

       <Route  path='/Crops'  >
       <Crops
          postCrop={this.onpostCrop}
        />

          <DisplayCropOverview
         crops={this.state.crops}
         cropPurchase={this.oncropPurchase} 
         />
         </Route>
         {/* <h1>Unions</h1> */}

         <Route  path="/Cooperatives" > 
         
         <Union postUnion={this.onpostUnion} 
        />


        <UnionClose
          Unionclose={this.onUnionClose}
        
        />
         <DisplayUnionOverview 
          unions={this.state.unions}
          joinunion={this.onjoinunion}
          unionCroppurchase={this.onunionCroppurchase}
          sendunionmoney={this.onsendunionmoney}
          calculatepayment={this.oncalculatepayment} />
          </Route>

        {/* // <h1>Products</h1> */}
        <Route  path='/Products' >
        <Product 
        products={this.state.products}
        postProduct={this.onpostProduct}
        />
        <DisplayProductOverview 
          products={this.state.products}
          productPurchase={this.onproductPurchase} 
          productprevious={this.onproductprevious}
          crops={this.state.crops}
          unions={this.state.unions}
          displaycrop={this.state.displaycrop}

          
        />
        </Route>
        </Switch>


      </div>
      </BrowserRouter>

    );
  }
}

export default App;
