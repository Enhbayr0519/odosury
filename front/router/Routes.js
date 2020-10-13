import Main from "../components/Main";
import Home from "../components/Home";
import Lesson from "../components/lesson/Lesson";
import List from "../components/lesson/List";
import Login from "../components/Login";
import Bundle from "../components/Bundle";
import NotFound from "../components/NotFound";
import Card from '../components/card';
export default [
    {
        component: Main,
        routes: [
            {
                component: Home,
                path: '/',
                exact: true
            },
            {
                component: Login,
                path: '/login',
                exact: true
            },
            {
                component: Login,
                path: '/verify/:token',
                exact: true
            },
            {
                component: Lesson,
                path: '/lesson/:slug',
                exact: true
            },
            {
                component: List,
                path: '/lessons/:slug',
                exact: true
            },
            {
                component: Bundle,
                path: '/bundle/:slug',
                exact: true
            },
            {
                component: Card,
                path: '/card',
                exact: true
            },
            {
                component: NotFound,
                path: '/not-found'
            },
            {
                component: NotFound,
                path: '*'
            },
        ]
    },
];