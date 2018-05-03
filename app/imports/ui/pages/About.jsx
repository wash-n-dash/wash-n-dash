import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class About extends React.Component {
  render() {
    return (
        <Container>
          <br/>
          <div className='white-background'>
            <Header as='h1'>
              What is Wash-n-Dash?
            </Header>
            <p style={{ fontSize: '15px' }}>
              &nbsp; &nbsp; &nbsp; &nbsp; Wash-n-Dash is a web application that provides a reliable way for
              students at the University of Hawaii to track and update the status of washers/dryers in laundry
              rooms across campus. This way, students won’t have to walk down and be disappointed when no
              washing machines are available. This version of the app requires a student to manually indicate
              the status of the machines when they are in the room. In the future, the application may utilize a
              raspberry pi appliance monitor to automatically update the status of each machine’s availability
              on the website. This status will be displayed in the app with a timestamp and a countdown timer
              until a machine is available for use. An admin user has the additional capability to override the
              displayed status of the machines including showing if a washing machine/dryer is broken. This
              application is uniquely designed to reflect the status of UH Manoa laundry rooms.
            </p>
          </div>
          <br/>
          <div className='white-background'>
            <Header as='h1'>
              How to use this application
            </Header>
            <List style={{ fontSize: '18px' }}>
              <List.Item>Landing Page
                <List.List>
                  <List.Item>
                    <p style={{ fontSize: '15px' }}>
                      On the home page you can view the total number of available washers and dryers.
                    </p>
                  </List.Item>
                </List.List>
              </List.Item>
              <List.Item>Log in/Sign up
                <List.List>
                  <List.Item>
                    <p style={{ fontSize: '15px' }}>
                      Since Wash-n-Dash is a multi-user application, you can log in or sign up for an account by
                      navigating to the dropdown in the upper right hand corner.
                    </p>
                  </List.Item>
                </List.List>
              </List.Item>
              <List.Item>Check Available Machines
                <List.List>
                  <List.Item>
                    <p style={{ fontSize: '15px' }}>
                      Once you've logged in, the “Check Available Machines” page is now accessible
                      through the menu bar. On that page you can filter and view the machines by location or
                      machine type and view each machine’s time remaining until available as well. In addition,
                      you can report an issue with an individual machine or view past reported issues from other
                      users.
                    </p>
                  </List.Item>
                </List.List>
              </List.Item>
              <List.Item>Admin Users
                <List.List>
                  <List.Item>
                    <p style={{ fontSize: '15px' }}>
                      If you log in as an admin user, two additional pages are available to you as seen in the
                      navigation bar. As an admin user, you can view a table of all of the machines and their
                      corresponding information with the options to disable/enable a machine or add a new
                      machine. Another admin page called "Reports" allows you to manage the reported issues from
                      all users.
                    </p>
                  </List.Item>
                </List.List>
              </List.Item>
            </List>
            <Header>
              For more information specifically on the UH laundry rooms please visit &nbsp;
              <a href='https://manoa.hawaii.edu/housing/guide/laundry'>Student Housing Services</a>
            </Header>
          </div>
          <br/>
        </Container>
    );
  }
}

export default About;
