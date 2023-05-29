const ticketReducerDefaultState = [];

export default (state = ticketReducerDefaultState, action) => {
    switch (action.type) {
        case 'READALL_TICKET':
            return action.payload;

        case 'ADD_TICKET':
            return [
                action.payload.ticket,
                ...state
            ];
        case 'UPDATE_TICKET':
            return state.map((ticket) => {
                if (ticket._id === action.id) {
                    return {
                        ...action.payload.ticket
                    };
                } else {
                    return ticket;
                }
            });
        case 'DELETE_TICKET':
            return state.filter(({ _id }) => _id !== action.id);
        default:
            return state;
    }
}