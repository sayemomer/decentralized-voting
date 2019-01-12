import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import auth0Client from '../Auth';
import {Link} from 'react-router-dom';
import Menu from '../StyleComponent/Menu';



const appbar={
  backgroundColor:'#80ADD7',
  width:'90%',
  marginLeft:'5%',
  height:'80px'
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const linkStyle={
  textDecoration:'none',
  color:'white'
}

function ButtonAppBar(props) {

  const { classes,signOut } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" style={appbar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Voting
          </Typography>
          <Link to="/" style={linkStyle}>
          <Button color="inherit">Home</Button>
          </Link> 
          {
            !auth0Client.isAuthenticated() &&
            <Button color="inherit" onClick={auth0Client.signIn}>Login</Button>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
                <Link to='/mypolls'style={linkStyle}>
                <Button color="inherit" >My Poll</Button>
                </Link>
                <Link to='/newpoll' style={linkStyle}>
                <Button color="inherit" >New Poll</Button>
                </Link>
                <Menu 
                signOut={signOut}
                name={auth0Client.getProfile().name}
                picture={auth0Client.getProfile().picture}   
                />
            </div>
          }   
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
