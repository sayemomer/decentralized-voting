import React from 'react';
import { connect } from 'react-redux';
import action from '../Redux/actions/index';
import auth0Client from '../auth/Auth';
import Board from '../components/board/board';
import {colors} from '../components/color/color';



function Polls({poll,graphData,onDelete,onVote}) {
    return (
        <Board poll={poll} graphData={graphData} onDelete={onDelete} onVote={onVote} />
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


  function countVote(choice,stateProps){
    // how many options in poll ,exm ["yes","no"]
    // votes on those options ,exm [0,0] 
    //checking the current user already there or not
    // 1st get the index of the vote user given
    // gets the total number of vote ,exm [0,0]
    // increment the number of vote
    /*TODO:
    one user can cote only one time 
    */

    const poll = stateProps.poll[0]; 
    let {options,vote,voted}= poll ; 
    const user = auth0Client.getProfile().name; 
    //const alreadyVoted = _.findIndex(voted[0],{casted : `${user}`}); 
    const index =options.indexOf(choice); 
            let voteCast = vote; 
            voteCast[index]++; 

    let data ={
      vote:voteCast,
      voted:[...voted,{casted : `${user}`}]
   }

     return data;

  }

const mergeProps = (stateProps,dispatchProps,ownProps) =>(
  {

    ...stateProps,
    ...dispatchProps,
    onVote : (vote,header)=>(
      dispatchProps.dispatch( action.vote( countVote(vote,stateProps),header, ownProps.match.params.id ) )
    ),

  }
  
);





const mapDispatchToProps = (dispatch) => (
 {
    onDelete : (id) => (  
        dispatch(action.deletePoll(id))
    ),
    dispatch:dispatch
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
  )(Polls);