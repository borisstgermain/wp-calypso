/**
 * Internal dependencies
 */
import { areOrdersLoaded, areOrdersLoading } from './selectors';
import createOrderObject from './assembler';
import { getSelectedSiteId } from 'state/ui/selectors';
import request from '../request';
import { setError } from '../status/wc-api/actions';
import {
	WOOCOMMERCE_API_FETCH_ORDERS,
	WOOCOMMERCE_API_FETCH_ORDERS_FAILURE,
	WOOCOMMERCE_API_FETCH_ORDERS_SUCCESS,
} from '../../action-types';

export const fetchOrders = ( siteId ) => ( dispatch, getState ) => {
	const state = getState();
	if ( ! siteId ) {
		siteId = getSelectedSiteId( state );
	}
	if ( areOrdersLoaded( state, siteId ) || areOrdersLoading( state, siteId ) ) {
		return;
	}

	const fetchAction = {
		type: WOOCOMMERCE_API_FETCH_ORDERS,
		siteId,
	};
	dispatch( fetchAction );

	return request( siteId ).get( 'orders' ).then( ( data ) => {
		dispatch( {
			type: WOOCOMMERCE_API_FETCH_ORDERS_SUCCESS,
			data: data.map( createOrderObject ),
			siteId,
		} );
	} ).catch( error => {
		dispatch( setError( siteId, fetchAction, error ) );
		dispatch( {
			type: WOOCOMMERCE_API_FETCH_ORDERS_FAILURE,
			siteId,
			error
		} );
	} );
};
