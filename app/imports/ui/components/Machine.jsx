import React from 'react';
import { Card, Image, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Machines } from '/imports/api/machine/machine';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Machine extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.machine.type}
            </Card.Header>
            <Card.Description>
              {this.props.machine.freeAfter > new Date() ? ("claimed until " + this.props.machine.freeAfter) : ("This machine is free")}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
Machine.propTypes = {
  machine: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Machine);
