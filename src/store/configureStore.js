import { createStore, compose } from "redux";
import { rootReducer } from "../components/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        rootReducer,
        composeEnhancers()
    )
    return store;
}

// with redux
// import { createStore, combineReducers, compose, applyMiddleware } from "redux";
// import UserReducer from "../components/user/UserReducer";
// import TicketReducer from "../components/ticket/TicketReducer";
// import thunk from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default () => {
//     const store = createStore(
//         combineReducers({
//             user: UserReducer,
//             tickets: TicketReducer
//         }),
//         composeEnhancers(applyMiddleware(thunk))
//     )
//     return store;
// }
