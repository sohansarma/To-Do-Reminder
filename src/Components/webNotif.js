import React from 'react';
import { connect } from 'react-redux';

//allow react dev tools work
window.React = React;
const ACCURACY = 60000;

function makeIgnoredList(reminders) {
  const now = new Date();
  if (!Array.isArray(reminders)) return [];
  return reminders.filter(f => {
      const dueDate = new Date(f.dueDate);
      return dueDate - now < 0;
  })
  .map(f => f.id);
}

class WebNotif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: '',
      ignoreList: makeIgnoredList(props.reminders)
    };
    this.handleNotificationInterval = this.handleNotificationInterval.bind(this);
    this.doTheNotificationThing = this.doTheNotificationThing.bind(this);
  }

  componentDidMount() {
    window.Notification.requestPermission(permission => {
      if(permission === 'granted') {
        this.interval = setInterval(this.handleNotificationInterval, ACCURACY);
      }
    })
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  doTheNotificationThing(point) {
    const ignoreList = this.state.ignoreList.slice().concat(point.id);
    const { title } = point;
    const header = "Hello";
    const bodyData = "Your task "+title+" is due now"
    const notification = new window.Notification(header, { body: bodyData });
    console.log(notification)
    navigator.vibrate(500);
    this.setState({
      ignoreList,
    })
  }

  handleNotificationInterval() {
    const { reminders: data } = this.props;
    const {
      ignoreList,
    } = this.state;
    if (!data) return;
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    data.filter(f => !ignoreList.includes(f.id)).map(point => {
      const { dueDate } = point;
      const check = new Date(dueDate);
      check.setSeconds(0);
      check.setMilliseconds(0);
      if (Math.abs(check - now) < ACCURACY * 2) {
        this.doTheNotificationThing(point);
      }
    });
  }


  render() {
    return (
      <div>
        
      </div>
    )
  }
};


function mapStateToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, {})(WebNotif);