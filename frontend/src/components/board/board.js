import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Doughnut} from 'react-chartjs-2';
import {withRouter} from 'react-router-dom';
import Select from './ControlledOpenSelect';
import {FacebookShareButton,TwitterShareButton} from 'react-share';
import {FacebookIcon,TwitterIcon} from 'react-share';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';


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


  const deleteButton= {
      width:'20%',
      marginLeft:'40%'
  }
  


class Board extends Component {

    handleDelete = (id) =>{
        this.props.onDelete(id);
        this.props.history.push('/');
    }



  render() {
      
    const shareUrl = window.location.href;
    const {poll,graphData,onVote} = this.props;

    const allPoll = poll.map((p)=>(
        
            <Paper  elevation={1} style={background} key={p._id}>
                
                <div style={elementOne}>

                <h1>{p.title}</h1>
                
                <Select
                options={p.options}
                onVote={onVote}
                />

                <div style={icons}>
                <FacebookShareButton url={shareUrl} >
                    <FacebookIcon size={52} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} >
                    <TwitterIcon size={52} round={true} />
                </TwitterShareButton>
                </div>
 

                </div>
                
            <div style={elementTwo}>
                < Doughnut
                data={graphData}
                width={200}
                height={150}
                />
                
            <Button variant="contained" color="secondary" style={deleteButton} onClick={()=>this.handleDelete(p._id)} >
            Delete
            <DeleteIcon  />
            </Button>

            </div>
            
            </Paper>
      ));

    return (
        <div >
            {allPoll}
        </div>
    );
  }
}

export default withRouter(Board);