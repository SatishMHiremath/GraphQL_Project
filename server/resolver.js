const authors = require('./author');
const {PubSub} = require('apollo-server-express');
// const { subscribe } = require('graphql');
const pubsub = new PubSub();
const AUTHORS_TOPIC = "newAuthor";

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

            pubsub.publish(AUTHORS_TOPIC, {createAuthorWithSubscription : newAuthor});
 
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
        },
        deleteAuthor: (obj, {id}) => {
            const author = authors.find(author => author.id === id);
            if(author) {
                const authorIndex = authors.indexOf(author);
                authors.splice(authorIndex, 1);
                return {
                    id, 
                    message:`Author with id ${id} deleted successfully.`
                };
            }
            else {
                throw new Error("Author ID not found");
            }
        }
    },
    Subscription: {
        createAuthorWithSubscription: {
            subscribe: () => pubsub.asyncIterator(AUTHORS_TOPIC)
        }
    }
};

module.exports=resolvers;