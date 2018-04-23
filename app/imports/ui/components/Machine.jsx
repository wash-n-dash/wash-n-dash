import React from 'react';
import { Header, Card, Image, Button, Feed, Popup, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Report from '/imports/ui/components/Report';
import AddReport from '/imports/ui/components/AddReport';
import { Machines } from '/imports/api/machine/machine';

/** renders a single machine */
class Machine extends React.Component {

  state = { open: false }
  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;

    return (
        <Card color='violet' centered>
          <Card.Content>
            <Image floated='left' size='small'
                   src='https://cdn3.iconfinder.com/data/icons/clothes-products/512/washer-512.png'/>
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
              <Popup trigger={<Button positive>Update</Button>}
                     content='Click to add 60 minutes to the time remaining'
                     position='top right'/>
              <Popup trigger={<Button negative onClick={this.show}>Report</Button>}
                     content='Click to report an issue with this machine'
                     position='top left'/>

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
                <Modal.Header style={{ color: 'blue' }}>
                  Report an issue for {this.props.machine.machineType} {this.props.machine.machineNumber}
                </Modal.Header>
                <AddReport machineNumber={this.props.machine.machineNumber}/>
                <Header>Reported Issues</Header>
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
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Machine);
