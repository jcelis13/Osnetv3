import Router from "next/router";

import {
    FETCH_HOME_EVENTS,
    FETCH_EVENT_LIKES,
    FETCH_HANDLE_ERROR,
    EVENT_LIKE,
    EVENT_UNLIKE,
    FETCH_BRANCH,
    FETCH_BRANCH_FAILED,
    POST_EVENT_START,
    POST_EVENT_SUCCESS,
    POST_EVENT_FAILED,
    FETCH_EVENT_TO_EDIT,
    DELETE_EVENT_POST

} from './actionTypes';

export const fetchEvents = (homeEvents) => {
    return {
        type: FETCH_HOME_EVENTS,
        homeEvents: homeEvents
    }
    
}

export const fetchEventLikes = (eventLikes) => {
    return {
        type: FETCH_EVENT_LIKES,
        eventLikes: eventLikes
    }
    
}

export const handleError = (error) => {
    return {
        type: FETCH_HANDLE_ERROR,
        error: error
    }
}

export const eventLike = () => {
    return {
        type: EVENT_LIKE
    }
}

export const fetchInitBranches = (initBranches, eventList) => {
    return {
        type: FETCH_BRANCH,
        initBranches: initBranches,
        eventList: eventList
    }
}

export const fetchEventToEdit = (eventToEdit) => {
    return {
        type: FETCH_EVENT_TO_EDIT,
        eventToEdit: eventToEdit
    }
}

export const postEventStart = () => {
    return {
        type: POST_EVENT_START
    }
}
export const postEventSuccess = () => {
    return {
        type: POST_EVENT_SUCCESS
    }
}
export const postEventFailed = () => {
    return {
        type: POST_EVENT_FAILED
    }
}

export const deleteEventPost = () => {
    return {
        type: DELETE_EVENT_POST
    }
}

export const postEvent = (eventData) => {
    return async dispatch => {
        dispatch(postEventStart());
        const response = await fetch('/api/home/post/event', {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                eventData
            })
        })
        if(response.ok){
            const res = await response.json();
            console.log('success',res)
            dispatch(postEventSuccess())
            Router.push("/personal");
            
        }else {
            dispatch(postEventFailed(response.error))
        }
    }
}

export const getInitHome = () => {
    return async dispatch => {
        const response  = await fetch('/api/home', {
            method: 'GET',
            credentials: 'same-origin'
        })
        if(response.ok){
            const res = await response.json();
            dispatch(fetchInitBranches(res.initBranches, res.eventList));
        } else {
            console.log(response.error)
            dispatch(handleError(response.error))
        }
        
    };
};

export const getEventToEdit = (calendar_id) => {
    return async dispatch => {
        const response = await fetch('/api/home/event/location', {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                calendar_id
            })
        })
        if(response.ok){
            const res = await response.json();
            dispatch(fetchEventToEdit(res.eventToEdit))
        }else {
            dispatch(handleError(response.error))
        }
    };
};

export const deletePostEvent = (calendar_id) => {
    return async dispatch => {
        const response = await fetch('/api/home/delete/event', {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                calendar_id
            })
        })
        if(response.ok){
            const res = await response.json();
            dispatch(deleteEventPost());
        }else {
            dispatch(handleError(response.error))
        }
    };
};


/* Newsfeed   */

export const getHomeEvents = () => {
    return async dispatch => {
        const response  = await fetch('/api/home/events', {
            method: 'GET',
            credentials: 'same-origin'
        })
        if(response.ok){
            const res = await response.json();
            dispatch(fetchEvents(res.homeEvents));
        } else {
            console.log(response.error)
            dispatch(handleError(response.error))
        }
        
    };
};

export const getEventLikes = (event_id) => {
    return async dispatch => {
        const response  = await fetch('/api/home/event/likes', {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                event_id
            })
        })
        if(response.ok){
            const res = await response.json();
            dispatch(fetchEventLikes(res.eventLikes));
        } else {
            console.log(response.error)
            dispatch(handleError(response.error))
        }
        
    };
};

export const doEventLike = (event_id, user_id) => {
    return async dispatch => {
        const response  = await fetch('/api/home/event/like', {
            method: 'PUT',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                event_id,
                user_id
            })
        })
        if(response.ok){
            const res = await response.json();
            dispatch(eventLike());
        } else {
            console.log(response.error)
            dispatch(handleError(response.error))
        }
        
    };
};
