import React from 'react';
import Navbar from './components/navbar';
import MyCars from './pages/my-garage';
import Menu from './components/menu';
import CarDetails from './pages/car-details';
import AllRecords from './pages/all-records';
import VehicleContext from './lib/vehicleContext-context';
import SignIn from './pages/sign-in';
import decodeToken from './lib/decode-token';

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
      route: parseRoute(window.location.hash),
      isAuthorizing: true,
      user: null
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('vehicle-expenses-tracker-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('vehicle-expenses-tracker-jwt', token);
    this.setState({ user });
    // need to figure out way to pass token to x-access-token header
  }

  renderPage() {
    const { route } = this.state;
    const vehicleId = route.params.get('vehicleId');
    if (!navigator.onLine) {
      return (
        <>
          <div className='mt-4'>
            <h1>No Network Connection Detected</h1>
          </div>
        </>
      );
    }
    if (!this.state.user) {
      return <SignIn />;
    }
    if (route.path === 'garage') {
      return <MyCars />;
    } else if (route.path === 'garage/myCar') {
      return (
        <CarDetails />
      );
    } else if (route.path === 'vehicle-records') {
      return <AllRecords vehicleId={vehicleId}/>;
    }
    return <SignIn />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const token = window.localStorage.getItem('vehicle-expenses-tracker-jwt');
    const { route, user } = this.state;
    const { handleSignIn } = this;
    const vehicleId = route.params.get('vehicleId');
    const contextValue = { vehicleId, user, handleSignIn, token };
    return (
      <>
        <VehicleContext.Provider value={contextValue}>
          <Navbar route={this.state.route.path}/>
          <div className='container'>
            <div className='justify-content-center row'>
              <div className='col-lg-2 d-none d-lg-block px-0'>
                <Menu />
              </div>
              <div className='text-center col-lg-10 '>
                {this.renderPage()}
              </div>
            </div>
          </div>
        </VehicleContext.Provider>
      </>
    );
  }
}
