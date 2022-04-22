import { combineReducers } from 'redux'
import cityReducer from './city-reducer'
import weatherReducer from './weather-reducer'


// Use the initialState as a default value
export default function rootReducer(state = {}, action: any) {
    return combineReducers({ city: cityReducer, weather: weatherReducer })
}

