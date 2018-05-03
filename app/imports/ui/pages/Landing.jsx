/* eslint-disable max-len */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Header, Grid, Icon } from 'semantic-ui-react';
import { Machines } from '/imports/api/machine/machine';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /* Render the page once total number of available machines have been received. */
  renderPage() {
    return (
        <div className='wash-landing-background' style={{ marginTop: '-10px' }}>
          <div className='darkBlue-background'>
            <Grid centered columns={4}>

              <Grid.Column>
                <Header className='nowrap' floated='right' style={{ fontSize: '50px', marginRight: '-250px' }}
                        inverted
                        size='huge'>Number of available&nbsp;</Header>
              </Grid.Column>

              <Grid.Column floated='right' style={{ fontSize: '40px', marginRight: '-450px', marginTop: '-19px' }}>
                <div className='slideshow'>
                  <span><Header inverted>washers</Header></span>
                  <span><Header inverted>dryers</Header></span>
                </div>
              </Grid.Column>

              <Grid.Column>
                <Header inverted size='huge' floated='right'
                        style={{ fontSize: '50px', marginRight: '-50px' }}>:</Header>
              </Grid.Column>

              <Grid.Column floated='right' style={{ fontSize: '50px', marginTop: '-25px' }}>
                <div className='slideshow'>
                  <span><Header inverted>
                    {this.props.machines.filter(m => (m.machineType === 'washer') && (m.enabled === 'enabled') && (m.timeRemaining === 0)).length}
                  </Header></span>
                  <span><Header inverted>
                    {this.props.machines.filter(m => (m.machineType === 'dryer') && (m.enabled === 'enabled') && (m.timeRemaining === 0)).length}
                  </Header></span>
                </div>
              </Grid.Column>

            </Grid>
          </div>

          <div>
          <div style={{ marginBottom: '-2vh' }}>
            <Image src='images/washndashlogo.png' size='huge' centered
                   style={{ position: 'relative', left: '100px' }}/>

            <div id="machineLoader" style={{ position: 'relative', top: '-19vh', left: '30vh' }}>
              <div className="knob"></div>
              <div className="knob" style={{ marginLeft: '-45px' }}></div>
              <div className="rectangle"></div>
              <br/><br/>
              <hr/>
              <div className="loader"></div>
            </div>
          </div>
          </div>
          <div>
            <Grid centered stackable container columns={3}>
              <Grid.Column textAlign='center'>
                <Icon name='users' inverted size='huge'/>
                <Header as='h1' inverted>UH Community</Header>
                <Header as='h3' inverted>This application enables students from the University of Hawaii to register.
                  &nbsp;Students can view as well as update the status of laundry machines across campus.</Header>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Icon inverted name='hourglass half' size='huge'/>
                <Header as='h1' inverted>Save Time</Header>
                <Header as='h3' inverted>Keep track of the time remaining on any running washing machine/dryer or
                  locate the closest available laundry room.</Header>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Icon inverted name='comment' size='huge'/>
                <Header as='h1' inverted>Report issues</Header>
                {/* eslint-disable-next-line */}
                <Header as='h3' inverted>Leave a short description detailing the problems with a certain
                  machine. &nbsp; Broken and unavailable machines will be displayed as disabled. </Header>
              </Grid.Column>
            </Grid>
          </div>

        </div>
    );
  }
}

/** Require machines documents in the props. */
Landing.propTypes = {
  machines: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Machines');
  return {
    machines: Machines.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(Landing);
