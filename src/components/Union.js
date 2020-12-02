import React from "react";
import { Component } from "react";
import Select from 'react-select';
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

class Union extends Component {

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
    1:"lightBlue",
    2:"red",
    3:"grey"
  }
  this.salestate=[

    "Not Up For Sale",
    "ForSale",
    "Sold",
    "Sold To Union"
  ]
  this.Unionpaymentcolor={
    
    0:"Gold",
    1:"YellowGreen",
    2:"DarkOrange",
    3:"DeepPink"
  }
    
  

    this.Unionpayment=[
    {value:0 , label:"lending"},
    {value:1 ,label:"Crowdsourcing"},

]

this.Cropstate =[
  {value:0, label:"Harvest"},
  {value:1, label:"Processed"}

]

  this.state={
    cropid:0,
    selectpayementvalue:0,
    value:0
  }
  this.pvalue=0
  this.cropstate=0
  

    }
    handleChange = event => {
      console.log(event.target.value)
  this.pvalue= event.target.value;
      
      };
      handlecropstateChange = event => {
        console.log(event.target.value)
    this.cropstate= event.target.value;
        
        };
    


    render() {

        return(

            <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>
                  <h2>REGISTER CO-OPERATIVES </h2>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      const cropname=this.cropname.value
                      const location= this.location.value
                      //const price=this.price.value
                      const kg=this.kg.value
                     
                      const priceperkg=window.web3.utils.toWei(this.priceperkg.value.toString(), 'Ether')
                      const cropstate=this.cropstate
                      const paymentstate=this.pvalue
                      console.log(paymentstate)
                      this.props.postUnion(event,cropname,kg,location,priceperkg,cropstate,paymentstate)
                      }}>
                    
                    <div className="form-group mr-sm-2">
                      <input
                        id="cropname"
                        type="text"
                        ref={(input) => { this.cropname = input }}
                        className="form-control"
                        placeholder="enter the crop type Cooperative accepts"
                        required />
                        
                    </div>
                    <div className="form-group mr-sm-2">
                      <input
                        id="location"
                        type="text"
                        ref={(input) => { this.location = input }}
                        className="form-control"
                        placeholder="enter the Cooperative location"
                        required />
                        
                    </div>

                    <div className="form-group mr-sm-2">
                        <input
                            id="kg"
                            type="number"
                            ref={(input)=>{this.kg= input}}
                            className="form-control"
                            placeholder="Enter the max kg"
                            required />

                    </div>

                    <div className="form-group mr-sm-2">
                        <input
                            id="priceperkg"
                            type="text"
                            ref={(input)=>{this.priceperkg= input}}
                            className="form-control"
                            placeholder="Enter the price per kg offered farmer"
                            required />

                    </div>
                    
                    {/* <div className="form-group mr-sm-2">
                        <input
                            id="cropstate"
                            type="number"
                            ref={(input)=>{this.cropstate= input}}
                            className="form-control"
                            placeholder="Enter the crop state"
                            required />

                    </div> */}
                    
                    {/* <div className="form-group mr-sm-2">
                        <input
                            id="paymentstate"
                            type="number"
                            ref={(input)=>{this.paymentstate= input}}
                            className="form-control"
                            placeholder="Enter the payment state"
                            required />

                    </div> */}
                      <div className="label"> 
                    <label >
                        Select Crop State Type
                        <select  onChange={this.handlecropstateChange} >
                            id="cropstate"
                          {this.Cropstate.map(item => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                            
                          ))}
                          
                        </select>
                      </label>
                    </div>


                    <div class= "label"> 
                    <label >
                        Select payment Type
                        <select  onChange={this.handleChange} >
                            id="upaymentstate"
                          {this.Unionpayment.map(item => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                            
                          ))}
                          
                        </select>
                      </label>
                    </div>
                    {/* <div className="form-group mr-sm-2">
                      <input
                        id="price"
                        type="number"
                        ref={(input) => { this.price = input }}
                        className="form-control"
                        placeholder="Enter the price"
                        required />
                        
                    </div> */}

                    
                    
      
                    <button type="submit" className="btn btn-primary btn-block">Submit products</button>
                 </form>
                

                </div>
                
            </main>
        </div>
        </div>
        )





    }
}

export default Union;