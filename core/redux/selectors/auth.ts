import { actions } from '../reducers/auth';
import { RootState } from '../store';
import { UseAuthType } from '@core/@types/authRedux';
import { useAutoDispatcher } from '../root';
import { useSelector } from 'react-redux';

export const useAuth = (): UseAuthType => {
	const state = useSelector((store: RootState) => store.auth);
	const dispatcher = useAutoDispatcher(actions);

	return {
		...state,
		...dispatcher,
	};
};
