import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";
// SUI Components
import { Button, Icon, Confirm } from "semantic-ui-react";

const DeleteButton = ({ postId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		update(proxy) {
			setConfirmOpen(false);
			let data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
			data = data.getPosts.filter((post) => post.id !== postId);
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
			if (callback) callback();
		},
		variables: { postId },
	});

	return (
		<>
			<Button
				as="div"
				color="gray"
				floated="right"
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name="trash" style={{ margin: 0 }} />
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePost}
			/>
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

export default DeleteButton;
