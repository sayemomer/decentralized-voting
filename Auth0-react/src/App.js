import React, { Component } from 'react';
import './App.css';
import {Route,withRouter} from 'react-router-dom';
import Polls from './components/Polls';
import poll from './components/Poll';
import Navbar from './components/Navbar';
import CallBack from './components/Callback';
import MyPolls from './components/Mypolls';
import NewPoll from './components/NewPoll';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import auth0Client from './Auth';



class App extends Component {

  constructor(props){
    super(props);

    this.state={
      checkingSession:true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback'){
      this.setState({checkingSession:false});
      return;
    } 
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Route exact path='/' component={Polls}/>
        <Route exact path='/poll/:id' component={poll}/>
        <Route exact path='/callback' component={CallBack}/>
        <SecuredRoute path='/mypolls' component={MyPolls} checkingSession={this.state.checkingSession}/>
        <SecuredRoute path='/newpoll' component={NewPoll} checkingSession={this.state.checkingSession}/>
      </div>
    );
  }
}

export default withRouter(App);
