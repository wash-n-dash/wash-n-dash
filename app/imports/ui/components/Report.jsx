import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Report extends React.Component {
  render() {
    return (
        <Feed.Event >
          <Feed.Content>
            <Feed.Date content={this.props.report.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              {this.props.report.report}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Report.propTypes = {
  report: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Report);
