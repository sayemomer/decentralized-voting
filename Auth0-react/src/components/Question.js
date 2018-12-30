import React, { Component } from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';



class App extends Component {

    constructor(props){
        super(props);

        this.state={
            question:[]
        }

        this.handleAnswer=this.handleAnswer.bind(this);
    }

     componentDidMount(){
         this.refreshQuestion();
         
    }

    refreshQuestion(){
        const { match: { params } } = this.props;
        axios.get(`http://localhost:8081/${params.questionId}`)
        .then((response)=> this.setState({ question: [response.data]  }))
        .catch((error)=>console.log(error)) 
    }

    async handleAnswer(answer){
        const { match: { params } } = this.props;
        await axios.post(`http://localhost:8081/answer/${params.questionId}`,
        {
           answer 
        },
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }
        );

        this.refreshQuestion();

       
    }

    

  render() {
    const questions = this.state.question.map((q)=>(
        <div>
          <p>{q.id}</p>
          <p><b>Title: </b>{q.title}</p>
          <p><b>Description: </b>{q.description}</p>
          {
              q.answer.map((ans)=>(
                 <p><b>Answer: </b>{ans.answer}</p>
              ))
          }
        </div>
      ))
    return (
        <div >
        {questions}
        <SubmitAnswer submitAnswer={this.handleAnswer}/>
        </div>
    );
  }
}

export default App;
