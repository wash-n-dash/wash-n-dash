import React from 'react';
import { Header, Card, Image, Button, Feed, Popup, Modal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Report from '/imports/ui/components/Report';
import { withTracker } from 'meteor/react-meteor-data';
import AddReport from '/imports/ui/components/AddReport';
import { Machines } from '/imports/api/machine/machine';
import { Reports } from '/imports/api/report/report';

/** renders a single machine */
class Machine extends React.Component {

  state = { open: false }
  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  addTime = (number) => (Machines.update(
      { _id: this.props.machine._id },
      { $set: { timeRemaining: this.props.machine.timeRemaining + number } },
  ))

  render() {
    const { open } = this.state;
    return (
        <Card color='violet' centered>
          <Card.Content>
            {this.props.machine.timeRemaining === 0 ?
                (<Image floated='right' size='tiny' src='images/greenWasher.png'/>)
                : <Image floated='right' size='tiny' src='images/washerIcon.png'/>}

            <Card.Header>
              {this.props.machine.machineType} &nbsp;
              {this.props.machine.machineNumber} &nbsp;
            </Card.Header>
            <Card.Meta>
              Location: {this.props.machine.location}
            </Card.Meta>
            <Card.Description>
              Time Remaining: {this.props.machine.timeRemaining}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Popup
                  trigger={<Button positive onClick={() => this.addTime(5)}>Update</Button>}
                  content='Click to add 5 minutes to the time remaining'
                  position='bottom right'/>
              <Popup trigger={<Button negative onClick={this.show}>Report</Button>}
                     content='Click to report an issue with this machine'
                     position='bottom left'/>

              <Modal dimmer='blurring' open={open} onClose={this.close} style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto !important',
                display: 'inline-block !important',
                position: 'relative',
                top: '10%',
                padding: '25px',
                height: '550px',
              }}>
                <Modal.Header style={{ color: 'blue', fontSize: '35px' }}>
                  Report an issue for {this.props.machine.machineType} {this.props.machine.machineNumber}
                </Modal.Header>
                <AddReport machineId={this.props.machine._id}/>
                <Header><Icon name='warning circle' color='orange'/>Reported Issues</Header>
                <Modal.Content style={{ height: '200px' }} scrolling>
                  <Modal.Description>
                    <Feed>
                      {this.props.reports.map((report, index) => <Report key={index} report={report}/>)}
                    </Feed>
                  </Modal.Description></Modal.Content>
              </Modal>

            </div>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Machine.propTypes = {
  machine: PropTypes.object.isRequired,
  reports: PropTypes.array.isRequired,
  anyReports: PropTypes.bool,
};

const MachineContainer = withTracker(() => ({
  anyReports: !!Reports.find(),
}))(Machine);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MachineContainer);
