import { combineReducers } from 'redux';
import main from "./main";
import lesson from "./lesson";
import lessonLevel from "./lessonLevel";
import teacher from "./teacher";
import category from "./category";
export default combineReducers({
    main: main,
    lesson: lesson,
    lessonLevel: lessonLevel,
    teacher: teacher,
    category: category,
});