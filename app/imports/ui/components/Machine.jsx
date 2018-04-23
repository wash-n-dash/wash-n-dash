import React from 'react';
import { Card, Image, Button, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Report from '/imports/ui/components/Report';
import AddReport from '/imports/ui/components/AddReport';
import { Machines } from '/imports/api/machine/machine';

/** renders a single machine */
class Machine extends React.Component {

  render() {
    return (
        <Card color='violet' centered>
          <Card.Content>
            <Image floated='left' size='small'
                   src="https://cdn3.iconfinder.com/data/icons/clothes-products/512/washer-512.png"/>
            <Card.Header>
              {this.props.machine.machineType} &nbsp;
              {this.props.machine.machineNumber}
            </Card.Header>
            <Card.Description>
              Time Remaining: {this.props.machine.timeRemaining}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>Update</Button>
              <Button basic color='red'>Report</Button>
            </div>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.reports.map((report, index) => <Report key={index} report={report}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddReport machineNumber={this.props.machine.machineNumber}/>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Machine.propTypes = {
  machine: PropTypes.object.isRequired,
  reports: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Machine);
