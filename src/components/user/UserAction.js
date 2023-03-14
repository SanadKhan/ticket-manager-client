import { UserApi } from ".";

export const addUser = (user) => ({
    type: 'ADD_USER',
    user
});

export const startAddUser = (userData = {}) => {
    return (dispatch) => {
        UserApi.create(userData)
        .then((res) => {
            console.log("From success", res.data);
            dispatch(addUser(res.data.user));
        }).catch((err) => {
            console.log("Error Axios", err)
        })
    }
};