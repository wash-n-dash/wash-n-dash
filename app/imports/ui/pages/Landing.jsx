/* eslint-disable max-len */
import React from 'react';
import { Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className={'wash-landing-background'}>
          <Image src='images/WashNDashLogo.svg' centered/>
        </div>
    );
  }
}

export default Landing;
