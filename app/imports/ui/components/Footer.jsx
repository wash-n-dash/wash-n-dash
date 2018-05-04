import React from 'react';
import { Icon } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', paddingBottom: '15px', color: 'white' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr/>
            Wash-N-Dash | ICS 314 &nbsp;
            <a href='https://github.com/wash-n-dash'><Icon inverted style={{ color: 'white' }} name='github alternate'/></a>
            <br/>
            University of Hawaii at Manoa | Honolulu, HI 96822 |&nbsp;
            <Link style={{ color: 'white' }} to="/contactus" key='contactus'>Contact Us</Link>
          </div>
        </footer>
    );
  }
}

export default Footer;
