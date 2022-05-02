import React from 'react';

class EditRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.props.records
    };
  }

  render() {
    return (
      <>
        <div>
          this.state.records
        </div>
      </>
    );
  }
}

export default EditRecord;
