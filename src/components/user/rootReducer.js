const rootReducerDefaultState = {
    isAuthUser: !!(localStorage.getItem('auth-token')),
    user: JSON.parse(localStorage.getItem('user')) || null,
    // user: localStorage.getItem('user') || null
    perPage: 5
};

export default (state = rootReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('auth-token', action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            // localStorage.setItem("user", action.payload.user)
            return {
                ...state,
                user: action.payload.user,
                isAuthUser: true
            };
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('auth-token')
            localStorage.removeItem('user')
            return {
                ...state,
                user: {},
                isAuthUser: false
            };
        default: 
            return state;
    }
}