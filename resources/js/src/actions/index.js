export const SET_PREFERENCE = 'SET_PREFERENCE';
export const SET_PLACE = 'SET_PLACE';
export const USER_LOGOUT = 'USER_LOGOUT ';
export const SET_PLACE_STATS = 'SET_PLACE_STATS';
export const SET_PREFERENCE_STATS = 'SET_PREFERENCE_STATS';
export const SET_INFO = 'SET_INFO';
export const SET_MARKER = 'SET_MARKER';

export function setPreferences(request) {
    return {
        type: SET_PREFERENCE,
        payload: request
    };
}

export function setPlace(request) {
    return {
        type: SET_PLACE,
        payload: request
    };
}

export function setPlaceStats(request) {
    return {
        type: SET_PLACE_STATS,
        payload: request
    };
}

export function setPreferenceStats(request) {
    return {
        type: SET_PREFERENCE_STATS,
        payload: request
    };
}

export function setInfo(request) {
    return {
        type: SET_INFO,
        payload: request
    };
}

export function setMarker(request) {
    return {
        type: SET_MARKER,
        payload: request
    };
}

export function logout() {
    return {
        type: USER_LOGOUT,
        payload: {}
    };
}