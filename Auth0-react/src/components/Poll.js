import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';
import Select from '../StyleComponent/ControlledOpenSelect';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';
var _ = require('lodash');



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

        this.onVote=this.onVote.bind(this);
    }

    async componentWillMount(){
        this.refreshPoll();
         
    }

    refreshPoll = async() =>{
        const { match: { params } } = this.props;
        await axios.get(`http://localhost:8081/poll/${params.id}`)
        .then((response)=> this.setState({ poll: [...response.data] }))
        .catch((error)=>console.log(error))  
    }

    async onVote(vote){

        var options = this.state.poll.map((p)=>{ return [...p.options]});
        var votes = this.state.poll.map((p)=>{ return [...p.vote]});
        var voted = this.state.poll.map((p)=>{return p.voted})

        console.log(voted[0]);

        if(voted==="true"){
            window.alert("You already voted!");
        }else{
            let index =options[0].indexOf(vote);

            var voteCast = votes[0];
    
            voteCast[index]=voteCast[index]+1;
    
            console.log(voteCast);
    
            const { match: { params } } = this.props;
            await axios.post(`http://localhost:8081/poll/${params.id}`,
            {
               vote:voteCast,
               voted:true
            },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }
            );
            this.refreshPoll();
        }
    }

    

  render() {

    let data = this.state.poll.map((p)=>{

        let data = {
            labels: [...p.options],
            datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [...p.vote],
            }]
        }

        return data;
    }) 
    
    const poll = this.state.poll.map((p)=>(
        <div>
          <h1>{p.title}</h1>
            <Select
            options={p.options}
            onVote={this.onVote}
            />
            
        <Button variant="contained" >
        Share on Twitter 
        </Button>

        < Doughnut
         data={data[0]}
         width={200}
	     height={50} 
         />

        </div>
      ));

    const { classes } = this.props;

    return (
        <div >
            {poll}
            
        
        </div>
    );
  }
}

export default Poll;
