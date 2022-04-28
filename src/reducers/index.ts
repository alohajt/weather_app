import { combineReducers } from 'redux';
import cityReducer from './city';
import weatherReducer from './weather';


// Use the initialState as a default value
export default combineReducers({ city: cityReducer, weather: weatherReducer });

