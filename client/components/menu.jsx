import React from 'react';

class Menu extends React.Component {

  render() {
    return (
      <div className=' d-none d-lg-block position-fixed'>
        <div id='menu' className='pe-5 bg-white'>
          <h2 className='m-0 list-group-item border-0'>Menu</h2>
          <ul className='list-group list-group-flush'>
            <li className='p-3 fs-5 border-0 bg-transparent list-group-item list-group-item-action'>
              <a className='text-decoration-none text-reset' href='#garage'>
                Garage
              </a>
            </li>
            <li className='p-3 fs-5 border-0 bg-transparent list-group-item list-group-item-action'>
              <a className='text-decoration-none text-reset' href='#'>
                SignUp
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
