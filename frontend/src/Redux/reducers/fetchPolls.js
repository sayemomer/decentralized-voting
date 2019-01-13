const fetchReducer = (state = {isFectching : false , polls :[]}, action) => {
    switch (action.type) {
        case 'FETCH_POLLS':

            return{

                isFectching : true,
                polls: action.data
            }
        default:
        return state;
    }
}

export  default fetchReducer;