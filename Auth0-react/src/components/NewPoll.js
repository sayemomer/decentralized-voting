import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
  });



class NewPoll extends Component {

    constructor(props){
        super(props);

        this.state={
            answer:''
        }

    }

    handleAnswer = (event) => {
        event.preventDefault();
        this.setState({
            answer:event.target.value
        })
    }
    
     handleSubmit=()=>{

        this.props.submitAnswer(this.state.answer);

       this.setState({
           answer:''
       })
    }


  
  render() {
    const { classes } = this.props;
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <div>
          <h1>Make a new poll!</h1>
          <form  noValidate autoComplete="off">
          <TextField
          id="filled-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          margin="normal"
          variant="filled"
        />
        <br/>
        <Button variant="contained" >
        Make!
        </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(NewPoll);
