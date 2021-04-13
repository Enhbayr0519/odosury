// AUTH

export const register = {
    REQUEST:'FETCH_REGISTER_REQUEST',
    RESPONSE:'FETCH_REGISTER_RESPONSE'
};
export const login = {
    REQUEST:'FETCH_LOGIN_REQUEST',
    RESPONSE:'FETCH_LOGIN_RESPONSE'
};

//AUTH END


//HOME

export const getHome = {
    REQUEST:'FETCH_GETHOME_REQUEST',
    RESPONSE:'FETCH_GETHOME_RESPONSE'
};

//HOME END


//LESSON

export const getList = {
    REQUEST:'FETCH_GET_LIST_REQUEST',
    RESPONSE:'FETCH_GET_LIST_RESPONSE'
};
export const getListEish = {
    REQUEST:'FETCH_GET_LISTEish_REQUEST',
    RESPONSE:'FETCH_GET_LISTEish_RESPONSE'
};
export const getLesson = {
    REQUEST:'FETCH_GET_LESSOINSINGLE_REQUEST',
    RESPONSE:'FETCH_GET_LESSOINSINGLE_RESPONSE'
};
export const addWish = {
    REQUEST:'addWish_REQ',
    RESPONSE:'addWish_RES'
};
export const clearLesson = {
    REQUEST:'clearLesson_REQ'
};
export const getViewArea = {
    REQUEST:'FETCH_GET_LESSOINVIEW_REQUEST',
    RESPONSE:'FETCH_GET_LESSOINVIEW_RESPONSE'
};
export const setProgress = {
    REQUEST:'FETCH_GET_setProgress_REQUEST',
    RESPONSE:'FETCH_GET_setProgress_RESPONSE'
};

//LESSON END


//PROFILE

export const getHistory = {
    REQUEST:'FETCH_GET_HISTORY_REQUEST',
    RESPONSE:'FETCH_GET_HISTORY_RESPONSE'
};
export const getLessonsProf = {
    REQUEST:'FETCH_GET_LESSONS_PROF_REQUEST',
    RESPONSE:'FETCH_GET_LESSONS_PROF_RESPONSE'
};
export const getWishlist = {
    REQUEST:'FETCH_GET_WISHLIST_REQUEST',
    RESPONSE:'FETCH_GET_WISHLIST_RESPONSE'
};

//PROFILE END


//AUDIO

export const getListAudio = {
    REQUEST: 'getListAudio_REQ',
    RESPONSE: 'getListAudio_RES',
};
export const clearAudio = {
    REQUEST: 'clearAudio_REQ',
    RESPONSE: 'clearAudio_RES',
};
export const setProgressAudio = {
    REQUEST: 'setProgressAudio_REQ',
    RESPONSE: 'setProgressAudio_RES',
};
export const getViewAreaAudio = {
    REQUEST: 'getViewAreaAudio_REQ',
    RESPONSE: 'getViewAreaAudio_RES',
};
export const getAudio = {
    REQUEST: 'getAudio_REQ',
    RESPONSE: 'getAudio_RES',
};

//AUDIO END


//PAYMENT


export const closePayment = {
    REQUEST: 'closePayment_REQ',
};
export const openPayment = {
    REQUEST: 'openPayment_REQ',
};
export const setStepPayment = {
    REQUEST: 'setStepPayment_REQ',
};
export const setMethodPayment = {
    REQUEST: 'setMethodPayment_REQ',
};
export const setPayment = {
    REQUEST: 'setPayment_REQ',
    RESPONSE: 'setPayment_RES',
};
export const setPaymentOld = {
    REQUEST: 'setPaymentOld_REQ',
    RESPONSE: 'setPaymentOld_RES',
};
export const checkBankPayment = {
    REQUEST: 'checkBankPayment_REQ',
    RESPONSE: 'checkBankPayment_RES',
};
export const checkQpayPayment = {
    REQUEST: 'checkQpayPayment_REQ',
    RESPONSE: 'checkQpayPayment_RES',
};

//PAYMENT END