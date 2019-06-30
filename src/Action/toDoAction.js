import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, UPDATE_REMINDERS } from '../type';

export const addReminder = ( title, description, dueDate) => {
    const action = {
        type: ADD_REMINDER,
        title,
        description,
        dueDate
    }
   /* console.log('-------------action in addReminder---------->', action);*/
    return action;
}

export const deleteReminder = (id) => {
    const action = {
        type: DELETE_REMINDER,
        id
    }
    /*console.log('---------------deleting in actions---------->', action);*/
    return action;
}

export const clearReminders = () => {
    const action = {
        type: CLEAR_REMINDERS
    }
    return action;
}

export const updateReminders = () => {
    const action = {
        type: UPDATE_REMINDERS
    }
    return action;
}