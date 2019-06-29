import React from 'react';
import Navigation from './Components/navigation';
import MainPage from './Components/mainPage';
import './App.css';
import WebNotif from './Components/webNotif';

function App() {
  return (
    <div className="">
         <Navigation />
         <MainPage />
          <WebNotif />
    </div>
  );
}

export default App;
