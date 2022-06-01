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
    this.redirect = this.redirect.bind(this);
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
    this.redirect();
  }

  redirect() {
    const url = new URL(window.location);
    if (this.state.user) {
      url.hash = 'garage';
    } else {
      url.hash = '#sign-in';
    }
    window.location.replace(url);
    return null;
  }

  renderPage() {
    const { route, user } = this.state;
    const page = {
      garage: <MyCars />,
      'garage/myCar': <CarDetails />,
      'vehicle-records': <AllRecords />
    };
    if (!navigator.onLine) {
      return (
        <>
          <div className='mt-4'>
            <h1>No Network Connection Detected</h1>
          </div>
        </>
      );
    }
    if (!user) {
      this.redirect();
      return <SignIn />;
    } else if (page[route.path]) {
      return page[route.path];
    }
    return <SignIn />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { route, user } = this.state;
    const { handleSignIn } = this;
    const vehicleId = route.params.get('vehicleId');
    const contextValue = { vehicleId, user, handleSignIn };
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
