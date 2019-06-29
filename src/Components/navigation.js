import React,{ Component } from 'react';
import '../style.css';



class Navigation extends Component {
	constructor(){
		super()
		this.state ={
			toggle: false,
		}
	}

     handleToggle = () => {
     	this.setState({toggle:!this.state.toggle});
     }
  

	render(){
		return(
               <div className="navigation d-flex justify-content-between">
                  <div className="logo">TO-DO-LIST</div>
                  {/*<div onClick={this.handleToggle}>
                  {this.state.toggle ?
                  		<i className="material-icons toggle">toggle_on</i>
                  		:
                  		<i className="material-icons toggle">toggle_off</i>
                  }
                  </div>*/}
               </div>
			);
	}
}

export default Navigation;