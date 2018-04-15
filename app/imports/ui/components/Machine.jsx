import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Machines } from '/imports/api/machine/machine';

/** renders a single machine */
class Machine extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  onClick() {
    Machines.remove(this.props.machine._id, this.deleteCallback);
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image floated='left' size='small'
                   src="https://cdn3.iconfinder.com/data/icons/clothes-products/512/washer-512.png"/>
            <Card.Header>
              {this.props.machine.machineType}
              { /** this.props.machine.machineNumber **/ }
            </Card.Header>
            <Card.Description>
              This {this.props.machine.machineType} is {this.props.machine.freeAfter > new Date() ? ('claimed until ' + this.props.machine.freeAfter) : ('free')}
              { /** Time Remaining: {this.props.washer.timeRemaining} **/ }
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button>Update</Button>
          </Card.Content>
          <Card.Content extra>
            <Button>Report</Button>
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
