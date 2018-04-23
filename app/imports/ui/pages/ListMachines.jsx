import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Card, Header, Loader, Dropdown } from 'semantic-ui-react';
import { Machines } from '/imports/api/machine/machine';
import { Reports } from '/imports/api/report/report';
import Machine from '/imports/ui/components/Machine';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Machine documents */
class ListMachines extends React.Component {
  // locations = this.props.machines.filter(machine => machine.location);
  // locations = [...new Set(this.props.machines.map(machine => machine.location))];
  locations = [{ text: 'Manoa', value: 'Manoa' }, {
    text: 'freshman dorm',
    value: 'freshman dorm',
  }, { text: 'apartment', value: 'apartment' }];
  machineTypes = [{
    text: 'Washing machines',
    value: 'Washing machines',
  }, { text: 'Dryers', value: 'Dryers' }];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const locations = this.locations;
    const machineTypes = this.machineTypes;
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Check Availability</Header>
          <Grid style={{ margin: '20px auto 20px auto' }} columns={2}>
            <Grid.Column><Dropdown placeholder='Filter by Location' fluid multiple search selection
                                   options={locations}/></Grid.Column>
            <Grid.Column><Dropdown placeholder='Filter by Machine Type' fluid multiple search selection
                                   options={machineTypes}/></Grid.Column>
          </Grid>
          <Card.Group>
            {this.props.machines.map((machine, index) =>
                <Machine key={index} machine={machine}
                         reports={this.props.reports.filter(report => (report.machineNumber === machine.machineNumber))}
                />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Machine documents in the props. */
ListMachines.propTypes = {
  machines: PropTypes.array.isRequired,
  reports: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Machine documents.
  const subscription = Meteor.subscribe('Machines');
  const subscription2 = Meteor.subscribe('Reports');
  return {
    machines: Machines.find({}).fetch(),
    reports: Reports.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ListMachines);
