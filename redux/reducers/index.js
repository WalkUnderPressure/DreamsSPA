import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './VisibilityFilter'
import { userDreansActionsList } from '../actions/UsersDreans';
import userDreansReducer from './UserDreansReducer';

const initialState = {
  articles: []
};

export default combineReducers({
  todos,
  visibilityFilter,
  userDreansReducer,
})
