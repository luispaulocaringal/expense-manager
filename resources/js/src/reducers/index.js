import InfoReducer from './infoReducer';
import ExpensesReducer from './expensesReducer';
import ExpenseCategoriesReducer from './expenseCategoriesReducer';
import UsersReducer from './usersReducer';
import RolesReducer from './rolesReducer';
import { combineReducers } from 'redux';
import { USER_LOGOUT } from '../actions';

const appReducer = combineReducers({
    info: InfoReducer,
    expenses: ExpensesReducer,
    expenseCategories: ExpenseCategoriesReducer,
    users: UsersReducer,
    roles: RolesReducer,
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;