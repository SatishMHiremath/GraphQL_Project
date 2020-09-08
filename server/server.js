const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolver')
const { createServer } = require('http');

const PORT = 3600;

//Put together a schema
const server = new ApolloServer({typeDefs, resolvers});

const app = express(); 

server.applyMiddleware({
    app,
    path: '/graphql'
})

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use('/graphql', (req,res) => {
    res.send('Welcome to Graphql Applicaton');
});

httpServer.listen(PORT, () => {
    console.log('Server ready at port http://localhost:${PORT}${server.graphqlPath}');
});

// app.listen(PORT, () => {
//     console.log('Server running on port : ',PORT);
// });

