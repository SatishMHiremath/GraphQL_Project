const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// const PORT = 3500;

const authors = [
    {   id:"1",
        info: {
            name:"Joe kelly",
            age:32,
            gender:"M",
        }
    },
    {
        id:"2",
        info:{
            name:"Mary Jame",
            age:25,
            gender:"F",
        }
    }
];

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
type Mutation{
    createAuthor(name: String!, gender: String!, age: Int):Author
    updateAuthor(id:ID!, name: String, gender: String, age: Int):Author
}
`;

const PORT = 3600;

//The Resolvers
const resolvers = {
    Query : {
        getAuthors: () => authors,
        retrieveAuthor: (obj, { id }) => authors.find(author => author.id === id),      
    },
    Mutation: {
        createAuthor:(obj, args) => {
            const id = String(authors.length+1);
            const { name, gender, age } = args;

            const newAuthor = {
                id,
                info: {
                    name,
                    gender,
                    age
                }
            }
            authors.push(newAuthor);
            return newAuthor;
        },
        updateAuthor: (obj, {id, name, gender, age}) => {
            const author = authors.find(author => author.id === id);
            if(author) {
                const authorIndex = authors.indexOf(author);

                if(name) author.info.name = name;
            
                if(name)  author.info.age = age;
                
                if(name) author.info.gender = gender;

                authors[authorIndex] = {id, info: author};  
                return {id, info: author}
            }else {
                throw new Error("Author ID not found");
            }
        } 
    }
};

//Put together a schema
const server = new ApolloServer({typeDefs, resolvers});

const app = express(); 

server.applyMiddleware({
    app,
    path: '/graphql'
})

app.use('/graphql', (req,res) => {
    res.send('Welcome to Graphql Applicaton');
});

app.listen(PORT, () => {
    console.log('Server ready at port http://localhost:${PORT}${server.graphqlPath}');
});

// app.listen(PORT, () => {
//     console.log('Server running on port : ',PORT);
// });

