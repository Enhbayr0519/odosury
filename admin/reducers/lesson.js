import {
    openLessonModal,
    closeLessonModal,
    lessonChangeHandler,
    submitLesson,
    deleteLesson,
    getLesson,
    searchTeacher,
    openLessonModalLevel,
    closeLessonModalLevel,
    lessonChangeHandlerLevel,
    lessonAddLevel,
    uploadLessonImage,
    uploadLessonVideo,
    orderLevels,
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    lessons:[],
    categories:[],
    all:0,
    teacherCount:0,
    submitLessonLoader: false,
    lesson: {},
    searchTeachersResult:[],
    searchTeacherLoader: false,
    level: {},
    openModalLevel: false,
    levelType: '',
    levelIdx: null,
    lessonImage: {},
    imageUploadLoading: false,
    lessonVideo: {},
    videoUploadLoading: false
};

export default(state = initialState, action) => {
    switch (action.type) {
        case uploadLessonVideo.REQUEST:
            return {
                ...state,
                videoUploadLoading: true,
                lessonVideo:{}
            };
        case uploadLessonVideo.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    videoUploadLoading: false,
                    lessonVideo: action.json.result
                };
            } else {
                return {
                    ...state,
                    videoUploadLoading: false
                };
            }
        case uploadLessonImage.REQUEST:
            return {
                ...state,
                imageUploadLoading: true,
                lessonImage:{}
            };
        case uploadLessonImage.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    imageUploadLoading: false,
                    lessonImage: action.json.image
                };
            } else {
                return {
                    ...state,
                    imageUploadLoading: false
                };
            }
        case orderLevels.REQUEST:
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    levels: action.json
                }
            };
        case lessonAddLevel.REQUEST:
            let holdLesson = state.lesson;
            if(state.levelType === 'new'){
                if(holdLesson && holdLesson.levels && holdLesson.levels.length>0){
                    holdLesson.levels.push(state.level);
                } else {
                    holdLesson.levels = [state.level];
                }
            } else if(state.levelType === 'update') {
                holdLesson.levels[state.levelIdx] = state.level;
            }
            // if(state.lesson && state.lesson.levels && run.lesson.levels.length>0){
            //     let holdLevels = run.lesson.levels.map(function (run) {
            //         if(state.levelType === 'new'){
            //             run.levels.push(state.level);
            //         } else if(state.levelType === 'update'){
            //             run.levels[state.levelIdx] = state.level;
            //         }
            //         return run;
            //     });
            // } else {
            //     if(state.levelType === 'new'){
            //         run.levels = [state.level];
            //     }
            // }
            return {
                ...state,
                lesson: holdLesson,
                level:{},
                openModalLevel: false,
            };
        case openLessonModalLevel.REQUEST:
            return {
                ...state,
                openModalLevel: true,
                level:action.json.level,
                levelType: action.json.type,
                levelIdx: action.json.idx,
            };
        case closeLessonModalLevel.REQUEST:
            return {
                ...state,
                openModalLevel: false,
                level: {},
                levelType: '',
                levelIdx: null,
            };
        case deleteLesson.REQUEST:
            if(action.json._id){
                return {
                    ...state,
                    lessons: state.lessons.map( function (run) {
                        if(run._id.toString() === action.json._id.toString()){
                            run.loading = true;
                        }
                        return run;
                    } )
                };
            } else {
                return {
                    ...state
                };
            }
        case deleteLesson.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    lessons: (action.json.lessons || []),
                    all: state.all - 1
                };
            } else {
                if(action.json._id){
                    return {
                        ...state,
                        lessons: state.lessons.map( function (run) {
                            if(run._id.toString() === action.json._id.toString()){
                                run.loading = false;
                            }
                            return run;
                        } ),
                        all: state.all - 1
                    };
                } else {
                    return {
                        ...state
                    };
                }
            }
        case searchTeacher.REQUEST:
            return {
                ...state,
                searchTeacherLoader: true
            };
        case searchTeacher.RESPONSE:
            return {
                ...state,
                searchTeacherLoader: false,
                searchTeachersResult: (action.json.teachers || [])
            };
        case getLesson.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getLesson.RESPONSE:
            let cats = (action.json.categories || []);
            let parents = [];
            let hold = [];
            cats.map(function (run) {
                if(run.parent && run.parent !== '' ){
                    if(parents.length > 0){
                        if(parents.some(ff => ff !== run.parent)){
                            parents.push(run.parent);
                        }
                    } else {
                        parents.push(run.parent);
                    }
                }
            });
            cats.map(function (run) {
                if(parents.some(ff => ff === run._id)){
                    hold.push(run);
                    cats = cats.filter(ss => ss._id !== run._id)
                }
            });
            cats.map(function (run) {
                if(!run.parent ){
                    hold.push(run);
                    cats = cats.filter(ss => ss._id !== run._id)
                }
            });
            cats.map(function (run) {
                hold.map(function (ho) {
                    if(run.parent === ho._id){
                        if(ho.child){
                            ho.child.push(run);
                        } else {
                            ho.child = [run];
                        }
                        cats = cats.filter(ss => ss._id !== run._id)
                    }
                });
            });
            return {
                ...state,
                status: 0,
                lessons: (action.json.lessons || []),
                categories: (hold || []),
                all: (action.json.all || 0),
                teacherCount: (action.json.teacherCount || 0),
            };
        case lessonChangeHandler.REQUEST:
            return {
                ...state,
                lesson:{
                    ...state.lesson,
                    [action.json.name]:action.json.value
                },
            };
        case lessonChangeHandlerLevel.REQUEST:
            return {
                ...state,
                level:{
                    ...state.level,
                    [action.json.name]:action.json.value
                },
            };
        case openLessonModal.REQUEST:
            return {
                ...state,
                openModal: true,
                lesson:action.json,
                lessonImage:action.json.thumbnail,
                lessonVideo:action.json.video,
                searchTeachersResult:[],
            };
        case closeLessonModal.REQUEST:
            return {
                ...state,
                openModal: false,
                lesson:{},
                lessonImage: {},
                lessonVideo: {}
            };
        case submitLesson.REQUEST:
            return {
                ...state,
                submitLessonLoader: true,
            };
        case submitLesson.RESPONSE:
            if(action.json.success){
                if(action.json._id){ // update
                    return {
                        ...state,
                        submitLessonLoader: false,
                        openModal: false,
                        lessons: state.lessons.map(function (run) {
                            if(run._id === action.json._id){
                                run.category= action.json.data.category;
                                run.description= action.json.data.description;
                                run.intro_desc= action.json.data.intro_desc;
                                run.learn_check_list= action.json.data.learn_check_listArray;
                                run.thumbnail= action.json.data.lessonImage;
                                run.video= action.json.data.lessonVideo;
                                run.price= action.json.data.price;
                                run.requirements= action.json.data.requirementsArray;
                                run.sale= action.json.data.sale;
                                run.teacher= action.json.data.selectedMember;
                                run.title= action.json.data.title;
                                run.created= action.json.data.created;
                            }
                            return run;
                        })
                    };
                } else { // new
                    let lesson={
                        _id: action.json.data._id,
                        category: action.json.data.category,
                        description: action.json.data.description,
                        intro_desc: action.json.data.intro_desc,
                        learn_check_list: action.json.data.learn_check_listArray,
                        thumbnail: action.json.data.lessonImage,
                        video: action.json.data.lessonVideo,
                        price: action.json.data.price,
                        requirements: action.json.data.requirementsArray,
                        sale: action.json.data.sale,
                        teacher: action.json.data.selectedMember,
                        title: action.json.data.title,
                        created: action.json.data.created,
                    };
                    return {
                        ...state,
                        submitLessonLoader: false,
                        openModal: false,
                        all: state.all + 1,
                        lessons:[
                            lesson,
                            ...state.lessons,
                        ],
                    };
                }
            } else {
                return {
                    ...state,
                    submitLessonLoader: false
                };
            }
        default:
            return state;
    }
};