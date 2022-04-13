import React from 'react';
// import Home from './pages/home';
import Navbar from './components/navbar';
import MyCars from './pages/my-garage';
import Menu from './components/menu';

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
      // console.log(parseRoute(window.location.hash).params.get('vehicleId'));
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
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
              <MyCars />
            </div>
          </div>
        </div>
      </>
    );
  }
}
