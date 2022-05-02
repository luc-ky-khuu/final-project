import React from 'react';
import { Accordion, Form } from 'react-bootstrap';
import LoadingSpinner from '../components/loading-spinner';
class AllRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      loaded: false,
      editing: null,
      editingName: null,
      editingCost: null
    };
    this.handleChange = this.handleChange.bind(this);
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

  editItem(item, number) {
    this.setState({
      editing: `${item.datePerformed} ${number}`,
      editingName: item.names[number],
      editingCost: item.cost[number]
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  displayRecordsList() {
    const { records, editing } = this.state;
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
              {
                item.names.map((name, number) => {
                  return (
                    <Form className='text-capitalize row fs-4 ms-5' key={number}>
                        <p className='col-1 ps-3 border-start border-secondary m-0'></p>
                        <p className='col-6 text-start m-0 p-3 text-truncate'>
                          {editing === `${item.datePerformed} ${number}`
                            ? <Form.Control
                            className='text-capitalize'
                            type='name'
                            name='editingName'
                            value={this.state.editingName}
                            onChange={this.handleChange}>
                            </Form.Control>
                            : name
                          }
                        </p>
                        <p className='col-4 m-0 p-3 text-end'>
                        {editing === `${item.datePerformed} ${number}`
                          ? <Form.Control
                            className='text-capitalize'
                            type='name'
                            name='editingCost'
                            value={this.state.editingCost}
                            onChange={this.handleChange}>
                          </Form.Control>
                          : `$${item.cost[number].toLocaleString()}`
                        }
                        </p>
                      <p className='col-1 m-0 p-0 align-self-center'>
                        <a className='btn fs-4' onClick={() => this.editItem(item, number)}><i className="bi bi-pencil-square"></i></a>
                      </p>
                    </Form>
                  );
                })
              }
              <div className='text-capitalize row fs-3 ms-5'>
                <p className='col-11 m-0 p-3 text-end'>
                  {<span className='fw-bolder'>Total: </span>} {`$${parseInt(item.total).toLocaleString()}`}
                </p>
              </div>
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
