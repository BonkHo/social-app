import React from "react";
// The createdAt property is a ISOstring and the moment function .fromNow() will display how long ago the post was created
import moment from "moment";
// SUI components
import { Card, Icon, Label, Image } from "semantic-ui-react";

const PostCard = ({
	post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
	return (
		<Card>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<p>Buttons</p>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
