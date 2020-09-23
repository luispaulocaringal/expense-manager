import { SET_EXPENSE_CATEGORIES } from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case SET_EXPENSE_CATEGORIES:
            return action.payload;
    }
    return state;
}