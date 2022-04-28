import { AnyAction, CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  loading: boolean,
  data: any,
  error: Error | null,
}

const initialState: WeatherState = {
  loading: false,
  data: {},
  error: null,  
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeatherRequest: state => { state.loading = true; },
    getWeatherSuccess: (state, action) => { 
      state.data = action.payload;
      state.loading = false;
    },
    getWeatherError: (state, action) => { 
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getWeatherRequest, getWeatherSuccess, getWeatherError } = weatherSlice.actions;

export default weatherSlice.reducer;
