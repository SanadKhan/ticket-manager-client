import React from "react";
import { createRoot } from "react-dom/client";
import "normalize.css/normalize.css";
import './styles/styles.scss';
import AppRouter from "./routers/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

const jsx = (
    <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);

const root = createRoot(document.getElementById('app'))
root.render(jsx)

// reduxcode
// import React from "react";
// import { createRoot } from "react-dom/client";
// import "normalize.css/normalize.css";
// import './styles/styles.scss';
// import AppRouter from "./routers/AppRouter";
// import { Provider } from "react-redux";
// import configureStore from "./store/configureStore";

// export const store = configureStore();

// const jsx = (
//     <Provider store={store}>
//         <AppRouter />
//     </Provider>
// );

// const root = createRoot(document.getElementById('app'))
// root.render(jsx)
