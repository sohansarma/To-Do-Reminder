import React from 'react';
import Notification  from 'react-web-notification';
import { connect } from 'react-redux';

//allow react dev tools work
window.React = React;

class WebNotif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: ''
    };
  }

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
  }

  /*handleNotificationOnShow(e, tag){
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }*/

  /*playSound(filename){
    document.getElementById('sound').play();
  }*/

  handleButtonClick() {
   /*const data = {reminders.map(reminder => {
       return reminder
      })
    }*/

    if(this.state.ignore) {
      return;
    }

    const now = Date.now();

    const title = 'Hello';
    const body = 'Task Name';
    const tag = 'Your task is Due on ;
    /*const icon = 'http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png';*/
    // const icon = 'http://localhost:3000/Notifications_button_24.png';

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
     /* icon: icon,*/
      lang: 'en',
      dir: 'ltr',
      // sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    }
    this.setState({
      title: title,
      options: options
    });
  }


  /*getData = () => {
    const date = {reminders.map(reminder => {
                     return reminder.dueDate;
                 })}
   console.log("Date from web notif",date);
  }*/

  render() {
   const { reminders } = this.props;
   console.log("Reminders from Web notif",reminders);
   const date = <div>{reminders.map(reminder => {
       return reminder.dueDate
   })
}</div>
  console.log("Date from ", date);
    return (
      <div>
             {/*{reminders.map(reminder => {
                 return reminder.dueDate
             })}*/}
        <button onClick={this.handleButtonClick.bind(this)}>Notif!</button>
        <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
        {/*<audio id='sound' preload='auto'>
          <source src='./sound.mp3' type='audio/mpeg' />
          <source src='./sound.ogg' type='audio/ogg' />
          <embed hidden='true' autostart='false' loop='false' src='./sound.mp3' />
        </audio>*/}
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