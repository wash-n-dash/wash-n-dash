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

        </Container>
    );
  }
}

export default About;
