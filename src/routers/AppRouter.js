import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/partials";
import { Login, Register } from "../components/user";
import { MyAssignedTicket, MyCreatedTicket, TicketList, TicketForm, TicketView } from "../components/ticket";
import { NotFoundPage } from "../components/common";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => (
    <BrowserRouter >
        <div>
            <Header />
            <Switch>
                {/* <Route path="/" component={Login} exact={true} />
                <Route path="/register" component={Register} /> */}
                <PublicRoute path="/" component={Login} exact={true} />
                <PublicRoute path="/register" component={Register} />
                <PrivateRoute path="/list" component={TicketList} />
                <PrivateRoute path="/myassignedtickets" component={MyAssignedTicket} />
                <PrivateRoute path="/mycreatedtickets" component={MyCreatedTicket} />
                <PrivateRoute path="/ticket/add" component={TicketForm} />
                <PrivateRoute path="/ticket/edit/:id" component={TicketForm} />
                <PrivateRoute path="/ticket/view/:id" component={TicketView} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;