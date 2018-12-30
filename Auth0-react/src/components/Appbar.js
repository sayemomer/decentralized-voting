import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import auth0Client from '../Auth';
import {Link} from 'react-router-dom';

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

function ButtonAppBar(props) {

  const { classes,signOut } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Voting
          </Typography>
          <Link to="/" >
          <Button color="inherit">Home</Button>
          </Link> 
          {
            !auth0Client.isAuthenticated() &&
            <Button color="inherit" onClick={auth0Client.signIn}>Login</Button>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
                <label>{auth0Client.getProfile().name}</label>
                <Link to='/mypolls'>
                <Button color="inherit" >My Poll</Button>
                </Link>
                <Link to='/newpoll'>
                <Button color="inherit" >New Poll</Button>
                </Link>  
                <Button color="inherit" onClick={signOut}>Logout</Button>
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
