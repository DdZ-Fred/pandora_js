const express = require('express');
const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = require('graphql');

const posts = [
  {
    id: 1,
    title: 'title 1',
    body: 'body 1',
    author: 'author 1'
  },
  {
    id: 2,
    title: 'title 2',
    body: 'body 2',
    author: 'author 2'
  }
];

const postType = new GraphQLObjectType({
  name: 'PostType',
  description: 'The blog post type',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The Query type',
  fields: {
    posts: {
      description: 'Collection of posts',
      type: GraphQLList(postType),
      resolve: (_, args, ctx) => new Promise((resolve, reject) => {
        resolve(posts);
      }),
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType
});

const getUserId = (req) => {
  return 1;
}

module.exports = class ApolloServer {
  constructor(serviceContext) {
    this.config = serviceContext.config;
    this.logger = serviceContext.logger;
  }

  async start() {
    const app = express();

    app.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
      this.logger.info('Received a request');

      const userId = getUserId(req);

      return {
        schema,
        context: {
          userId: userId
        },
        formatError: (err) => {
          return err;
        }
      };
    }));

    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

    await new Promise((resolve, reject) => {
      this.server = app.listen(this.config.port, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    });

    console.log(`ApolloServer process #${process.pid} is now listening on http://localhost:${this.config.port}`);
  }

  async stop() {
    await new Promise((resolve) => {
      this.server.close(resolve);
    });
    console.log(`ApolloServer process #${process.pid} just stopped.`);
  }
}