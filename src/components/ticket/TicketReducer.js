const ticketReducerDefaultState = [];

export default (state = ticketReducerDefaultState, action) => {
    switch (action.type) {
        case 'READALL_TICKET':
            return action.payload;
            
        // case 'ADD_TICKET':
        //     return [
        //         ...state,
        //         action.ticket
        //     ];
        // case 'REMOVE_TICKET':
        //     return state.filter(({ id }) => id !== action.id );
        // case 'EDIT_TICKET':
        //     return state.map((expense) => {
        //         if(expense.id === action.id) {
        //             return {
        //                 ...expense,
        //                  ...action.updates
        //             };
        //         } else {
        //             return expense;
        //         }
        //     });
        // case 'SET_EXPENSES':
        //     return action.expenses;
        default: 
            return state;
    }
}