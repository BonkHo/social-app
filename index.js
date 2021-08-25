const { ApolloServer} = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js');
const pubsub = new PubSub();

// Initializes a new ApolloServer instance
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => ({ req, pubsub }) 
});

// Uses mongoose to connect the MongoDB instance to the Apollo server
mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "merng" })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
    console.log(`Server running at ${res.url}`);
});