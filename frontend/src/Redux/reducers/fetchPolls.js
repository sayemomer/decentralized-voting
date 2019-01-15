
/*
TODO:More readable reducer
*/

const fetchReducer = (state = {isFectching : false , polls :[]}, action) => {
    switch (action.type) {
        case 'FETCH_POLLS':

            return{

                isFectching : true,
                polls: action.data
            }
        case 'ADD_POLL':

            return{
                isFectching : true,
                polls: [...state.polls,action.payload]
            }
        case 'VOTE':

        //find the index of the id just updated ,
        //update the index value

        const  pollIndex = state.polls.findIndex((poll)=> poll._id === action.id );
        const oldPollData = state.polls[pollIndex];

        const newPollData={
            ...oldPollData,
            vote:action.payload.vote,
            voted:action.payload.voted
        }

        const data={
            isFectching:true,
            polls : [...state.polls.slice(0, pollIndex),newPollData,...state.polls.slice(pollIndex+1,state.length)]
        }
        
            return data ;
            
        case 'DELETE_POLL':
        
            return{
                isFectching : true,
                polls: state.polls.filter( (poll)=> poll._id !== action.payload)
            }
        default:
        return state;
    }
}

export  default fetchReducer;