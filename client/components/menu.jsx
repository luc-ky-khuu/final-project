import React from 'react';

class Menu extends React.Component {

  render() {
    return (
      <div className='rounded-3 bg-white border py-3 shadow-sm d-none d-lg-block flex-grow-1 sticky-top'>
        <h2 className='m-0 list-group-item border-0'>Menu</h2>
        <ul className="list-group list-group-flush">
          <a className='text-decoration-none' href='#garage'>
            <li className="p-3 fs-5 border-0 bg-transparent list-group-item list-group-item-action">
              Garage
            </li>
          </a>
      </ul>
      </div>
    );
  }
}

export default Menu;
