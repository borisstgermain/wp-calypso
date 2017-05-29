/**
 * External dependencies
 */
import React from 'react';
import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import ExternalLink from 'components/external-link';
import FormFieldset from 'components/forms/form-fieldset';
import FormToggle from 'components/forms/form-toggle/compact';
import SectionHeader from 'components/section-header';
import Notice from 'components/notice';
import WrapSettingsForm from './wrap-settings-form';

const Miscellaneous = ( {
	fields: {
		cache_compression,
		cache_hello_world,
		cache_mod_rewrite,
		cache_rebuild,
		dont_cache_logged_in,
		make_known_anon,
		no_cache_for_get,
		use_304_headers,
	},
	handleAutosavingToggle,
	isRequesting,
	isSaving,
	notices,
	translate,
} ) => {
	const compressionDisabled = notices && notices.compression_disabled;

	return (
		<div>
			<SectionHeader
				label={ translate( 'Miscellaneous' ) }>
			</SectionHeader>
			<Card>
				<form>
					{ compressionDisabled && compressionDisabled.message &&
					<Notice
						showDismiss={ false }
						status={ compressionDisabled.type ? `is-${ compressionDisabled.type }` : 'is-info' }
						text={ compressionDisabled.message } />
					}
					<FormFieldset>
						{ ! compressionDisabled &&
						<FormToggle
							checked={ !! cache_compression }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'cache_compression' ) }>
							<span>
								{ translate(
									'Compress pages so they’re served more quickly to visitors. {{em}}(Recommended{{/em}})',
									{
										components: { em: <em /> }
									}
								) }
							</span>
						</FormToggle>
						}
						{ ! compressionDisabled &&
						<Notice
							isCompact
							className="wp-super-cache__toggle-notice"
							text={ translate( 'Compression is disabled by default because some hosts have problems ' +
								'with compressed files. Switching it on and off clears the cache.' ) }
							/>
						}

						<FormToggle
							checked={ !! dont_cache_logged_in }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'dont_cache_logged_in' ) }>
							<span>
								{ translate(
									'Don’t cache pages for known users. {{em}}(Recommended){{/em}}',
									{
										components: { em: <em /> }
									}
								) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! cache_rebuild }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'cache_rebuild' ) }>
							<span>
								{ translate(
									'Cache rebuild. Serve a supercache file to anonymous users while a new ' +
									'file is being generated. {{em}}(Recommended){{/em}}',
									{
										components: { em: <em /> }
									}
								) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! use_304_headers }
							disabled={ isRequesting || isSaving || !! cache_mod_rewrite }
							onChange={ handleAutosavingToggle( 'use_304_headers' ) }>
							<span>
								{ translate(
									'304 Not Modified browser caching. Indicate when a page has not been ' +
									'modified since it was last requested. {{em}}(Recommended){{/em}}',
									{
										components: { em: <em /> }
									}
								) }
							</span>
						</FormToggle>

						{ cache_mod_rewrite &&
							<Notice
								isCompact
								className="wp-super-cache__toggle-notice"
								status="is-warning"
								text={ translate( '304 browser caching is only supported when mod_rewrite caching ' +
									'is not used.' ) }
							/>
						}

						{ ! cache_mod_rewrite &&
							<Notice
								isCompact
								className="wp-super-cache__toggle-notice"
								text={ translate( '304 support is disabled by default because some hosts have had problems with the ' +
									'headers used in the past.' ) }
							/>
						}

						<FormToggle
							checked={ !! no_cache_for_get }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'no_cache_for_get' ) }>
							<span>
								{ translate( 'Don’t cache pages with GET parameters. (?x=y at the end of a url)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! make_known_anon }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'make_known_anon' ) }>
							<span>
								{ translate( 'Make known users anonymous so they’re served supercached static files.' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! cache_hello_world }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'cache_hello_world' ) }>
							<span>
								{ translate( 'Proudly tell the world your server is {{fry}}Stephen Fry proof{{/fry}}! ' +
									'(places a message in your blog’s footer)',
									{
										components: {
											fry: (
												<ExternalLink
													icon={ true }
													target="_blank"
													href="https://twitter.com/#!/HibbsLupusTrust/statuses/136429993059291136"
												/>
											),
										}
									}
							) }
							</span>
						</FormToggle>
					</FormFieldset>
				</form>
			</Card>
		</div>
	);
};

const getFormSettings = settings => {
	return pick( settings, [
		'cache_compression',
		'cache_hello_world',
		'cache_mod_rewrite',
		'cache_rebuild',
		'dont_cache_logged_in',
		'make_known_anon',
		'no_cache_for_get',
		'use_304_headers',
	] );
};

export default WrapSettingsForm( getFormSettings )( Miscellaneous );
