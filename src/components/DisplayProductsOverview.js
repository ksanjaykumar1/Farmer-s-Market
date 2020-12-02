import React from "react";
import { Component } from "react";
import Trackcrop from "./Trackcrop";

class DisplayProductOverview extends Component {


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
    "Sold To Cooperative"
  ]
  this.bstatecolor={

    0:"pink",
    1:"green",
    2:"brown"
  }
  this.bstatestate=[

    "None",
    "Crop",
    "Cooperative",
  ]
  this.state={
    cropid:0,
    previous:false,
    dcrop:{},
    dunion:{}

  }

 
  
  
  

    }

    render(){

        return(
            
            <div >
              
              { 
              this.props.products.map((product, key) => {
                

                

                return(
                  
                  <div className="product" key={key} >
                     <div className="product_organic"style={{background:this.salecolor[product.productState]}} > {this.salestate[product.productState]}</div>
                     <div className="product_organic"style={{background:this.bstatecolor[product.bstate]}} > {this.bstatestate[product.bstate]}</div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                      <p>UPC :   <input  value={product.upc.toNumber()}/></p>  
                      <p>NAME: <input value={product.productname} /> </p>
                      <p>Price:  <input value={window.web3.utils.fromWei(product.price.toString(), 'Ether')} />Eth </p>
                        {/* <p>ABOUT:   {product.productdescription}</p> */}
                   <p>ABOUT:   <input value={product.productdescription}/></p>
                   <p> Owner:<input value={product.productowner}/></p>
                   {product.productState== 1 ?
                        <button 
                              onClick={(event)=>{
                                
                                event.preventDefault()
                              
                                this.props.productPurchase(event,product.productNumber.toNumber(),product.price)
                              }}
                      
                            > Buy Prduct </button> :
                             <p>New Owner:<input value={product.Retailer}/></p>}

                        
                        {product.bstate > 0?
                         <div> <button 
                         onClick={(event)=>{
                           
                           event.preventDefault()
                           this.state.previous=true
                           if (product.bstate==1)
                           {
                          let dcorp = this.props.crops[2];
                           console.log(dcorp);
                          //  console.log(this.state.dcrop.farmOwner)
                            
                           
                       
                           }
                           else
                           {
                              this.state.dunion =this.props.unions[product.previousNumber];
                           console.log(this.state.dunion)
                           }
                         
                           this.props.productprevious(event,product.bstate,product.previousNumber.toNumber())
                         }}
                 
                       > Display Previous State </button> 
                       <p></p>
                       </div>
                       
                       :null
                       

                    }
                    {this.props.displaycrop}
                    
                    
                    {/* {this.state.previous==true &&this.product.bstate==1?
                     
                 
                    
                  
                  
                      :null

                    } */}

                   
                        
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

export default DisplayProductOverview;