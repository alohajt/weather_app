import { getDefaultMiddleware } from '@reduxjs/toolkit'
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from './enhancers/monitor-reducer'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureStore() {
  const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })
  const middlewares = [loggerMiddleware, thunkMiddleware, customizedMiddleware as any]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose<any>(...enhancers)

  const store = createStore(rootReducer, undefined, composedEnhancers);

  return store
}