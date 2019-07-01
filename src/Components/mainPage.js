import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../Action/toDoAction';
import DatePicker from "react-datepicker";
import WebNotif from './webNotif';
import "react-datepicker/dist/react-datepicker.css";
import TodoListItem from './toDoListItems'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      dueDate: '',
      edit: false,
      checked: false
    }
  }


  onSubmit = (event) => {
    const { title, description, dueDate } = this.state;
    if(title && description){
         this.props.addReminder( title,description,dueDate );
         this.setState({title: '', description: '', dueDate: ''});
         let inputFields = document.querySelectorAll('input');
         inputFields.forEach(input => input.value = '');
    }else{
         alert("You need to have a task and description");
    }
  }


   handleChange = (date) => {
    this.setState({
      dueDate: date
    });
  }

  
  render() {
    return (
      <div className="body_style">
      <div className="">
      <div style={{marginBottom: '20px'}} className= "d-flex justify-content-center align-items-center">
             <form 
               className="form-inline margin" 
               onChange={event => this.setState({title: event.target.value})}>
                 <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Add a new todo..."
                  />
            </form>
            <form 
              className="form-inline margin" 
              onChange={event => this.setState({description: event.target.value})}>
                <input 
                    type="text" 
                    ref="itemName" 
                    className="form-control" 
                    placeholder="Add a description..."
                 />
            </form>
            <div className="">
            <DatePicker
                position="bottom"
                className="date_container margin"
                placeholderText='Set Reminder'
                timeInputLabel="Time:"
                selected={this.state.dueDate}
                onChange={this.handleChange}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                minDate={new Date()}
                popperPlacement="top-end"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: '5px, 10px'
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                    boundariesElement: 'viewport'
                  }
                }}
            />
            </div>
            <div className="add_button d-flex align-items-center justify-content-center" onClick={this.onSubmit}>Add</div>
            <div
            className="d-flex align-items-center justify-content-center botton_style_remove"
            onClick={() => this.props.clearReminders()}
          >
            Clear reminders
          </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
         {/* { this.renderReminders() }*/}
          <TodoListItem />
          </div>
          <WebNotif />
          </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, {
    addReminder,
    deleteReminder,
    clearReminders })(MainPage);