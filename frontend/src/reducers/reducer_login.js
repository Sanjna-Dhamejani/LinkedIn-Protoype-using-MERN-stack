import _ from "lodash";
import { LOGIN } from "../actions";
import { stat } from "fs";


//Reducer listening to different action types
//initial state is {}
export default function (state = {}, action) {
  // alert("asdjfjkasdf") 
  switch (action.type) {
    //target 
    case LOGIN:
      if (action.payload.status == 1) {
        // var data = { data: action.payload.data };
        // var name = { name: action.payload.data.firstname }
        // state = Object.assign({}, data);
        // let myData={};
        //  let myData = Object.assign({}, action.payload.data);
        //  console.log()
        // return _.mapKeys(action.payload.data, "myData");
        // return state
        return {
          ...state,
          myData: action.payload.data
        };
      } else {
        return state
      }
    default:
      return state;
  }
}
