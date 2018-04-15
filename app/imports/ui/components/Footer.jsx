import React from 'react';
import { Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', paddingBottom: '15px', color: 'white' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr/>
            Wash-N-Dash | ICS 314 &nbsp;
            <a href='https://github.com/wash-n-dash'><Icon inverted color='black' name='github alternate'/></a>
            <br/>
            University of Hawaii at Manoa | Honolulu, HI 96822 | Contact Us
          </div>
        </footer>
    );
  }
}

export default Footer;
