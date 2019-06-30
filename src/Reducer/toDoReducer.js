import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, UPDATE_REMINDERS} from '../type';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  let { title, description, dueDate } = action;
  return {
    id: Math.random(),
    title,
    description,
    dueDate,
    reminded: false,
  }
}

//Removes data
const removeById  = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  /*console.log('new reduced reminders', reminders);*/
  return reminders;
}

const updateById  = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
 /* console.log('new updated reminders', reminders);*/
  return reminders;
}


const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie('reminders');
  
  switch(action.type) {
   
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      bake_cookie('reminders', reminders);
      return reminders;
    
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;
    
    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;

    case UPDATE_REMINDERS:
       reminders = updateById(state, action.id);
       bake_cookie('reminders', reminders);
       return reminders;
    
    default:
      return state;
  }
}

export default reminders;