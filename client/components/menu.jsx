import React from 'react';
import Context from '../lib/vehicleContext-context';
class Menu extends React.Component {
  isLoggedIn() {
    return (
      <li className='p-3 fs-5 border-0 bg-transparent list-group-item list-group-item-action'>
        <a className='text-decoration-none text-reset' href='#garage'>
          Garage
        </a>
      </li>
    );
  }

  isNotLoggedIn() {
    return (
      <li className='p-3 fs-5 border-0 bg-transparent list-group-item list-group-item-action'>
        <a className='text-decoration-none text-reset' href='#sign-in'>
          Sign-In
        </a>
      </li>
    );
  }

  render() {
    return (
      <div className=' d-none d-lg-block position-fixed'>
        <div id='menu' className='pe-5 bg-white'>
          <h2 className='m-0 list-group-item border-0'>Menu</h2>
          <ul className='list-group list-group-flush'>
            {this.context.user ? this.isLoggedIn() : this.isNotLoggedIn()}
          </ul>
        </div>
      </div>
    );
  }
}
Menu.contextType = Context;
export default Menu;
