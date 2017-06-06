/**
 * Internal dependencies
 */
import {
	REWIND_STATUS_ERROR,
	REWIND_STATUS_UPDATE,
} from 'state/action-types';
import {
	combineReducers,
	createReducer,
	keyedReducer,
} from 'state/utils';

export const errors = keyedReducer( 'siteId', createReducer( {}, {
	[ REWIND_STATUS_ERROR ]: ( state = null, action ) => ( {
		...action.error
	} ),
} ) );

export const items = keyedReducer( 'siteId', createReducer( {}, {
	[ REWIND_STATUS_UPDATE ]: ( state = null, action ) => ( {
		...action.status
	} ),
} ) );

export default combineReducers( {
	errors,
	items,
} );
