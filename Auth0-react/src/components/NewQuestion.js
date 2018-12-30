import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import axios from 'axios';



class NewQuestion extends Component {

    constructor(props){
        super(props);

        this.state={
            title:'',
            description:''
        }

    }

    handleTitle = (event) => {
        event.preventDefault();
        this.setState({
            title:event.target.value
        })
    }

    handleDescription = (event) => {
        event.preventDefault();
        this.setState({
            description:event.target.value
        })
    }
    
    async handleSubmit(){

        await axios.post('http://localhost:8081',
        {
            title:this.state.title,
            description:this.state.description
        },
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }
        );

        this.props.history.push('/');
    }


  
  render() {
    return (
      <div>
          <label>Title</label><br/>
          <input type="text" name="title" onChange={this.handleTitle}/><br/>
          <label>Description</label><br/>
          <input type="text" name="description" onChange={this.handleDescription}/><br/>
          <button onClick={()=> {this.handleSubmit()}}>Submit</button>
      </div>
    );
  }
}

export default withRouter(NewQuestion);
