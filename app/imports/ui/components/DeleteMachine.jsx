import React from 'react';
import { Modal, Icon, Button, Table, Header } from 'semantic-ui-react';
import { Machines } from '/imports/api/machine/machine';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

class DeleteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  onDelete() {
    Machines.remove({ _id: this.props.machine._id });
    this.setState({ open: false });
    Bert.alert({ type: 'success', message: 'machine successfully deleted' });
  }

  render() {
    /* get the machine type, number, and location of the machine with the same machineId as each report */
    return (

          <Table.Cell textAlign='center'>
            <Modal trigger={
              <Button negative align='right' onClick={() => this.setState({ open: true })}>Delete</Button>
            }
                   open={this.state.open}
                   style={{
                     marginLeft: 'auto',
                     marginRight: 'auto',
                     marginTop: 'auto !important',
                     display: 'inline-block !important',
                     position: 'relative',
                     top: '10%',
                     padding: '25px',
                   }}>
              <Header>Are you sure you want to delete this machine?</Header>
              <Modal.Actions>
                <Button negative
                        onClick={() => this.onDelete()}>
                  <Icon name='remove'/>Delete
                </Button>
                <Button positive
                        onClick={() => this.setState({ open: false })}>
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </Table.Cell>

    );
  }
}

DeleteMachine.propTypes = {
  machine: PropTypes.object.isRequired,
};

export default withRouter(DeleteMachine);
