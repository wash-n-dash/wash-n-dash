/* eslint-disable max-len */
import React from 'react';
import { Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='wash-landing-background' style={{ height: '600px' }}>
          <Image src='images/washndashlogo.png' size='huge' centered
                 style={{ position: 'relative', top: '80px', left: '100px' }}/>
          <div id="box" style={{ position: 'relative', top: '-70px', left: '220px' }}>
            <div id="knob"></div>
            <div id="knob" style={{ marginLeft: '-45px' }}></div>
            <div id="rectangle"></div>
            <br/><br/>
            <hr />
            <div id="loader"></div>
          </div>
        </div>
    );
  }
}

export default Landing;
