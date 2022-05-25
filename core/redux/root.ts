import auth from './reducers/auth';
import game from './reducers/game';
import { combineReducers } from '@reduxjs/toolkit';
import { mapper } from '@core/utils/mapper';
import { useDispatch } from 'react-redux';

export const rootReducer = combineReducers({
	auth,
	game,
});

export const useAutoDispatcher = (actions) => {
	const dispatch = useDispatch();
	return mapper(actions, (action) => (val) => dispatch(action(val)));
};
