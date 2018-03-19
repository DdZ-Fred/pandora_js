const express = require('express')
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
  GraphQLString,
} = require('graphql');


const PORT = process.env.PORT || 3000;
const server = express();

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
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The Query type',
  fields: {
    posts: {
      description: 'Collection of posts',
      type: GraphQLList(postType),
      resolve: () => new Promise((resolve, reject) => {
        resolve(posts);
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
});

const getUserId = (req) => {
  return 1;
}


server.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
  const userId = getUserId(req);

  return {
    schema,
    context: {
      userId: getUserId(req),
    },
    formatError: (err) => {
      return err;
    }
  };
}));

server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});