import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteReminder,updateReminders } from '../Action/toDoAction';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      title: '',
      description: ''
    }
  }

  completeState = (id) => {
    const { checked } = this.state;
    if (checked) {
      this.setState({
        checked: null,
      });
    } else {
      this.setState({
        checked: id,
      })
    }
  }

   deleteReminder = (id,e) => {
    this.props.deleteReminder(id);
  }
 
  render () {
    const { reminders } = this.props;
    const { checked } = this.state;
    return(
            <div className="width">
        {
          reminders.map((reminder,index) => {
            return (
              <div key={reminder.id}
                   index={index} 
                   onClick={() => this.completeState(reminder.id)}
                   className={checked === reminder.id ? "d-flex list_container_checked flex-wrap justify-content-between" : "d-flex list_container flex-wrap justify-content-between"}
                  >
                  <div key={reminder.id}>
                    <div 
                       className={checked === reminder.id ? "title_style_checked" : "title_style"} 
                       contenteditable="true"
                       onInput={event => this.setState({title: event.target.value})}
                       onChange={this.onSubmitTitle}
                       >
                        {reminder.title}
                    </div>
                    <div 
                         className={checked === reminder.id ? "desc_style_checked" : "desc_style" }
                         contenteditable="true"
                         onInput={event => this.setState({description: event.target.value})}
                       >
                        {reminder.description}
                    </div>
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
                  <i className="material-icons delete_icon ">
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
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, { updateReminders,deleteReminder })(TodoListItem);