import { SET_INFO } from '../actions';

export default function (state = "", action) {
    switch (action.type) {
        case SET_INFO:
            return action.payload;
    }
    return state;
}