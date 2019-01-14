import React from 'react';
import { connect } from 'react-redux';
import action from '../Redux/actions/index';
import Board from '../ui/board/board';
import {colors} from '../ui/color';
import auth0Client from '../auth/Auth';


function Polls({poll,graphData,onVote}) {
    return (
        <Board poll={poll} graphData={graphData} onVote={onVote} />
    );
  }

  const mapStateToProps = (state,ownProps) => {

    const {id} = ownProps.match.params;
    const indiPoll = state.polls.polls.filter((poll) => poll._id === id);
    let data = indiPoll.map((p)=>{
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

    return {
      poll : indiPoll,
      isFectching : state.polls.isFectching,
      graphData :data[0]
    };
  };


  function doVote(vote,id){

    return (getState) => {

        let state = getState();
        const poll = state.polls.polls.filter((poll) => poll._id === id);
        var options = poll.map((p)=>{ return [...p.options] });
        var votes =   poll.map((p)=>{ return [...p.vote] });
        var voted =     poll.map((p)=>{ return [...p.voted] });
        var user = auth0Client.getProfile().name;
        //const alreadyVoted = _.findIndex(voted[0],{casted : `${user}`});
        let index =options[0].indexOf(vote);
        var voteCast = votes[0];
        voteCast[index]=voteCast[index]+1;

        let data ={
            vote:voteCast,
            voted:voted[0].concat({casted : `${user}`})
         }

        return data;

    }

   
    

  }


const mapDispatchToProps = (dispatch,ownProps) => (
 {
    onVote : (vote,header) => (  
        dispatch(action.vote( doVote(vote,ownProps.match.params.id ) ,header,  ownProps.match.params.id  ))
    ),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Polls);