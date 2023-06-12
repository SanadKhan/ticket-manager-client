import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/partials";
import { Login, Register } from "../components/user";
import { MyAssignedTicket, MyCreatedTicket, TicketList, AddTicket, EditTicket, TicketForm, TicketView } from "../components/ticket";
import { NotFoundPage } from "../components/common";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => (
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
);


export default AppRouter;

// export let socket = null;
// const { pathname } = useLocation();
//    const user = useSelector(state => state.user);
 
//    useEffect(() => {
//      if(user.authToken){
//        if(!socket){
//          socket = io(endpointBaseUrl, {
//            query: {
//              token: user.authToken
//            }
//          });
//        }
 
//        socket.on('connect', () => {
//          socket.emit('register', {id: socket.id});
//        });
//      }else{
//        if(socket){
//          socket.disconnect();
//          socket = null;
//        }
//      }
 
//      socket && socket.on('error', function(err) {
//        console.log('The server sent an error', err);
//      });
//    }, [user.authToken, user.name, user.id, user.email]);