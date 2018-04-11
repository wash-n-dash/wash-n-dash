import React from 'react';
import { Card, Image, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from '/imports/ui/components/Note';
import AddNote from '/imports/ui/components/AddNote';
import { Bert } from 'meteor/themeteorchef:bert';
import { Machines } from '/imports/api/machine/machine';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
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
            <Image floated='right' size='mini' src={this.props.machine.image} />
            <Card.Header>
              {this.props.machine.type} {this.props.machine.lastName}
            </Card.Header>
            <Card.Meta>
              {this.props.contact.address}
            </Card.Meta>
            <Card.Description>
              {this.props.machine.freeAfter}
              </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.machine._id}`}>Edit</Link>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddNote machineId={this.props.machine._id}/>
          </Card.Content>
          <Card.Content extra>
            <Button basic onClick={this.onClick}>Delete</Button>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
Machine.propTypes = {
  machine: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Machine);
