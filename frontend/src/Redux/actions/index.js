import axios from 'axios';
const getApiUrl ='http://localhost:8081/';
const postApiUrl ='http://localhost:8081/';

/*
TODO: split async function and pure actions
 */

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
          dispatch(voteSuccess(data,id))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  
   const voteSuccess =  (data,id) => {
    return {
      type: "VOTE",
      payload: data,
      id:id 
    }
  };


  
  const deletePoll = (id) => {
    return (dispatch) => {
      return axios.delete(`http://localhost:8081/delete/${id}`)
        .then(response => {
          dispatch(deleteSuccess(id))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  
   const deleteSuccess =  (id) => {
    return {
      type: "DELETE_POLL",
      payload: id
    }
  };

  const action ={ createPoll,fetchAllPolls ,vote , deletePoll};

  export default action;