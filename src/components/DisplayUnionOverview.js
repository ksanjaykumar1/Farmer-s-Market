import React from "react";
import { Component } from "react";
import { Button } from "react-bootstrap";


class DisplayUnionOverview extends Component {

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
    "Sold To Cooperative"
  ]
  this.Unionpaymentcolor={
    
    0:"Gold",
    1:"YellowGreen",
    2:"DarkOrange",
    3:"DeepPink"
  }
    
  

    this.Unionpayment=[
    "lending",
      "Crowdsourcing"
      
  ]
  this.memberpaidstate =[
    "Members are not paid",
      "Memebr are paid "
  ]
  this.memberpaidcolor={
    0:"Red",
    1:"Green"
  }

  this.state={
    cropid:0
  }
  this.mstate=false
  

    }
    memberdisplayhandler=()=>{
      
      let  x=this.mstate
      this.mstate=true
    }
    

    render(){

        return(
            
            <div >
              
              { this.props.unions.map((union, key) => {
               
               
                return(
                  
                  <div className="product" key={key} >
                    <div className="product_organic"style={{background:this.cropcolor[union.unionstate.cropstate]}} > {this.cropstate[union.unionstate.cropstate]}</div>
                    <div className="product_organic"style={{background:this.salecolor[union.unionstate.productState]}} > {this.salestate[union.unionstate.productState]}</div>
                    <div className="product_organic"style={{background:this.Unionpaymentcolor[union.unionstate.payment]}} > {this.Unionpayment[union.unionstate.payment]}</div>
                    <div className="product_organic"style={{background:this.memberpaidcolor[union.unionstate.paidstate]}} > {this.memberpaidstate[union.unionstate.paidstate]}</div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                      <p>UPC :   <input  value={union.union.upc.toNumber()}/></p>
                      <p>Union Number :   <input  value={union.union.uNumber.toNumber()}/></p>  
                      <p>Crop NAME: <input value={union.union.cropName} /> </p>
                      <p>Cooperative  Address:  <input value={union.union.uowner}/></p>
                      <p>Farmer perkg Price:  <input value={window.web3.utils.fromWei(union.union.priceperkg.toString(), 'Ether')} />Eth </p>
                      <p>Location:  <input value={union.union.location}/></p>
                      <p>No. People Joined:  <input value={union.union.presentmember}/></p>
                      <p>Max kg:  <input value={union.union.maxkg}/></p>
                      <p>Recievd kg:  <input value={union.union.receivedkg}/></p>
                      {union.unionstate.productState == 0 ? <p>Enter Crop ID to Join <input
                            id="cropid"
                            type="number"
                            
                            placeholder="Enter the cropid"
                            required on 
                            onChange={(event)=>{
                              event.preventDefault()
                               this.state.cropid=event.target.value;
                            }} /> 

                      
                      <button 
                              onClick={(event)=>{
                                
                                event.preventDefault()

                                let unionid=union.union.uNumber.toNumber()
                                this.props.joinunion(event,this.state.cropid,unionid)
                              }}
                      
                            > Join Union </button> </p> 
                            :null}
                            {union.unionstate.productState== 1 ?
                            <p> Price :  <input value={window.web3.utils.fromWei(union.union.priceforsale.toString(), 'Ether')} />Eth 
                            <button onClick={(event)=>{
                               event.preventDefault()
                               let price=union.union.priceforsale
                               this.props.unionCroppurchase(event,union.union.uNumber.toNumber(),price)

                            }}>Buy </button></p>:null
                             }
                            

                            {union.unionstate.paidstate == 0 ? <div> 
                             <button onClick={(event)=>{
                              event.preventDefault()
                            
                              this.props.calculatepayment(event,union.union.uNumber.toNumber())}}
                           >Calculate Amount to pay Members</button>

                               <p> Amount to pay  :  <input value={window.web3.utils.fromWei(union.union.amountpaid.toString(), 'Ether')} />Eth 
                              </p>
                              <p><button onClick={(event)=>{
                                event.preventDefault()
                                let price =union.union.amountpaid
                                this.props.sendunionmoney(event,union.union.uNumber.toNumber(),price)
 
                             }}>Send Money to members</button> </p>
                               </div>

                             :
                             <div>
                             
                             <p>Amount Paid To Members <input value={window.web3.utils.fromWei(union.union.amountpaid.toString(), 'Ether')} />Eth  </p></div>
                                }

                              {union.unionstate.productState==2?
                             <div> 
                               <p>New Owner Address:  <input value={union.union.newowner}/></p>
                               <p> Sold Price  :  <input value={window.web3.utils.fromWei(union.union.priceforsale.toString(), 'Ether')} />Eth</p></div> 
                             :null
                            }
                            <button onClick={(event)=>{
                              event.preventDefault()
                              this.memberdisplayhandler()}}>Display Members</button>
                            {this.mstate==false ?
                            <div>

                              {union.members.map((item,key)=>(
                                <div>
                                <p>Member{key+1}</p>
                                <p>Farmer id : <input value={item.cropowner}/></p>
                                <p>Crop id : <input value={item.cropid}/></p>
                                <p>Amount Paid To Member <input value={window.web3.utils.fromWei(item.pricegot.toString(), 'Ether')} />Eth  </p></div>
                              ))


                              }
                            </div>
                            :null
                              }

                            
                             

                            
                        
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

export default DisplayUnionOverview;