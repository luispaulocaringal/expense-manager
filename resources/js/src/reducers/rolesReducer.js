import { SET_ROLES } from '../actions';

export default function (state = "", action) {
    switch (action.type) {
        case SET_ROLES:
            return action.payload;
    }
    return state;
}