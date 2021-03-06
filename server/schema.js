
//The graphql schema in string form
const typeDefs = `
type Author {
    id: ID!
    info:Person
}
type Person {
    name: String!
    age:Int
    gender:String
}
type Query {
    getAuthors: [ Author ]
    retrieveAuthor(id: ID!):Author 
}
type DeleteMessage{
    id:ID!
    message:String
}
type Mutation{
    createAuthor(name: String!, gender: String!, age: Int):Author
    updateAuthor(id:ID!, name: String, gender: String, age: Int):Author
    deleteAuthor(id: ID!):DeleteMessage
}
type Subscription{
    createAuthorWithSubscription: Author
}
`;

module.exports=typeDefs;