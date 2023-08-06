import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/partials";
import { Login, Register } from "../components/user";
import { MyAssignedTicket, MyCreatedTicket, TicketList, AddTicket, EditTicket, TicketForm, TicketView } from "../components/ticket";
import { NotFoundPage } from "../components/common";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { message } from "antd";

export let socket = null;

const AppRouter = () => {
    const userId = useSelector(state => state.user && state.user._id);
    useEffect(() => {
        if (userId) {
            if (!socket) socket = io(process.env.API_BASE_URL);

            socket.on('connect', () => {
                socket.emit('register', { socketId: socket.id, userId });
            })

            socket.on('message', (msg) => {
                message.info(msg);
            });
        } else {
            if (socket) {
                socket.disconnect();
                socket = null
            }
        }
       
        socket && socket.on('error', function(err) {
            console.log('The server sent an error', err);
        });
    }, [userId]);

    return (
        <BrowserRouter >
            <div>
                <Header />
                <Switch>
                    <PublicRoute path="/" component={Login} exact={true} />
                    <PublicRoute path="/register" component={Register} />
                    <PrivateRoute path="/list" component={TicketList} />
                    <PrivateRoute path="/myassignedtickets" component={MyAssignedTicket} />
                    <PrivateRoute path="/mycreatedtickets" component={MyCreatedTicket} />
                    <PrivateRoute path="/ticket/add" component={AddTicket} />
                    <PrivateRoute path="/ticket/edit/:id" component={EditTicket} />
                    <PrivateRoute path="/ticket/view/:id" component={TicketView} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    )
};

export default AppRouter;