import { UserApi } from ".";

export const setLoading = (status) => ({
    type: 'SET_LOADER',
    payload: status
})

export const apiSuccess = (successMessage) => ({
    type: 'API_SUCCESS',
    payload: successMessage
})

export const apiError = (errorMessage) => ({
    type: 'API_ERROR',
    payload: errorMessage
})

export const userLogin = (data) => ({   
    type: 'LOGIN_SUCCESS',
    payload: data
})

export const startUserLogin = (loginData = {}) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        UserApi.login(loginData)
            .then((res) => {
            dispatch(userLogin(res.data))
            }).catch((err) => {
                dispatch(apiError(err.response.data.msgText
                    ));
            console.log("Error Axios", err)
            })
        dispatch(setLoading(false))
    }
}

export const addUser = (user) => ({
    type: 'ADD_USER',
    payload: user
});

export const startAddUser = (userData = {}) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        UserApi.create(userData)
            .then((res) => {
                dispatch(userLogin(res.data))
            }).catch((err) => {
                dispatch(apiError(err.response.data.msgText
                    ));
            console.log("Error Axios", err)
        })
        dispatch(setLoading(false));
    }
};


export const userLogout = () => ({   
    type: 'LOGOUT_SUCCESS'
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