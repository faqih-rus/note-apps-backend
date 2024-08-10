// server/server.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import notesRoutes from './routes/notes.js';

const app = express();
app.use(express.json());

// Setup RESTful API routes
app.use('/api', notesRoutes);

// Setup GraphQL server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`GraphQL playground available at http://localhost:${PORT}${server.graphqlPath}`);
});
