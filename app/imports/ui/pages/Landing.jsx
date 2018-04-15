/* eslint-disable max-len */
import React from 'react';
import { Image, Header, Container, Grid, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='wash-landing-background' style={{ height: '1000px' }}>
          <div style={{ marginBottom: '100px' }}>
            <Image src='images/washndashlogo.png' size='huge' centered
                   style={{ position: 'relative', top: '80px', left: '100px' }}/>

            <div id="machineLoader" style={{ position: 'relative', top: '-70px', left: '220px' }}>
              <div className="knob"></div>
              <div className="knob" style={{ marginLeft: '-45px' }}></div>
              <div className="rectangle"></div>
              <br/><br/>
              <hr/>
              <div className="loader"></div>
            </div>
          </div>

          <div className='darkBlue-background'>
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

          <div>
            <Container className='slideshow' centered>
              <span><Header as='h1' inverted>hi</Header></span>
              <span><Header as='h1' inverted>hello</Header></span>
            </Container>
          </div>
        </div>
    );
  }
}

export default Landing;
