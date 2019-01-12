import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import auth0Client from '../Auth';
import Select from '../StyleComponent/ControlledOpenSelect';
import {Doughnut} from 'react-chartjs-2';
import {withRouter} from 'react-router-dom';
import {colors} from '../StyleComponent/color';
import {FacebookShareButton,TwitterShareButton} from 'react-share';
import {FacebookIcon,TwitterIcon} from 'react-share';
import Alert from '../StyleComponent/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
var _ = require('lodash');


const background = {
    width: '90%',
    backgroundColor: '#EBF2EA',
    marginTop:'10px',
    marginLeft:'5%',
    height:'680px',
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }


  const icons={
     width:'100px',
     height:'100px',
     display:'flex',
     flexDirection: 'row',
     justifyContent: 'space-around',
  }

const elementOne = {
    width:'30%'
}

const elementTwo = {
    width:'40%'

}


// const styles = theme => ({
//     button: {
//       margin: theme.spacing.unit,
//     },
//     input: {
//       display: 'none',
//     },
//   });

  const deleteButton= {
      width:'20%',
      marginLeft:'40%'
  }
  


class Poll extends Component {

    constructor(props){
        super(props);

        this.state={
            poll:[],
            alert:false
        }

        this.onVote=this.onVote.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }

    async componentWillMount(){
        this.refreshPoll();
        this.getUser();
         
    }

    refreshPoll = async() =>{
        const { match: { params } } = this.props;
        await axios.get(`http://localhost:8081/poll/${params.id}`)
        .then((response)=> this.setState({ poll: [...response.data] }))
        .catch((error)=>console.log(error))  
    }

    async onVote(vote){

        var options = this.state.poll.map((p)=>{ return [...p.options] });
        var votes = this.state.poll.map((p)=>{ return [...p.vote] });
        var voted = this.state.poll.map((p)=>{ return [...p.voted] });
        var user = auth0Client.getProfile().name;

        const alreadyVoted = _.findIndex(voted[0],{casted : `${user}`});

        if(alreadyVoted >= 1){
            this.setState({alert:true})
        }else{
            let index =options[0].indexOf(vote);

            var voteCast = votes[0];
    
            voteCast[index]=voteCast[index]+1;
    
            console.log(voteCast);
    
            const { match: { params } } = this.props;
        
            await axios.post(`http://localhost:8081/poll/${params.id}`,
            {
               vote:voteCast,
               voted:voted[0].concat({casted : `${user}`})
            },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }
            );
            this.refreshPoll();
        }
    }

    async handleDelete(){

        const { match: { params } } = this.props;
        await axios.delete(`http://localhost:8081/delete/${params.id}`)
        .then((response)=> console.log(response))
        .catch((error)=>console.log(error))
        this.props.history.push('/');
    }

    getUser = () =>{

        if( typeof auth0Client.getProfile() === "undefined" ){
            return ;
        }
         return auth0Client.getProfile().name;
    }

  render() {

    let data = this.state.poll.map((p)=>{

        let data = {
            labels: [...p.options],
            datasets: [{
            label: "My First dataset",
            backgroundColor: colors,
            borderColor: colors,
            data: [...p.vote],
            }]
        }

        return data;
    })
    
    
    let user = this.state.poll.map((p)=>{ return p.username });

    const shareUrl = window.location.href

    console.log(this.getUser());
    
    const poll = this.state.poll.map((p)=>(
        
            <Paper  elevation={1} style={background} key={p.id}>
                
                <div style={elementOne}>
                <h1>{p.title}</h1>
                <Select
                options={p.options}
                onVote={this.onVote}
                />

                < div style={icons}>
                <FacebookShareButton
                url={shareUrl}
      
                >
                <FacebookIcon
                  size={52}
                  round={true}
                  />
                </FacebookShareButton>
                <TwitterShareButton
                url={shareUrl}
            
                >
                    <TwitterIcon
                    size={52}
                    round={true}
                    />
                </TwitterShareButton>
                </div>
 

                </div>
                
            <div style={elementTwo}>
                < Doughnut
                data={data[0]}
                width={200}
                height={150}
                />
                 
                {
            this.getUser() === user[0] &&
                
            <Button variant="contained" color="secondary" style={deleteButton} onClick={this.handleDelete} >
                Delete
                <DeleteIcon  />
            </Button>

                }
            </div>
            
            </Paper>
      ));

    return (
        <div >
            {
                this.state.alert &&
                    <Alert
                    open={this.state.alert}
                    />  
            }
            {poll}
        </div>
    );
  }
}

export default withRouter(Poll);
