import { SET_USERS } from '../actions';

export default function (state = "", action) {
    switch (action.type) {
        case SET_USERS:
            return action.payload;
    }
    return state;
}