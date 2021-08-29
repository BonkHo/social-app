import React from "react";
import { useQuery, gql } from "@apollo/client";
// SUI Components
import { Grid } from "semantic-ui-react";
// Components
import PostCard from "../components/PostCard";

const Home = () => {
	// useQuery hook takes in query from FETCH_POSTS_QUERY
	// The data will be stored in a getPosts object and should be destructured
	const { loading, data: { getPosts: posts } = {} } =
		useQuery(FETCH_POSTS_QUERY);
	console.log(posts);

	return (
		<Grid columns={3}>
			<Grid.Row className="page-title">
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{loading ? (
					<h1>Loading Posts...</h1>
				) : (
					posts &&
					posts.map((post) => (
						<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
							<PostCard post={post}></PostCard>
						</Grid.Column>
					))
				)}
			</Grid.Row>
			<Grid.Row></Grid.Row>
		</Grid>
	);
};

// Fetches the posts and queries (confirms the avaliability)
const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
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

export default Home;
