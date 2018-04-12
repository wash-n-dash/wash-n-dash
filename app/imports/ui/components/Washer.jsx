import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Washers } from '/imports/api/washer/washer';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Washer extends React.Component {

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
    Washers.remove(this.props.washer._id, this.deleteCallback);
  }
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image floated='left' size='small' src="https://cdn3.iconfinder.com/data/icons/clothes-products/512/washer-512.png" />
            <Card.Header>
              Washer {this.props.washer.washerNumber}
            </Card.Header>
            <Card.Description>
              Time Remaining: {this.props.washer.timeRemaining}
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
Washer.propTypes = {
  washer: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Washer);
