import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Component } from 'react';
import axios from 'axios';
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

class Polls extends Component {

    constructor(props){
        super(props);
    
        this.state={
          polls:[]
        }
       
        
    }

    componentDidMount(){

        // axios.get('http://localhost:8081/')
        // .then((response)=> this.setState({ question: this.state.question.concat(response.data)  }))
        // .catch((error)=>console.log(error))
    
        this.setState({ polls : ["Inbox","Trash"] });
        
      }

     render(){

        const { classes } = this.props;

        const polls = this.state.polls.map((p)=>(
            <div>
               <Link to={`polls/${p}`}>
                <ListItem button divider>
                  <ListItemText primary={p} className={classes.textStyle}/>
                </ListItem>
              </Link>
              <Divider />
            </div>
          ));

        return (
            <List component="nav" className={classes.root}>
            <h1>Voting</h1>
            <h3>Below are polls you own.</h3>
            <h3>Select a poll to see the results and vote,<Link to='/newpoll'>or make a new poll!</Link> </h3>
             {polls}
            </List>
          );

     }
  

}

Polls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Polls);
