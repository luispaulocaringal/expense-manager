import { SET_EXPENSES } from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case SET_EXPENSES:
            return action.payload;
    }
    return state;
}