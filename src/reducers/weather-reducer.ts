const initialState = {
    loading: false,
    data: {},
    error: null
}
const weatherReducer = (oldState: any = initialState, action: any) => {
    switch (action.type) {
        case 'GET_WEATHER_REQUEST':
            let newState = { loading: true, ...oldState }
            return newState
        // return { loading: true, ...oldState }
        case 'GET_WEATHER_SUCCESS':
            console.log("oldState", oldState)
            console.log("action.payload",action.payload)
            newState = { ...oldState, data: action.payload }
            return newState

        case 'GET_WEATHER_ERROR':
            return oldState

        default:
            break;
    }
}

export default weatherReducer