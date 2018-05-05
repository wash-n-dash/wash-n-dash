import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Input, Dropdown, Checkbox, Button, Table, Container, Header, Loader } from 'semantic-ui-react';
import { Machines } from '/imports/api/machine/machine';
import { withTracker } from 'meteor/react-meteor-data';
import DeleteMachine from '/imports/ui/components/DeleteMachine';
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
          <Header as="h2" textAlign="center" inverted>Machines Admin</Header>
          <Table celled>
            <Table.Header>
              <Table.HeaderCell>Machine</Table.HeaderCell>
              <Table.HeaderCell>Number</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Disable</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {this.props.machines.map((machine, index) =>
                  <Table.Row positive={machine.enabled === 'enabled'}
                             negative={machine.enabled === 'disabled'}>
                    <Table.Cell>{machine._id}</Table.Cell>
                    <Table.Cell>
                      <Input
                        value={machine.machineNumber}
                        onChange={(e, d) => Machines.update(
                          { _id: machine._id },
                          { $set: { machineNumber: d.value } },
                        )} />
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                          options={[{ text: 'Washer', value: 'Washer' }, { text: 'Dryer', value: 'Dryer' }]}
                          placeholder='Choose an option'
                          selection
                          onChange={(e, d) => Machines.update(
                              { _id: machine._id },
                              { $set: { machineType: d.value } },
                          )}
                          value={machine.machineType}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                          defaultValue={machine.location}
                          onChange={(e, d) => Machines.update(
                              { _id: machine._id },
                              { $set: { location: d.value } },
                          )}/>
                    </Table.Cell>
                    <Table.Cell>{machine.timeRemaining} minutes remaining</Table.Cell>
                    <Table.Cell>
                      <Checkbox toggle
                                defaultChecked={machine.enabled === 'enabled'}
                                onChange={(e, d) => Machines.update(
                                    { _id: machine._id },
                                    { $set: { enabled: d.checked ? 'enabled' : 'disabled' } },
                                )}
                                label={machine.enabled}/>
                    </Table.Cell>
                    <DeleteMachine key={index} machine={machine}/>
                  </Table.Row>)}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan='8'>
                  <Button floated='right' icon labelPosition='left' primary size='small'
                          onClick={(e) => Machines.insert({
                            enabled: 'disabled',
                            machineNumber: this.props.machines.length + 1,
                          })}>
                    <Icon name='user'/> Add Machine
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
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
  const subscription = Meteor.subscribe('Machines');
  return {
    machines: Machines.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListMachinesAdmin);
