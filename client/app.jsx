import React from 'react';
// import Home from './pages/home';
import Navbar from './components/navbar';
import MyCars from './pages/my-garage';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <MyCars />
      </>
    );
  }
}
