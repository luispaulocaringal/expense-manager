export const SET_EXPENSES = 'SET_EXPENSES';
export const SET_EXPENSE_CATEGORIES = 'SET_EXPENSE_CATEGORIES';
export const USER_LOGOUT = 'USER_LOGOUT ';
export const SET_USERS = 'SET_USERS';
export const SET_ROLES = 'SET_ROLES';
export const SET_INFO = 'SET_INFO';

export function setExpenses(request) {
    return {
        type: SET_EXPENSES,
        payload: request
    };
}

export function setExpenseCategories(request) {
    return {
        type: SET_EXPENSE_CATEGORIES,
        payload: request
    };
}

export function setUsers(request) {
    return {
        type: SET_USERS,
        payload: request
    };
}

export function setRoles(request) {
    return {
        type: SET_ROLES,
        payload: request
    };
}

export function setInfo(request) {
    return {
        type: SET_INFO,
        payload: request
    };
}

export function logout() {
    return {
        type: USER_LOGOUT,
        payload: {}
    };
}