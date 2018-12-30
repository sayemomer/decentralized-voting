import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';
import Select from '../StyleComponent/ControlledOpenSelect';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';



const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });


class Poll extends Component {

    constructor(props){
        super(props);

        this.state={
            poll:[]
        }

       // this.handleAnswer=this.handleAnswer.bind(this);
    }

     componentDidMount(){
         this.refreshQuestion();
         
    }

    refreshQuestion(){
         const { match: { params } } = this.props;
        // axios.get(`http://localhost:8081/${params.questionId}`)
        // .then((response)=> this.setState({ question: [response.data]  }))
        // .catch((error)=>console.log(error)) 

        this.setState({poll:[params.poll]});
    }

    // async handleAnswer(answer){
    //     const { match: { params } } = this.props;
    //     await axios.post(`http://localhost:8081/answer/${params.questionId}`,
    //     {
    //        answer 
    //     },
    //     {
    //         headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    //     }
    //     );

    //     this.refreshQuestion();

       
    // }

    

  render() {
    
    // const questions = this.state.question.map((q)=>(
    //     <div>
    //       <p>{q.id}</p>
    //       <p><b>Title: </b>{q.title}</p>
    //       <p><b>Description: </b>{q.description}</p>
    //       {
    //           q.answer.map((ans)=>(
    //              <p><b>Answer: </b>{ans.answer}</p>
    //           ))
    //       }
    //     </div>
    //   ))
    const { classes } = this.props;

    let data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
        label: "My First dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
        }]
    }
    return (
        <div >
        <h1>{this.state.poll}</h1>
        <Select/>
        <Button variant="contained" >
        Submit 
        </Button>
        <Button variant="contained" >
        Share on Twitter 
        </Button>
        < Doughnut data={data} />

        </div>
    );
  }
}

export default Poll;
