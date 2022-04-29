import React from 'react';

class LoadingSpinner extends React.Component {

  render() {
    return (
        <div className="row justify-center align-center">
          <div className="column position-relative">
            <div className="lds-hourglass spinner-position"></div>
          </div>
        </div>
    );
  }
}

export default LoadingSpinner;
