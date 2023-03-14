const ticketReducerDefaultState = [];

export default (state = ticketReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_TICKET':
            return [
                ...state,
                action.ticket
            ];
        // case 'REMOVE_EXPENSE':
        //     return state.filter(({ id }) => id !== action.id );
        // case 'EDIT_EXPENSE':
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