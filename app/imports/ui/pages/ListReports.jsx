import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, Icon, Input, Dropdown, Checkbox, Button, Table, Container, Card, Header, Loader } from 'semantic-ui-react';
import { Reports } from '/imports/api/report/report';
import { withTracker } from 'meteor/react-meteor-data';
import ReportRow from '/imports/ui/components/ReportRow';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListReports extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>Reports</Header>
        <Table celled>
          <Table.Header>
            <Table.HeaderCell width={2}/>
            <Table.HeaderCell width={2}>Machine</Table.HeaderCell>
            <Table.HeaderCell>Report</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {this.props.reports.map(r => <ReportRow report={r} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

/** Require an array of Machine documents in the props. */
ListReports.propTypes = {
  reports: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Report documents.
  const subscription = Meteor.subscribe('Reports');
  return {
    reports: Reports.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListReports);