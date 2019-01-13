import {createStore,combineReducers} from 'redux';
import fetchReducer from './reducers/fetchPolls';



const reducer = combineReducers({
  polls : fetchReducer
});

  
//    let initialState=[
//     {
//         "_id": "YRveH27",
//         "options": [
//             "a",
//             "b"
//         ],
//         "vote": [
//             0,
//             1
//         ],
//         "voted": [
//             {
//                 "casted": "no"
//             },
//             {
//                 "casted": "Omer Sayem"
//             }
//         ],
//         "username": "Omer Sayem",
//         "userId": "nbDmkEh",
//         "title": "test1",
//         "__v": 0
//     }
//    ]
  
  
  const redux  = { createStore , reducer } ;
  
  
  export default redux;