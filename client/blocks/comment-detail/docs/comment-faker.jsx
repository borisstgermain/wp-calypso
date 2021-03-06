/**
 * External dependencies
 */
import React, { Component } from 'react';
import { get, keyBy, omit, values } from 'lodash';

/**
 * `CommentFaker` is a HOC to easily test the Comments Management without the necessity of real data or actions.
 *
 * It takes the comments passed via props (with mock data, Redux-connected, etc.) and puts them in its internal state.
 * Then passes them and various actions (status and like setters) to the actual comment list component.
 *
 * Once data and actions will be completely Reduxified, it will be enough to remove the `CommentFaker` call
 * and use the `mapDispatchToProps` actions instead, leaving this component still useful for testing purposes.
 */
export const CommentFaker = WrappedCommentList => class extends Component {
	state = {
		comments: {},
	};

	componentWillMount() {
		this.getCommentsFromProps( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( ! this.props.comments.length ) {
			this.getCommentsFromProps( nextProps );
		}
	}

	deleteCommentPermanently = commentId => this.setState( { comments: omit( this.state.comments, commentId ) } );

	getCommentsFromProps = ( { comments } ) => this.setState( { comments: keyBy( comments, 'ID' ) } );

	setCommentLike = ( commentId, likeValue ) => {
		const comment = this.state.comments[ commentId ];

		// If like changes to true, also approve the comment
		this.setState( {
			comments: {
				...this.state.comments,
				[ commentId ]: {
					...comment,
					i_like: likeValue,
					status: likeValue ? 'approved' : comment.status,
				}
			},
		} );
	}

	setCommentStatus = ( commentId, status ) => {
		const comment = this.state.comments[ commentId ];

		// If the comment is not approved anymore, also remove the like, otherwise keep its previous value
		this.setState( {
			comments: {
				...this.state.comments,
				[ commentId ]: {
					...comment,
					i_like: 'approved' === status ? comment.i_like : false,
					status,
				}
			},
		} );
	}

	toggleCommentLike = commentId => this.setCommentLike(
		commentId,
		! get( this.state.comments, [ commentId, 'i_like' ], false )
	);

	render() {
		return (
			<WrappedCommentList
				{ ...this.props }
				comments={ values( this.state.comments ) }
				deleteCommentPermanently={ this.deleteCommentPermanently }
				setCommentLike={ this.setCommentLike }
				setCommentStatus={ this.setCommentStatus }
				toggleCommentLike={ this.toggleCommentLike }
			/>
		);
	}
};

export default CommentFaker;
