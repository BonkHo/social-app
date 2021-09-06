import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
// SUI Components
import { Button, Icon, Confirm } from "semantic-ui-react";

const DeleteButton = ({ postId }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		update() {
			setConfirmOpen(false);
			// TODO: remove post from cache
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
