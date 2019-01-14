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
        
            return{
                isFectching : true,
                polls: [...state.polls,action.payload]
            }
        default:
        return state;
    }
}

export  default fetchReducer;