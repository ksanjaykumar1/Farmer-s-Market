import React from "react";
import { Component } from "react";

class Crop extends Component {


  constructor(props){
    super(props)
    this.cropcolor ={
      0:"green",
      1:"yellow",
  
  }
  this.Cropstate =[
    {value:0, label:"Harvest"},
    {value:1, label:"Processed"}
  
  ]
  this.cropstate=0
}
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
                  <h2>REGISTER Crop </h2>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      const cropname=this.cropname.value
                      const location= this.location.value
                      const price=window.web3.utils.toWei(this.price.value.toString(), 'Ether')
                      const kg=this.kg.value
                      const cropstate=this.cropstate
                      this.props.postCrop(event,cropname,kg,location ,price,cropstate)
                      }}>
                    
                    <div className="form-group mr-sm-2">
                      <input
                        id="cropname"
                        type="text"
                        ref={(input) => { this.cropname = input }}
                        className="form-control"
                        placeholder="enter the crop type name"
                        required />
                        
                    </div>
                    <div className="form-group mr-sm-2">
                      <input
                        id="location"
                        type="text"
                        ref={(input) => { this.location = input }}
                        className="form-control"
                        placeholder="enter the crop location"
                        required />
                        
                    </div>

                    <div className="form-group mr-sm-2">
                        <input
                            id="kg"
                            type="number"
                            ref={(input)=>{this.kg= input}}
                            className="form-control"
                            placeholder="Enter the total kg"
                            required />

                    </div>
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

                    <div className="form-group mr-sm-2">
                      <input
                        id="price"
                        type="text"
                        ref={(input) => { this.price = input }}
                        className="form-control"
                        placeholder="Enter the price"
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

export default Crop;