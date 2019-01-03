import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import auth0Client from '../Auth';



class SecuredRoute extends Component {

  
  render() {
    const {component : Component , path , checkingSession } = this.props;
    return (
        <Route path={path} render={() => {
            if(checkingSession) return <h3>validating session...</h3>;
            if(!auth0Client.isAuthenticated()){
                auth0Client.signIn();
                return <div></div>;
            }
            return <Component/>
        }} />
    );
  }
}

export default SecuredRoute;