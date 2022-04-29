import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import LoadingSpinner from '../components/loading-spinner';
class AllRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      loaded: false
    };
  }

  componentDidMount() {
    fetch(`/api/vehicles/${this.props.vehicleId}/records`)
      .then(result => result.json())
      .then(result => {
        if (result.error) {
          this.setState({
            error: result.error
          });
        } else {
          this.setState({
            records: result,
            loaded: true
          });
        }
      })
      .catch(err => console.error(err));
  }

  displayRecordsList() {
    const { records } = this.state;
    return (
      <Accordion className='mt-3 mt-lg-0' defaultActiveKey={0}>
        {
      records.map((item, index) => {
        return (
        <Accordion.Item key={index} eventKey={index}>
          <Accordion.Header>
            {
              <div className='row fs-5 w-100'>
                <div className='col-4'>
                  <p className='text-start m-lg-3 m-0'>
                    {item.datePerformed}
                  </p>
                </div>
                <div className='col-5'>
                  <p className='text-start m-lg-3 m-0 text-capitalize'>
                    {item.names.join(', ')}
                  </p>
                </div>
                <div className='col-3 pe-4'>
                  <p className='text-end m-lg-3 m-0'>
                    {item.mileage.toLocaleString()}
                  </p>
                </div>
              </div>
            }
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {
                item.names.map((name, number) => {
                  return (
                    <li className='text-capitalize row fs-4 ms-4' key={number}>
                      <p className=' col-1 ps-3 border-start border-secondary m-0'></p>
                      <p className='col-6 text-start m-0 p-3 text-truncate'>
                        {name}
                      </p>
                      <p className='col-4 m-0 p-3 text-end'>
                        {`$${item.cost[number]}`}
                      </p>
                    </li>
                  );
                })
              }
              <li className='text-capitalize row fs-3 ms-5'>
                <p className='col-11 m-0 p-3 text-end'>
                  {<span className='fw-bolder'>Total: </span>} {`$${item.total}`}
                </p>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        );
      })
        }
      </Accordion>
    );
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <div className='mt-4'>
            <h1>Sorry! Something Went Wrong.</h1>
            <h1>{this.state.error}</h1>
          </div>
        </>
      );
    } else if (this.state.loaded) {
      return (
        <>
          <h1 className='m-3 d-lg-block d-none'>Vehicle Records</h1>
          {this.state.records.length > 0 && this.state.records ? this.displayRecordsList() : <p>no records</p>}
        </>
      );
    } else {
      return (
        <LoadingSpinner />
      );
    }
  }
}

export default AllRecords;
