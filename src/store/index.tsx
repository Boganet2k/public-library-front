import {applyMiddleware, combineReducers, createStore} from "redux";
import reducers from './reducers';
import createSagaMiddleware from "redux-saga";
import {rootWatcher} from "../saga";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers(reducers)

const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;