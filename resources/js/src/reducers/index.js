import InfoReducer from './infoReducer';
import { combineReducers } from 'redux';
import { USER_LOGOUT } from '../actions';

const appReducer = combineReducers({
    info: InfoReducer
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;