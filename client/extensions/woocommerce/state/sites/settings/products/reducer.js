/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import { LOADING } from 'woocommerce/state/constants';
import {
	WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS,
	WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS_SUCCESS,
} from 'woocommerce/state/action-types';

export default createReducer( {}, {
	[ WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS ]: () => {
		return LOADING;
	},

	[ WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS_SUCCESS ]: ( state, { data } ) => {
		return data;
	},
} );
