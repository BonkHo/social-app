const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post')
const checkAuth = require('../../utils/check-auth');

module.exports = {
    // These are the Query functions that can be used in order to retrieve information about a post.
    Query: {

        // Returns a list of all posts
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },

        // Returns a specific post given the postID
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    // These are the mutation functions that can be used for posts
    Mutation: {

        // This function allows users to create a post with authentication
        async createPost(_, { body }, context) {
        const user = checkAuth(context);
        console.log(user);
        const newPost = new Post({
            body,
            user: user.id,
            username: user.username,
            createdAt: new Date().toISOString()
        });

        const post = await newPost.save();
        return post;
        },
        
        // This function allows a user to delete their own posts
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);
            console.log(user);
            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return ('Post successfully deleted.');
                } else {
                    throw new AuthenticationError('Action not allowed.');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};