/**
 * External dependencies
 */
import Gridicon from 'gridicons';
import { localize } from 'i18n-calypso';
import { partial } from 'lodash';
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */
import { NESTED_SIDEBAR_REVISIONS } from 'post-editor/editor-sidebar/util';

function EditorRevisions( { revisions = [], translate, toggleNestedSidebar } ) {
	if ( ! revisions || ! revisions.length ) {
		return null;
	}

	return (
		<button
			className="editor-revisions"
			title={ translate( 'Open list of revisions' ) }
			onClick={ partial( toggleNestedSidebar, NESTED_SIDEBAR_REVISIONS ) }
		>
			<Gridicon icon="history" size={ 18 } />
			{ translate(
				'%(revisions)d revision',
				'%(revisions)d revisions', {
					count: revisions.length,
					args: {
						revisions: revisions.length,
					},
				}
			) }
		</button>
	);
}

EditorRevisions.propTypes = {
	revisions: PropTypes.array,
	translate: PropTypes.func,
	toggleNestedSidebar: PropTypes.func,
};

export default localize( EditorRevisions );
