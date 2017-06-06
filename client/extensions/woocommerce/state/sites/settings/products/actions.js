/**
 * Internal dependencies
 */
import request from '../../request';
import { setError } from '../../status/wc-api/actions';
import {
	WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS,
	WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS_SUCCESS,
} from 'woocommerce/state/action-types';
import {
	areSettingsProductsLoaded,
	areSettingsProductsLoading,
} from './selectors';

export const fetchSettingsProducts = ( siteId ) => ( dispatch, getState ) => {
	if (
		areSettingsProductsLoaded( getState(), siteId ) ||
		areSettingsProductsLoading( getState(), siteId )
	) {
		return;
	}

	const getAction = {
		type: WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS,
		siteId,
	};

	dispatch( getAction );

	return request( siteId ).get( 'settings/products' )
		.then( ( data ) => {
			dispatch( {
				type: WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS_SUCCESS,
				siteId,
				data,
			} );
		} )
		.catch( err => {
			dispatch( setError( siteId, getAction, err ) );
		} );
};
