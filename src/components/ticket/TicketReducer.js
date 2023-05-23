const ticketReducerDefaultState = [];

export default (state = ticketReducerDefaultState, action) => {
    switch (action.type) {
        case 'READALL_TICKET':
            return action.payload;
            
        case 'ADD_TICKET':
            return [
                ...state,
                action.payload.ticket
            ];
        case 'DELETE_TICKET':
            return state.filter(({ _id }) => _id !== action.id );
        case 'UPDATE_TICKET':
            return state.map((ticket) => {
                if(ticket._id === action.id) {
                    return {
                        ...ticket,
                         ...action.payload.ticket
                    };
                } else {
                    return ticket;
                }
            });
        // case 'SET_EXPENSES':
        //     return action.expenses;
        default: 
            return state;
    }
}