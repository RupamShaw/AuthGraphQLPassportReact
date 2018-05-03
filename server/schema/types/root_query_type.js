const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require('./user_type')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    currentUser: { 
      type: UserType ,
      resolve(parentValue,args,req){
        console.log("passport returned user i.e currentuser",req.user)
        return req.user //null if user not signin returned by passport
      }
    }
  }
});

module.exports = RootQueryType;
