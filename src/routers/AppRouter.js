import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/partials";
import { Login, Register } from "../components/user";
import { MyAssignedTicket, MyCreatedTicket, TicketList, TicketForm } from "../components/ticket";
import { NotFoundPage } from "../components/common";
import history from "../history";

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Login} exact={true}/>
                <Route path="/register" component={Register} />
                <Route path="/list" component={TicketList} />
                <Route path="/myassignedtickets" component={MyAssignedTicket} />
                <Route path="/mycreatedtickets" component={MyCreatedTicket} />
                <Route path="/ticket/add" component={TicketForm} />
                <Route path="/ticket/edit/:id" component={TicketForm} />
                <Route path="/ticket/view/:id" component={TicketList} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;