import Router from "next/router";

import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    SEARCH_EMPLOYEE_REQUEST,
    SEARCH_EMPLOYEE_SUCCESS,
    SEARCH_EMPLOYEE_FAILED
} from './actionTypes';


export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userProfile, searchEmployee) => {
    return {
        type: AUTH_SUCCESS,
        userData: token,
        userProfile: userProfile,
        searchEmployee: searchEmployee
    };
};
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const actLogout = () => {
    return async dispatch => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
        })
        if(response.ok){
            dispatch(logout());
            Router.push('/login');
        }
    }
}

export const updateRequest = () => {
    return {
        type: UPDATE_PASSWORD_REQUEST
    }
}

export const updateSuccess= (success) => {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
        success: success
    }
}

export const updateFailure = (error) => {
    return {
        type: UPDATE_PASSWORD_FAILURE,
        error: error

    }
}

export const searchRequest = () => {
    return {
        type: SEARCH_EMPLOYEE_REQUEST,
       
    }
}
export const searchSuccess = (searchSpecificEmployee ) => {
    return {
        type: SEARCH_EMPLOYEE_SUCCESS,
        searchSpecificEmployee: searchSpecificEmployee,
        
    }
}
export const searchFailed = (error) => {
    return {
        type: SEARCH_EMPLOYEE_FAILED,
        error: error
    }
}



const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';

export const auth = (username, password) => {
    return async dispatch => {
        dispatch(authStart());
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                username,
                password
            })
        })
        if(response.ok){
            const res = await response.json();
            dispatch(authSuccess(res.userData, res.userProfile, res.searchEmployee))
            if(typeof window !== 'undefined'){
                window[WINDOW_USER_SCRIPT_VARIABLE] = res.userData || {} ;
            }
            Router.push("/");
        }else {
            dispatch(authFail(response.error))
        }
    };
};

export const search = (employee_user_id) => {
    console.log('authhh', employee_user_id);
    return async dispatch => {
        dispatch(searchRequest());
        const response = await fetch('/api/auth/search_employee', {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                employee_user_id
            })
        })
        if(response.ok){
            const res = await response.json();
            dispatch(searchSuccess(res.searchSpecificEmployee))
            console.log(res);
            Router.push("/searchemployee");
        }else {
            dispatch(searchFailed(response.error))
        }
    };
};


export const updatePassword = (new_password, user_id) => {
    return async dispatch => {
        dispatch(updateRequest());

        const response = await fetch('/api/auth/update_password', {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                new_password,
                user_id
            })
        })
        if(response.ok){
            const res = await response.json();
            dispatch(updateSuccess(res.success))
            Router.push("/");
        }else {
            dispatch(updateFailure(response.error))
        }
    }
}

