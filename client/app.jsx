import React from 'react';
// import Home from './pages/home';
import Navbar from './components/navbar';
import MyCars from './pages/my-garage';
import Menu from './components/menu';
import CarDetails from './pages/car-details';

function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, queryString] = hashRoute.split('?');
  const params = new URLSearchParams(queryString);
  return { path, params };
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'garage') {
      return <MyCars />;
    } else if (route.path === 'garage/myCar') {
      return <CarDetails vehicleId={route.params.get('vehicleId')} />;
    }
    return <MyCars />;
  }

  renderNav() {
    if (this.state.route.params.get('vehicleId')) {
      return (
        <Navbar vehicleId={this.state.route.params.get('vehicleId')}/>
      );
    } else {
      return (
        <Navbar />
      );
    }
  }

  render() {
    // console.log(<CarDetails/>);
    return (
      <>
        {this.renderNav()}
        <div className="container">
          <div className='justify-content-center row'>
            <div className=" col-lg-2 d-none d-lg-block px-0 py-3">
              <Menu />
            </div>
            <div className="text-center col-lg-10 ">
              {this.renderPage()}
            </div>
          </div>
        </div>
      </>
    );
  }
}
