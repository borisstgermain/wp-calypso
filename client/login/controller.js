/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import WPLogin from './wp-login';

export default {
	login( context, next ) {
		const { lang, params } = context;

		context.renderCacheKey = `login:${ lang }`;
		context.primary = <WPLogin twoFactorAuthType={ params.twoFactorAuthType } />;

		next();
	}
};
