/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import reducer from 'woocommerce/state/sites/reducer';
import { LOADING } from 'woocommerce/state/constants';
import {
	WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS,
	WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS_SUCCESS,
} from 'woocommerce/state/action-types';

describe( 'reducer', () => {
	it( 'should mark the settings products tree as "loading"', () => {
		const siteId = 123;
		const action = {
			type: WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS,
			siteId,
		};

		const newSiteData = reducer( {}, action );
		expect( newSiteData[ siteId ].settings.products ).to.eql( LOADING );
	} );

	it( 'should store data from the action', () => {
		const siteId = 123;
		const settings = [
			{},
			{},
		];
		const action = {
			type: WOOCOMMERCE_API_FETCH_SETTINGS_PRODUCTS_SUCCESS,
			siteId,
			data: settings,
		};
		const newState = reducer( {}, action );
		expect( newState[ siteId ] ).to.exist;
		expect( newState[ siteId ].settings ).to.exist;
		expect( newState[ siteId ].settings.products ).to.deep.equal( settings );
	} );
} );
