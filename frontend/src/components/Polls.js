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
import ProgressBar from '../StyleComponent/ProgressBar';
import Paper from '@material-ui/core/Paper';

const background = {
  width: '90%',
  backgroundColor: '#EBF2EA',
  marginTop:'10px',
  marginLeft:'5%',
  height:'680px'
}

const styles = theme => ({
  
  textStyle:{
    textAlign:'center'
  }

});


const linkStyle={
  textDecoration:'none'
}

const textStyle={
  width:'50%',
  left:'25%'
}

const intro={
  marginLeft:'30%'
}

class Polls extends Component {

    constructor(props){
        super(props);
    
        this.state={
          polls:[],
          loaded:false
        }
       
        
    }

    componentDidMount(){

        axios.get('http://localhost:8081/')
        .then((response)=> this.setState({

           polls: this.state.polls.concat(response.data),
           loaded:true

          }))
        .catch((error)=>console.log(error))
      }

     render(){

        const { classes } = this.props;
        const polls = this.state.polls.map((p)=>(

            <div key={p._id}>
              <Link to={`/poll/${p._id}`} style={linkStyle}>
                <ListItem button divider >
                <ListItemText primary={p.title} className={classes.textStyle} />
                </ListItem>
              </Link>
              <Divider /> 
            </div>

          ));


        return (
            <div  >
            <Paper  elevation={1} style={background}>
            <div style={intro}>
            <h2>Below are polls hosted by fcc-voting.</h2>
            <h3>Select a poll to see the results and vote, or sign-in to make a new poll.</h3>
            </div> 
          <List component="nav" style={textStyle}  >
          {
            this.state.loaded === false &&
            <ProgressBar/> 
          }
          {polls}  
        </List>
        </Paper>

            </div>

          );

     }
  

}


Polls.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Polls);
