import axios from 'axios';
const getApiUrl ='http://localhost:8081/';
const postApiUrl ='http://localhost:8081/';

const fetchPolls = (polls) => {
    return {
      type: 'FETCH_POLLS',
      data : polls
    }
  };
  
 const fetchAllPolls = () => {

    return (dispatch) => {
      return  axios.get(getApiUrl)
        .then(response => {
          dispatch(fetchPolls(response.data))
        })
        .catch(error => {
          throw(error);
        }); 
    };

  };

   const createPoll = (data,header) => {
    return (dispatch) => {
      return axios.post(postApiUrl, data ,header)
        .then(response => {
          dispatch(createPollSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  
   const createPollSuccess =  (data) => {
    return {
      type: "ADD_POLL",
      payload: data
    }
  };


  const vote = (data,header,id) => {
    return (dispatch) => {
      return axios.post(`http://localhost:8081/poll/${id}`, data ,header)
        .then(response => {
          dispatch(voteSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  
   const voteSuccess =  (data) => {
    return {
      type: "VOTE",
      payload: data
    }
  };

  const action ={ createPoll,fetchAllPolls ,vote};

  export default action;