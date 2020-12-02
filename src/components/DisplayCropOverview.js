import React from "react";
import { Component } from "react";

class DisplayCropOverview extends Component {


  constructor(props){
    super(props)
    this.cropcolor ={
      0:"green",
      1:"yellow",
  
  }
  this.cropstate=[
    
    "Harvested",  
"Processed",  
  ]
  this.salecolor={

    0:"pink",
    1:"lightblue",
    2:"red",
    3:"grey"
  }
  this.salestate=[

    "Not Up For Sale",
    "ForSale",
    "Sold",
    "Sold To Cooperative "
  ]
  // this.state={
  //   cropid:0
  // }
  

    }

    render(){

        return(
            
            <div >
              
              { this.props.crops.map((crop, key) => {
                    
                return(
                  <div className="product" key={key} >
                    <div className="product_organic"style={{background:this.cropcolor[crop.cropstate]}} > {this.cropstate[crop.cropstate]}</div>
                    <div className="product_organic"style={{background:this.salecolor[crop.salestate]}} > {this.salestate[crop.salestate]}</div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                      <p>UPC :   <input  value={crop.upc.toNumber()}/></p> 
                      <p>Crop id :   <input  value={crop.cropNumber.toNumber()}/></p> 
                      <p>NAME: <input value={crop.cropName} /> </p>
                      <p>Price: <input value={window.web3.utils.fromWei(crop.price.toString(), 'Ether')} />Eth </p>
                      <p>KG:   <input value={crop.kg.toNumber()} /></p>
                      <p>Farm Owner:<input value={crop.farmOwner}/> </p>
                        {/* <p>ABOUT:   {product.productdescription}</p> */}
                        {crop.salestate == 1 ?
                        <button 
                              onClick={(event)=>{
                                
                                event.preventDefault()
                                
                                this.props.cropPurchase(event,crop.cropNumber.toNumber(),crop.price)
                              }}
                      
                            > Buy Crop </button> :
                             <p>New Owner:<input value={crop.newowner}/></p>}
                        
                      </li>
                    </ul>
                    </div>
                    
                )   
              }
              )
            }

              
            </div>


        )
    }
}

export default DisplayCropOverview;