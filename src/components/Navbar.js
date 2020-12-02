import React,{Component} from 'react';
 import Identicon from 'identicon';
 import { BrowserRouter , Router, Route, Link, Switch } from 'react-router-dom'; 
 import {
  Navbar as BlueprintNavbar,
  NavbarGroup,
  NavbarHeading,
  Button
} from '@blueprintjs/core'


class Navbar extends Component{
    render(){
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-50 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href=" "
          target="_blank"
          rel="noopener noreferrer"
        > Farmer's Market
        </a>
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" 
         rel="noopener noreferrer"
         to="/Crops">Crops</Link>
         <Link className="navbar-brand col-sm-3 col-md-0 mr-0" 
         rel="noopener noreferrer"
         to="/Products">Products</Link>
         <Link className="navbar-brand col-sm-3 col-md-0 mr-0" 
         rel="noopener noreferrer"
         to="/Cooperatives">Cooperatives</Link>
         
        <ul className="navbar-nav px-3">
        
          
         
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { this.props.account ///ternary operator
              ? <img
                className='ml-2'
                width='30'
                height='30'
                // src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
        );
    }
}

export default Navbar