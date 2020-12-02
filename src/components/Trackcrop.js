import React from "react";
import { Component } from "react";

class Trackcrop extends Component {


  
  


    render() {

        return( 
            <div>
                <li>
       <p>UPC :   <input  value={this.props.dcrop.crops.upc.toNumber()}/></p> 
       <p>Crop id :   <input  value={this.props.dcrop.cropNumber.toNumber()}/></p> 
       <p>NAME: <input value={this.props.dcrop.cropName} /> </p>
       <p>Price: <input value={window.web3.utils.fromWei(this.props.dcrop.price.toString(), 'Ether')} />Eth </p>
       <p>KG:   <input value={this.props.dcrop.kg.toNumber()} /></p>
       <p>Farm Owner:<input value={this.props.dcrop.farmOwner}/> </p>
       console.log("rage again machina")
       </li>


            </div>
        )
    }

}
export default Trackcrop;