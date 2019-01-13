import axios from 'axios';
const apiUrl ='http://localhost:8081/';

const fetchPolls = (polls) => {
    return {
      type: 'FETCH_POLLS',
      data : polls
    }
  };
  
 const fetchAllPolls = () => {

    return (dispatch) => {
      return  axios.get(apiUrl)
        .then(response => {
          dispatch(fetchPolls(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };

  };

export default fetchAllPolls;