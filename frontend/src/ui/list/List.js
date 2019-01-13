import React,{ Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import ProgressBar from '../ProgressBar';
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

class Listed extends Component {


    
     render(){
     const {polls,isFectching} = this.props;

     console.log(polls)

        const allPolls = polls.map((p)=>(

            <div key={p._id}>
              <Link to={`/poll/${p._id}`} style={linkStyle}>
                <ListItem button divider >
                <ListItemText primary={p.title}  />
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
            isFectching === false &&
            <ProgressBar/> 
          }
          {allPolls}  
        </List>
        </Paper>

            </div>

          );

     }
  

}

export default withStyles(styles)(Listed);
