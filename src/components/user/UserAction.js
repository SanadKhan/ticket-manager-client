import { UserApi } from ".";

export const addUser = (user) => ({
    type: 'ADD_USER',
    payload: user
});

const setLoading = (status) => ({
    type: 'SET_LOADER',
    payload: status
})

const setSuccess = (successMessage) => ({
    type: 'API_SUCCESS',
    payload: successMessage
})
const setError = (errorMessage) => ({
    type: 'API_ERROR',
    payload: errorMessage
})
// const handlers = {
//     loading: false,
//     error: '',
//     success: ''
// };

export const startAddUser = (userData = {}) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        UserApi.create(userData)
            .then((res) => {
            console.log("From success", res.data);
                dispatch(addUser(res.data.user));
                dispatch(userLogin(res.data.user))
            // localStorage.setItem('auth-token', res.data.token)
            // localStorage.setItem('user', res.data.user.name) 
            }).catch((err) => {
            // dispatch(setError(err.response.))
            console.log("Error Axios", err)
        })
        dispatch(setLoading(false));
    }
};

export const userLogin = (data) => ({   
    type: 'LOGIN',
    payload: data
})

export const startUserLogin = (loginData = {}) => {
    return (dispatch) => {
        UserApi.login(loginData)
            .then((res) => {
            dispatch(userLogin(res.data))
        }).catch((err) => {
            console.log("Error Axios", err)
        })
    }
}

export const userLogout = () => ({   
    type: 'LOGOUT'
})

export const startUserLogout = () => {
    return (dispatch) => {
        UserApi.logout()
            .then((res) => {
            dispatch(userLogout())
        }).catch((err) => {
            console.log("Error Axios", err)
        })
    }
}