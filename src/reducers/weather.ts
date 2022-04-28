const initialState = {
    loading: false,
    data: {},
    error: null,
};

const weatherReducer = (oldState: any = initialState, action: any) => {
    switch (action.type) {
        case 'GET_WEATHER_REQUEST':
            return { ...oldState, loading: true };
        case 'GET_WEATHER_SUCCESS':
            return { ...oldState, data: action.payload };
        case 'GET_WEATHER_ERROR':
            return { ...oldState, error: action.payload };

        default:
            return initialState;
    }
}

export default weatherReducer