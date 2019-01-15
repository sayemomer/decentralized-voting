import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../auth/Auth';
import Appbar from '../components/navigation/Appbar';



class Navbar extends Component {

    signOut =(props) => {

        auth0Client.signOut();
        this.props.history.replace('/');     
    }

  render() {
    return (
      <div>
          <Appbar
           signOut={this.signOut}
          />
      </div>
    );
  }
}

export default withRouter(Navbar);