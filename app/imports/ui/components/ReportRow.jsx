import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, Icon, Input, Dropdown, Checkbox, Button, Table, Container, Card, Header, Loader } from 'semantic-ui-react';
import { Reports } from '/imports/api/report/report';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

class ReportRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  onDelete() {
    Reports.remove({_id: this.props.report._id});
    this.setState({open: false});
    Bert.alert({ type: 'success', message: 'delete report succeeded' });
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell textAlign={"center"}>
          <Modal trigger={
                  <Button negative onClick={()=>this.setState({open: true})}>Delete</Button>
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
            <Header>Delete Report</Header>
            <Modal.Content>
              <p>Really delete report?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative
                onClick={() => this.onDelete()}>
                <Icon name='remove' />Delete
              </Button>
              <Button positive
                onClick={() => this.setState({open: false})}>
                Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
        <Table.Cell>{this.props.report.machineId}</Table.Cell>
        <Table.Cell>{this.props.report.report}</Table.Cell>
      </Table.Row>
    );
  }
}

ReportRow.propTypes = {
  report: PropTypes.object.isRequired,
};

export default withRouter(ReportRow);
