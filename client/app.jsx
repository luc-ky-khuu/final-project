import React from 'react';
// import Home from './pages/home';
import Navbar from './components/navbar';
import MyCars from './pages/my-garage';
import Menu from './components/menu';
export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className='justify-content-center  row'>
            <div className=" col-lg-3 light-grey-bg d-none d-lg-block p-3">
              <Menu />
            </div>
            <div className="col-lg-9 light-grey-bg">
              <MyCars />
            </div>
          </div>
        </div>
      </>
    );
  }
}
