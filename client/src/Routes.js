
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE,
    QUESTION_ROUTE,
    USER_ROUTE,
    PENDING_ROUTE,
    EDIT_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Question from "./pages/Question";
import Pending from "./pages/Pending";
import Edit from "./pages/Edit";

// export const authRoutes = [
//     {
//         // path: ADMIN_ROUTE,
//         // Component: Admin
//     },
//
// ]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: USER_ROUTE + '/:id',
        Component: Profile
    },
    {
        path: QUESTION_ROUTE + '/:id',
        Component: Question
    },
    {
        path: PENDING_ROUTE,
        Component: Pending
    },
    {
        path: EDIT_ROUTE,
        Component: Edit
    },
]