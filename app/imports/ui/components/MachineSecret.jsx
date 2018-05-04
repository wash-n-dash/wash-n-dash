import React from 'react';
import { Input, Button, Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class MachineSecret extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "" };
  }

  setSecret() {
    Meteor.call('setSecret', this.props.machine._id, this.state.password);
    Bert.alert({ type: 'success', message: 'secret updated' });
    this.setState({password: ""});
  }

  render() {
    return (
      <Table.Cell>
        <Input
          action={{content: 'Set', color: 'blue', onClick: (e, d)=>this.setSecret()}}
          placeholder="Set Secret"
          onChange={(e, d) => this.setState({password: d.value})}
          value={this.state.password}></Input>
      </Table.Cell>);
  }
}

export default withRouter(MachineSecret);
