const ticketReducerDefaultState = {
    ticketList: null,
    myCreatedTickets: null,
    myAssignedTickets: null,
    ticketListTotalRecords: null,
    myCreatedTicketsTotalRecords: null,
    myAssignedTicketsTotalRecords: null
};

export default (state = ticketReducerDefaultState, action) => {
    switch (action.type) {
        case 'READALL_TICKET':
            // return action.payload;
            return {
                ...state,
                ticketList: action.payload
            };
        case 'TICKETLIST_TOTALRECORDS':
            return {
                ...state,
                ticketListTotalRecords: action.payload
            }
        case 'READALL_MYCREATEDTICKET':
            // return action.payload;
            return {
                ...state,
                myCreatedTickets: action.payload
            };
        case 'MYCREATEDTICKET_TOTALRECORDS':
            return {
                ...state,
                myCreatedTicketsTotalRecords: action.payload
            }
        case 'READALL_MYASSIGNEDTICKET':
            // return action.payload;
            return {
                ...state,
                myAssignedTickets: action.payload
            };
        case 'MYASSIGNEDTICKET_TOTALRECORDS':
            return {
                ...state,
                myAssignedTicketsTotalRecords: action.payload
            }
        case 'ADD_TICKET':
            // return [
            //     action.payload.ticket,
            //     ...state
            // ];
            return {
                ...state,
                myCreatedTickets: [
                    action.payload.ticket,
                    ...state.myCreatedTickets
                ]
            };
        case 'UPDATE_TICKET':
            // return state.map((ticket) => {
            //     if (ticket._id === action.id) {
            //         return {
            //             ...action.payload.ticket
            //         };
            //     } else {
            //         return ticket;
            //     }
            // });
            return {
                ...state,
                myCreatedTickets: state.myCreatedTickets.map((ticket) => {
                    if (ticket._id === action.id) {
                        return {
                            ...action.payload.ticket
                        };
                    } else {
                        return ticket;
                    }
                })
            };
        case 'UPDATE_TICKET_STATUS':
            return {
                ...state,
                myAssignedTickets: state.myAssignedTickets.map((ticket) => {
                    if (ticket._id === action.id) {
                        return {
                            ...action.payload.ticket
                        };
                    } else {
                        return ticket;
                    }
                })
            };
        case 'DELETE_TICKET':
            return {
                ...state,
                myCreatedTickets: state.myCreatedTickets.filter(({ _id }) => _id !== action.id)
            };
        default:
            return state;
    }
}