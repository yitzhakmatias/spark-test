import { createStore, applyMiddleware } from 'redux'

// composeWithDevTools is tools that gonna be connecting our application for debugging the redux into the browser
import { composeWithDevTools } from 'redux-devtools-extension'

// This is the middleware that we gonna use redux-saga
import createSagaMiddleware from 'redux-saga'

// This is the root saga that will contain our sagas, or I should say model? XD
import rootSaga from './sagas'

// This will be contain our reducer for the application
import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

// Run redux-saga
sagaMiddleware.run(rootSaga)

export default store
