import React from 'react';

class LoadingSpinner extends React.Component {

  render() {
    return (
        <div className='row mt-5 justify-center align-center'>
          <div className='position-relative'>
            <div className='lds-hourglass'></div>
          </div>
        </div>
    );
  }
}

export default LoadingSpinner;
