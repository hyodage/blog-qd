import {combineReducers, createStore} from "redux";
import blogList from "./reducer/bloglist";
import artic from './reducer/artic';
const store = createStore(combineReducers({blogList,artic}));
export default store;