import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '460px',
    backgroundColor: theme.palette.background.paper,
    marginTop:'10px',
    left: '30%'
  },
  textStyle:{
    textAlign:'center'
  }

});

function ListDividers(props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root}>
    <h1>Voting</h1>
    <h3>Below are polls hosted by fcc-voting.</h3>
    <h3>Select a poll to see the results and vote, or sign-in to make a new poll.</h3>
      <Link to="Inbox">
        <ListItem button divider>
          <ListItemText primary="Inbox" className={classes.textStyle}/>
        </ListItem>
      </Link>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Drafts" className={classes.textStyle}/>
      </ListItem>
      <ListItem button divider>
        <ListItemText primary="Trash" className={classes.textStyle}/>
      </ListItem>
      <Divider light />
      <ListItem button divider>
        <ListItemText primary="Spam" className={classes.textStyle}/>
      </ListItem>
    </List>
  );
}

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);
