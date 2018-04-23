import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { Machines } from '/imports/api/machine/machine';
import { Reports } from '/imports/api/report/report';
import Machine from '/imports/ui/components/Machine';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Machine documents */
class ListMachines extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Washers/Dryers</Header>
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
