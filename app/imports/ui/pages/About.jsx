import React from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class About extends React.Component {
  render() {
    return (
    <Container>
          <Header as="h2" inverted textAlign="center">
            About Wash-n-Dash
          </Header>
          <Grid textAlign='center' columns={4}>
            <Grid.Column><a style={{ color: 'white' }} href="https://olivia-murray.github.io/">Olivia Murray</a></Grid.Column>
            <Grid.Column><a style={{ color: 'white' }} href="">David Badke</a></Grid.Column>
            <Grid.Column><a style={{ color: 'white' }} href="https://rcammack.github.io/">Riley Cammack</a></Grid.Column>
            <Grid.Column><a style={{ color: 'white' }} href="https://jpham79.github.io/">Justin Pham</a></Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default About;
