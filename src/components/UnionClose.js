import React from "react";
import { Component } from "react";

class UnionClose extends Component {

  
    render() {

        return(

            <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>
                  <h2>Close Cooperative </h2>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                 
                      const upc=this.upc.value
                      const price = window.web3.utils.toWei(this.price.value.toString(), 'Ether')
                      
                      this.props.Unionclose(event,upc,price)
                      }}>

                    
                    <div className="form-group mr-sm-2">
                        <input
                            id="upc"
                            type="number"
                            ref={(input)=>{this.upc= input}}
                            className="form-control"
                            placeholder="Enter the Cooperative number"
                            required />

                    </div>
                    


                    <div className="form-group mr-sm-2">
                        <input
                            id="price"
                            type="text"
                            ref={(input)=>{this.price= input}}
                            className="form-control"
                            placeholder="set the price "
                            required />

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

export default UnionClose;