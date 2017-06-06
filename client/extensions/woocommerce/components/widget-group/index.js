/**
 * External dependencies
 */
import classNames from 'classnames';
import debugFactory from 'debug';
import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */
const debug = debugFactory( 'calypso:allendav' );

class WidgetGroup extends Component {
	static propTypes = {
		children: PropTypes.oneOfType( [
			PropTypes.arrayOf( PropTypes.node ),
			PropTypes.node
		] ),
		className: PropTypes.string,
		maxColumns: PropTypes.string,
		title: PropTypes.string,
	}

	renderRow = ( rowIndex, children ) => {
		return (
			<div className="widget-group__row-container" key={ rowIndex }>
				{ children.map( ( child, index ) => {
					return React.cloneElement( child, {
						className: classNames( child.props.className, 'widget-group__row-item' ),
						key: index,
					} );
				} ) }
			</div>
		);
	}

	renderChildren = () => {
		const { children, firstWidgetFullWidth, maxColumns } = this.props;

		const rows = [];
		let childIndex = 0;
		let rowIndex = 0;

		if ( ! Array.isArray( children ) ) {
			debug( 'in WidgetGroup renderChildren, children is a single element (not an array)' );
			rows.push( this.renderRow( rowIndex, children ) );
		} else {
			debug( 'in WidgetGroup renderChildren, children is an array' );
			if ( firstWidgetFullWidth ) {
				rows.push( this.renderRow( rowIndex, children ) );
				childIndex = 1;
			}

			do {
				rowIndex++;
				rows.push( this.renderRow( rowIndex, children.slice( childIndex, maxColumns ) ) );
				childIndex += maxColumns;
			} while ( childIndex < children.length );
		}

		return (
			<div className="widget-group__rows">
				{ rows }
			</div>
		);
	}

	render = () => {
		const { children, className, title } = this.props;
		const classes = classNames( {
			'widget-group__group-container': true,
		}, className );

		return (
			<div className={ classes } >
				{ title && ( <h2>{ title }</h2> ) }
				{ children && this.renderChildren() }
			</div>
		);
	}
}

WidgetGroup.defaultProps = {
	maxColumns: 2
};

WidgetGroup.propTypes = {
	className: PropTypes.string,
	maxColumns: React.PropTypes.number,
	title: React.PropTypes.string,
};

export default WidgetGroup;
