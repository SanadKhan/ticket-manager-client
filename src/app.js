import React from "react";
import { createRoot } from "react-dom/client";
import "normalize.css/normalize.css";
import './styles/styles.scss';
// import 'antd/dist/antd.css';
import AppRouter from "./routers/AppRouter";



const jsx = (
    <div>
        <AppRouter />
    </div>
);

const root = createRoot(document.getElementById('app'))
root.render(jsx);

