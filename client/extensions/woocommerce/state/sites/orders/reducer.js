/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import { LOADING } from 'woocommerce/state/constants';
import {
	WOOCOMMERCE_API_FETCH_ORDERS,
	WOOCOMMERCE_API_FETCH_ORDERS_FAILURE,
	WOOCOMMERCE_API_FETCH_ORDERS_SUCCESS,
} from 'woocommerce/state/action-types';

// TODO: Handle error
export default createReducer( {}, {
	[ WOOCOMMERCE_API_FETCH_ORDERS ]: () => LOADING,
	[ WOOCOMMERCE_API_FETCH_ORDERS_FAILURE ]: () => false,
	[ WOOCOMMERCE_API_FETCH_ORDERS_SUCCESS ]: ( state, { data } ) => data,
} );
