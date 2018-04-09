import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              University of Hawaii at Manoa<br />
              Created by: David Badke, Riley Cammack, Olivia Murray, Justin Pham
          </div>
        </footer>
    );
  }
}

export default Footer;
