/**
 * Internal dependencies
 */
import { combineReducers } from 'state/utils';
import { reducer as rewindStatus } from './rewindStatus/reducer';

export default combineReducers( {
	rewindStatus,
} );
