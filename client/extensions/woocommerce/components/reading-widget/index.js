/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

const ReadingWidget = ( { className, text, title } ) => {
	return (
		<div className={ className } >
			<h2>{ title }</h2>
			<p>{ text }</p>
			<p>{ 'Three articles go here' }</p>
		</div>
	);
};

ReadingWidget.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
};

export default ReadingWidget;
