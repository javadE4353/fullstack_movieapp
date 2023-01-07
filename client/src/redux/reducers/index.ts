import {combineReducers} from "redux";
import accessTokenReducer from "./accessTokenReducer/accessTokenReducer";
import commentReducer from "./commentsReducer/commentsReducer";
import loginReducer from "./loginReducer/loginReducer";
import movieReducer from "./movieReducer/movieReducer";
import mylistReducer from "./mylistReducer/mylistReducer";
import paymentReducer from "./paymentReducer/paymentReducer";
import ratingsReducer from "./ratingReducer/ratingReducer";
import sidebarToggle from "./sidebarReducer/sidebarReducer";
import categoryReducer from "./categorys/categoryReducer";
import usersReducer from "./userReducer/userReducer";
const reducer=combineReducers({
    auth:loginReducer,
    accesstoken:accessTokenReducer,
    movies:movieReducer,
    categorys:categoryReducer,
    sidebar:sidebarToggle,
    mylist:mylistReducer,
    comment:commentReducer,
    ratings:ratingsReducer,
    users:usersReducer,
    subscri:paymentReducer,
})


export default reducer

// export type State=ReturnType<typeOf reducer>