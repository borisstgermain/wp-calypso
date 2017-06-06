/**
 * Internal dependencies
 */
import config from 'config';
import { login } from './controller';
import { makeLayout, redirectLoggedIn, setUpLocale } from 'controller';

export default router => {
	if ( config.isEnabled( 'wp-login' ) ) {
		router(
			'/log-in/:twoFactorAuthType(backup|code|push|sms)?/:lang?',
			setUpLocale,
			redirectLoggedIn,
			login,
			makeLayout,
		);
	}
};
