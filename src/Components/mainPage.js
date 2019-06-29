import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../Action/toDoAction';
import moment from 'moment';
import DatePicker from "react-datepicker";
import webNotif from './webNotif';
import "react-datepicker/dist/react-datepicker.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      dueDate: '',
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
         alert("Write something");
    }
  }

  deleteReminder = (id) => {
    this.props.deleteReminder(id);
  }

   handleChange = (date) => {
    this.setState({
      dueDate: date
    });
  }

  renderReminders = () => {
    const { reminders } = this.props;
    console.log("Reminder",reminders);
    return (
      <div className="width">
        {
          reminders.map(reminder => {
            return (
              <div className="d-flex list_container flex-wrap justify-content-between">
                  <div className="" key={reminder.id}>
                    <div className="title_style" contenteditable="true">{reminder.title}</div>
                    <div className="desc_style" contenteditable="true">{reminder.description}</div>
                    {reminder.dueDate && 
                      <div className="d-flex">
                        <div className="Reminder_text d-flex align-items-center">Reminder set for</div>
                        <div className="Date_style">{moment(new Date(reminder.dueDate)).format('lll')}</div>
                      </div>
                    }
                    
                  </div>
                  <div 
                    className="d-flex align-items-center"
                    onClick={() => this.deleteReminder(reminder.id)}
                  >
                  <i class="material-icons delete_icon ">
                  delete_forever
                  </i>
                  </div>
              </div>
            );
          })
        }
        </div>
    );
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
                    ref="itemName" 
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
          { this.renderReminders() }
          </div>
          <webNotif />
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