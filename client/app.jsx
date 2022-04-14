import React from 'react';
// import Home from './pages/home';
import Navbar from './components/navbar';
import MyCars from './pages/my-garage';
import Menu from './components/menu';
import CarDetails from './pages/car-details';
import AddForm from './components/add-record';

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

  render() {

    return (
      <>
        <Navbar />
        <div className="container">
          <div className='justify-content-center row'>
            <div className=" col-lg-3 d-none d-lg-block p-3">
              <Menu />
            </div>
            <div className="text-center col-lg-9 ">
              {this.renderPage()}
            </div>

              <AddForm vehicleId={this.state.route.params.get('vehicleId')}/>

          </div>
        </div>
      </>
    );
  }
}
