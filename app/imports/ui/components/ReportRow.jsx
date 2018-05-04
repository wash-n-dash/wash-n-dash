import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, Icon, Button, Table, Header } from 'semantic-ui-react';
import { Reports } from '/imports/api/report/report';
import { Machines } from '/imports/api/machine/machine';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

class ReportRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  onDelete() {
    Reports.remove({ _id: this.props.report._id });
    this.setState({ open: false });
    Bert.alert({ type: 'success', message: 'report successfully deleted' });
  }

  render() {
    const machineId = this.props.report.machineId;
    /* get the machine type, number, and location of the machine with the same machineId as each report */
    return (
        <Table.Row>
          <Table.Cell width={2}>type & number</Table.Cell>
          <Table.Cell width={2}>location</Table.Cell>
          <Table.Cell>{this.props.report.createdAt.toLocaleDateString('en-US')} &nbsp;-
            {this.props.report.report}
          </Table.Cell>
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
              <Header>Are you sure you want to delete this report?</Header>
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
        </Table.Row>
    );
  }
}

ReportRow.propTypes = {
  report: PropTypes.object.isRequired,
};

export default withRouter(ReportRow);
