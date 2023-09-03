const ticketReducerDefaultState = {
    ticketList: null,
    perPage: 5,
    ticketListTotalRecords: null
};

export default (state = ticketReducerDefaultState, action) => {
    switch (action.type) {
        case 'READALL_TICKET':
            return {
                ...state,
                ticketList: action.payload
            };
        case 'TICKETLIST_TOTALRECORDS':
            return {
                ...state,
                ticketListTotalRecords: action.payload
            }
        case 'ADD_TICKET':
            return {
                ...state,
                ticketList: [
                    action.payload.ticket,
                    ...state.ticketList
                ]
            };
        case 'UPDATE_TICKET':
            return {
                ...state,
                ticketList: state.ticketList.map((ticket) => {
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
                ticketList: state.ticketList.filter(({ _id }) => _id !== action.id)
            };
        default:
            return state;
    }
}