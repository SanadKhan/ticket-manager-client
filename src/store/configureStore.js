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
