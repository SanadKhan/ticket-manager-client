const userReducerDefaultState = {
    isAuthUser: false,
    user: null,
    isLoading: false,
    error: null,
    success: null,
    allUsers: null
};

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_LOADER':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'API_SUCCESS':
            return {
                ...state,
                success: action.payload
            };
        case 'API_ERROR':
            return {
                ...state,
                error: action.payload
            };
       
        case 'READALL_USER':
            return {
                ...state,
                allUsers: action.payload
            }
        case 'LOGIN_SUCCESS':
            localStorage.setItem('auth-token', action.payload.token)
            localStorage.setItem("user", action.payload.user.name)
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