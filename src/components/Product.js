import React from "react";
import { Component } from "react";

class Product extends  Component{

  constructor(props){

    super(props)
    // this.brrrought=[
    //   "None",
    //   "Crop",
    //   "Union",
    //   "Others"
    // ],
    this.boughtstate=[
      {label:"None",value:0},
      {label:"Crop",value:1},
      {label:"Cooperative",value:2},
      {label:"Others",value:3}
  ]
  this.pvalue=0
}

handleChange = event => {
  console.log(event.target.value)
this.pvalue= event.target.value;
  
  };

    render(){

        
        return(

            <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>
                  <h2>REGISTER PRODUCT  </h2>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      const productname=this.productname.value
                      const price=window.web3.utils.toWei(this.price.value.toString(), 'Ether')
                      const id=this.cropid.value
                      const bstate=this.pvalue
                      const description=this.description.value
                      this.props.postProduct(event,productname,
                        price,id,description,bstate)
                      }}>
                    
                    <div className="form-group mr-sm-2">
                      <input
                        id="productname"
                        type="text"
                        ref={(input) => { this.productname = input }}
                        className="form-control"
                        placeholder="enter the product name"
                        required />
                        
                    </div>

                    <div className="form-group mr-sm-2">
                      <input
                        id="price"
                        type="text"
                        ref={(input) => { this.price = input }}
                        className="form-control"
                        placeholder="Enter the price"
                        required />
                        
                    </div>

                    <div className="form-group mr-sm-2">
                      <input
                        id="cropid"
                        type="number"
                        ref={(input) => { this.cropid = input }}
                        className="form-control"
                        placeholder="Enter the Previous Bought id"
                        required />
                        
                    </div>

                    {/* <div className="form-group mr-sm-2">
                      <input
                        id="bstate"
                        type="number"
                        ref={(input) => { this.bstate = input }}
                       
                        className="form-control"
                        placeholder="Enter the bought state"
                        required />
                        
                    </div> */}

                    <div className="label"> 
                    <label >
                    Enter the bought state
                        <select  onChange={this.handleChange} >
                            
                          {this.boughtstate.map(item => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                            
                          ))}
                          
                        </select>
                      </label>
                    </div>

                    <div className="form-group mr-sm-2">
                      <input
                        id="description"
                        type="text"
                        ref={(input) => { this.description = input }}
                        className="form-control"
                        placeholder="enter the product description like wt and other necessary"
                        required />
                        
                    </div>
                    
      
                    <button type="submit" className="btn btn-primary btn-block">Submit products</button>
                 </form>
                

                </div>

            
            </main>
        </div>
        </div>
        
        )
    }



}

export default Product;



// <div className="form-group mr-sm-2">
// <input
//   id="originFarmName"
//   type="text"
//   ref={(input) => { this.originFarmName = input }}
//   className="form-control"
//   placeholder="enter farmer name"
//   required />    
// </div>



// <div className="form-group mr-sm-2">
// <input
//   id="originFarmLatitude"
//   type="text"
//   ref={(input) => { this.originFarmLatitude = input }}
//   className="form-control"
//   placeholder="enter Farm Latitude"
//   required />
// </div>

// <div className="form-group mr-sm-2">
// <input
//   id="originFarmLongitude"
//   type="text"
//   ref={(input) => { this.originFarmLongitude = input }}
//   className="form-control"
//   placeholder="enter Farm Longitude"
//   required />
// </div>

// <div className="form-group mr-sm-2">
// <input
//   id="originFarmInformation"
//   type="text"
//   ref={(input) => { this.originFarmInformation = input }}
//   className="form-control"
//   placeholder="enter Farmer Information"
//   required />    
// </div>

// <div className="form-group mr-sm-2">
// <input
//   id="productNotes"
//   type="text"
//   ref={(input) => { this.productNotes = input }}
//   className="form-control"
//   placeholder="enter  productNotes"
//   required />
// </div>