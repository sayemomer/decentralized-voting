import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../../auth/Auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProgressLine from '../progressBar/ProgressLine'

  const background = {
    width: '90%',
    backgroundColor: '#EBF2EA',
    marginTop:'10px',
    marginLeft:'5%',
    height:'680px'
  }

  const formStyle={
    margin:'8'
  }



class From extends Component {

    constructor(props){
        super(props);

        this.state={
            title:'',
            options:[],
            submitted:false
        }

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
    
     handleSubmit = () => {

      this.setState({ submitted: "Submitting"});

      let options = this.state.options.split(" ");

      var vote=[];
      for( var i=0 ;i<options.length;i++){
          vote[i]=0;
      }

      const data={

            username:auth0Client.getProfile().name,
            title:this.state.title,
            options,
            vote,
            voted:{casted:"no"}

      }

      const header={

        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }

      }


      this.props.postPoll(data,header);

      this.props.history.push('/');
    }


  
  render() {

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
        {
          this.state.submitted === "Submitting" &&
          <ProgressLine/>
        }
        </form>
        
      </Paper>
      </div>
    );
  }
}

export default withRouter(From);
