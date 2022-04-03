import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducer"
import logger from 'redux-logger'

const middleware = [thunk]
const enhancers = []
const production = process.env.production || false
if(!production){
    enhancers.push(applyMiddleware(logger))
}

const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware),...enhancers))

export const wrapper = createWrapper(makeStore)