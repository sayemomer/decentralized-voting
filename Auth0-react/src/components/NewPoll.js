import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    }
  });

  const background = {
    backgroundColor:'#ebebe0',
    marginTop:'20px',
    marginLeft:'10%',
    width:'80%',
    height:'450px'
  }

  const formStyle={
    margin:'8'
  }



class NewPoll extends Component {

    constructor(props){
        super(props);

        this.state={
            title:'',
            options:[]
        }

        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleTitle = (event) => {

        event.preventDefault();
        this.setState({
            title:event.target.value
        })
    }

    handleOptions = (event) => {

      event.preventDefault();
      this.setState({
          options:event.target.value
      })
  }
    
    async handleSubmit(){

      let options = this.state.options.split(" ");

      var vote=[];
      for( var i=0 ;i<options.length;i++){
          vote[i]=0;
      }

      await axios.post('http://localhost:8081',
        {
            username:auth0Client.getProfile().name,
            title:this.state.title,
            options,
            vote,
            voted:{casted:"no"}
        },
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }
        );
        this.props.history.push('/');
    }


  
  render() {
    const { classes } = this.props;
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <div>

      <Paper  elevation={1} style={background}>
        <Typography variant="h5" component="h3">
          Make a new poll!
        </Typography>

        <form  noValidate autoComplete="off">
          <TextField
          id="filled-full-width"
          label="Title:"
          style={formStyle}
          fullWidth
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleTitle}
        />

        <TextField
          style={formStyle}
          id="filled-multiline-static"
          label="Options(Sepeated by space):"
          multiline
          rows="4"
          margin="normal"
          variant="filled"
          onChange={this.handleOptions}
        />
        <br/>
        <Button variant="contained" onClick={this.handleSubmit}>
        Make!
        </Button>
        </form>
        
      </Paper>
      </div>
    );
  }
}

export default withRouter(NewPoll);
