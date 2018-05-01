import React from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class ContactUs extends React.Component {
  render() {
    return (
        <Container>
          <Header as="h2" inverted textAlign="center">
            Contact Us
          </Header>
          <br/>
          <Grid textAlign='center' columns={4}>

            <Grid.Row>
              <Grid.Column>
                <a style={{ color: 'white' }} href="https://olivia-murray.github.io/">Olivia
                  Murray</a>
              </Grid.Column>
              <Grid.Column>
                <a style={{ color: 'white' }} href="">David Badke</a>
              </Grid.Column>
              <Grid.Column>
                <a style={{ color: 'white' }} href="https://rcammack.github.io/">Riley Cammack</a>
              </Grid.Column>
              <Grid.Column>
                <a style={{ color: 'white' }} href="https://jpham79.github.io/">Justin Pham</a>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ color: 'white' }}>
              <Grid.Column>
                email: omurray4@hawaii.edu
              </Grid.Column>
              <Grid.Column>
                email: ...@hawaii.edu
              </Grid.Column>
              <Grid.Column>
                email: rcammack@hawaii.edu
              </Grid.Column>
              <Grid.Column>
                email: jpham79@hawaii.edu
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </Container>
    );
  }
}

export default ContactUs;
