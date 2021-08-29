import React from "react";
import { Link } from "react-router-dom";
// The createdAt property is a ISOstring and the moment function .fromNow() will display how long ago the post was created
import moment from "moment";
// SUI components
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";

const PostCard = ({
	post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
	function likePost() {
		console.log("Like Post");
	}
	function commentPost() {
		console.log("Comment Post");
	}

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button as="div" labelPosition="right" onClick={likePost}>
					<Button color="red" basic>
						<Icon name="heart" />
					</Button>
					<Label basic color="red" pointing="left">
						{likeCount}
					</Label>
				</Button>
				<Button as="div" labelPosition="right" onClick={commentPost}>
					<Button color="blue" basic>
						<Icon name="comments" />
					</Button>
					<Label basic color="blue" pointing="left">
						{likeCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
