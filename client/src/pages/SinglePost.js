import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import moment from "moment";
// SUI components
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
// Components
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = ({ props }) => {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	console.log(postId);

	const {
		data: { getPost },
	} = useQuery(FETCH_POST_QUERY, { variables: { postId } });

	let postMarkup;

	if (!getPost) {
		postMarkup = <p>Loading Post...</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount,
		} = getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
							size="small"
							float="right"
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likes, likeCount }} />
								<Button
									as="div"
									labelPosition="right"
									onClick={() => console.log("Comment on post")}
								>
									<Button color="blue" basic>
										<Icon name="comments" />
									</Button>
									<Label color="blue" pointing="left" basic>
										{commentCount}
									</Label>
									{user && user.username === username && <DeleteButton postId={id} />}
								</Button>
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return postMarkup;
};

const FETCH_POST_QUERY = gql`
	query ($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

export default SinglePost;
