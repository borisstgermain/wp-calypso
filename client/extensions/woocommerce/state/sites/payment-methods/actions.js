/**
 * Internal dependencies
 */
import getPaymentMethodDetails from '../../../lib/get-payment-method-details';
import { getPaymentMethodEdits } from 'woocommerce/state/ui/payments/methods/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';
import request from '../request';
import { setError } from '../../site/status/wc-api/actions';
import {
	WOOCOMMERCE_API_FETCH_PAYMENT_METHODS,
	WOOCOMMERCE_API_FETCH_PAYMENT_METHODS_SUCCESS,
	WOOCOMMERCE_API_PAYMENT_METHOD_SAVE,
	WOOCOMMERCE_API_PAYMENT_METHOD_SAVE_SUCCESS
} from 'woocommerce/state/action-types';
import {
	arePaymentMethodsLoaded,
	arePaymentMethodsLoading,
} from './selectors';

export const fetchPaymentMethodsSuccess = ( siteId, data ) => {
	const paymentMethods = data.map( ( method ) => {
		return { ...method, ...getPaymentMethodDetails( method.id ) };
	} );
	return {
		type: WOOCOMMERCE_API_FETCH_PAYMENT_METHODS_SUCCESS,
		siteId,
		data: paymentMethods,
	};
};

export const fetchPaymentMethods = ( siteId ) => ( dispatch, getState ) => {
	const state = getState();
	if ( ! siteId ) {
		siteId = getSelectedSiteId( state );
	}
	if ( arePaymentMethodsLoaded( state, siteId ) || arePaymentMethodsLoading( state, siteId ) ) {
		return;
	}

	const getAction = {
		type: WOOCOMMERCE_API_FETCH_PAYMENT_METHODS,
		siteId,
	};

	dispatch( getAction );

	return request( siteId ).get( 'payment_gateways' )
		.then( ( data ) => {
			dispatch( fetchPaymentMethodsSuccess( siteId, data ) );
		} )
		.catch( err => {
			dispatch( setError( siteId, getAction, err ) );
		} );
};

export const paymentMethodSaveSuccess = ( siteId, data ) => {
	const paymentMethods = data.map( ( method ) => {
		return { ...method, ...getPaymentMethodDetails( method.id ) };
	} );
	return {
		type: WOOCOMMERCE_API_PAYMENT_METHOD_SAVE_SUCCESS,
		payload: {
			siteId,
			data: paymentMethods,
		},
	};
};

export const paymentMethodSave = ( siteId, method ) => ( dispatch, getState ) => {
	const state = getState();
	if ( ! siteId ) {
		siteId = getSelectedSiteId( state );
	}
	const body = { settings: getPaymentMethodEdits( state, siteId ) };

	const getAction = {
		type: WOOCOMMERCE_API_PAYMENT_METHOD_SAVE,
		payload: { siteId },
	};

	dispatch( getAction );

	return request( siteId ).put( `payment_gateways/${ method.id }`, body )
		.then( ( data ) => {
			dispatch( fetchPaymentMethodsSuccess( siteId, data ) );
		} )
		.catch( err => {
			dispatch( setError( siteId, getAction, err ) );
		} );
};
