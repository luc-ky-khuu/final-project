import React from 'react';

class Menu extends React.Component {

  render() {
    return (
      <div className='rounded-3 border border-secondary shadow d-none d-lg-block flex-grow-1 pe-3 sticky-top'>
        <h2>Menu</h2>
        <ul className="list-group list-group-flush">
          <a className='text-decoration-none' href='#garage'>
            <li className="border-0 bg-transparent list-group-item list-group-item-action">
              Garage
            </li>
          </a>
      </ul>
      </div>

    // <Nav className="d-none d-lg-block flex-grow-1 pe-3">
    //   <Nav.Link className='white-icon' href="#garage">Garage</Nav.Link>
    // </Nav>
    );
  }
}

export default Menu;
