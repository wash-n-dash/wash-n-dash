import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Container, Card, Header, Loader } from 'semantic-ui-react';
import { Machines } from '/imports/api/machine/machine';
import MachineAdmin from '/imports/ui/components/MachineAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListMachinesAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Machines</Header>
          <Card.Group>
            {this.props.machines.map((machine, index) => <MachineAdmin key={index} machine={machine}/>)}
          </Card.Group>
        <Table celled>
          <Table.Header>
            <Table.HeaderCell>Machine</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Disable</Table.HeaderCell>
          </Table.Header>
          <Table.body>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.body>
        </Table>
        </Container>
    );
  }
}

/** Require an array of Machine documents in the props. */
ListMachinesAdmin.propTypes = {
  machines: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Machine documents.
  const subscription = Meteor.subscribe('MachinesAdmin');
  return {
    machines: Machines.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListMachinesAdmin);
