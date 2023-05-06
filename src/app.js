import React from "react";
import { createRoot } from "react-dom/client";
import "normalize.css/normalize.css";
import './styles/styles.scss';
// import 'antd/dist/antd.css';
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

export const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

const root = createRoot(document.getElementById('app'))
root.render(jsx)
