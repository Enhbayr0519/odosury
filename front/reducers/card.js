import {
    setCardTypes,
    getQpay,
} from "../actionTypes";
const initialState = {
    type: '',
    step: 1,
    qpay: {},
    purchase: []
};

export default(state = initialState, action) => {
    switch (action.type) {
        case setCardTypes.REQUEST:
            return {
                ...state,
                step: action.data.step || state.step,
                type: action.data.type || state.type,
            };
        case getQpay.REQUEST:
            return {
                ...state,
                step: 3,
                type: 'q',
            };
        case getQpay.RESPONSE:
            return {
                ...state,
                qpay: action.json.body || {},
                purchase: [...state.purchase, (action.json.purchase || {})],
            };
        default:
            return state;
    }
};