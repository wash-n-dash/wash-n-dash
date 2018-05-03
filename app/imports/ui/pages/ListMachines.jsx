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
  machineTypes = [{ text: 'Washing machines', value: 'Washer' }, { text: 'Dryers', value: 'Dryer' }];

  constructor(props) {
    super(props);
    this.state = { typeFilter: [], locationFilter: [] };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  machineLocations() {
    return _.uniq(this.props.machines.map((m, i) => m.location))
            .map(function(l, i) { return { text: l, value: l }; });
  }

  filteredMachines() {
    const typeFilter = this.state.typeFilter;
    const locationFilter = this.state.locationFilter;

    return this.props.machines
      .filter(m => m.enabled === 'enabled')
      .filter(m => typeFilter.length === 0 || (typeFilter.indexOf(m.machineType) !== -1))
      .filter(m => locationFilter.length === 0 || (locationFilter.indexOf(m.location) !== -1));
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const machineTypes = this.machineTypes;

    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Check Availability</Header>
          <Grid style={{ margin: '20px auto 20px auto' }} columns={2}>
            <Grid.Column>
              <Dropdown placeholder='Filter by Location' fluid multiple search selection
                        options={this.machineLocations()}
                        onChange={(e, d) => this.setState({locationFilter: d.value})}/>
              </Grid.Column>
              <Grid.Column>
                <Dropdown placeholder='Filter by Machine Type' fluid multiple search selection
                  options={machineTypes}
                  onChange={(e, d) => this.setState({typeFilter: d.value})}/>
              </Grid.Column>
          </Grid>
          <Card.Group>
            {this.filteredMachines().map((machine, index) =>
                <Machine key={index} machine={machine}
                         reports={this.props.reports.filter(report => (report.machineId === machine._id))}
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
