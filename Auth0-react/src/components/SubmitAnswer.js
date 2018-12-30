import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';



class SubmitAnswer extends Component {

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
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <div>
          <input type="text" name="answer" onChange={this.handleAnswer} value={this.state.answer}/><br/>
          <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default withRouter(SubmitAnswer);
