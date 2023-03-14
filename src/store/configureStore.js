import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import UserReducer from "../components/user/UserReducer";
import TicketReducer from "../components/ticket/TicketReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            user: UserReducer,
            ticket: TicketReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
}
