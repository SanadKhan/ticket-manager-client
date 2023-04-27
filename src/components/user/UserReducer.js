const userReducerDefaultState = [];

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOADING':
            return [
                ...state,
                action.payload
            ];
        case 'API_SUCCESS':
            localStorage.setItem('auth-token', action.payload.token)
            localStorage.setItem("user", action.payload.user.name)
            return [
                ...state,
                action.payload.user
            ];
        // case 'API_ERROR':
        //     return {
        //         ...state,
        //         error: action.payload
        //     };
        case 'LOGOUT':
            localStorage.removeItem('user')
            localStorage.removeItem('auth-token')
            return [
                ...state,
                {}
            ];
        
        case 'ADD_USER':
            return [
                ...state,
                action.payload
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