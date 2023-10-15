import { Elysia, t } from "elysia";
import { BooksDatabase  } from "./db/db";
import { swagger } from '@elysiajs/swagger'

// const app = new Elysia().use(swagger({
//   documentation: {
//     tags: [
//       { name: 'App', description: 'General endpoints' },
//       { name: 'Auth', description: 'Authentication endpoints' }
//     ]
//   }

// })).decorate('db',new BooksDatabase)


// /// book with  body request 


// app.listen(8081)


// console.log(
//   `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
// );
const app = new Elysia()
    .use(swagger(
      {
        documentation: {
            info: {
                title: 'Elysia Documentation',
                version: '1.0.0'
            },
            tags:[
              { name: 'App', description: 'General endpoints' },
              { name: 'books', description: 'CRUD of Books' }
            ]
        }
        
    }
    ))
    .get('/', () => 'hi')
    .post('/hello', () => 'world')
    .decorate('db',new BooksDatabase);


    app.post('/books', ({db,body}) => db.addBook(body),{
      body:t.Object({
        name:t.String(),
        author:t.String(),
      })
      , detail :{
        tags:['books']
      }
    },)
    app.put('/books', ({db,body}) => db.updateBook(body.id,{ name:body.name,author:body.author}),{
      detail :{
        tags:['books']
      },
      body:t.Object({
        id:t.Number(),
        name:t.String(),
        author:t.String(),
      })
    })
    app.get('/books/:id', ({db,params}) => db.getBook(parseInt(params.id)),{
      detail :{
        tags:['books']
      }
    })
    app.delete('/books/:id', ({db,params}) => db.deleteBook(parseInt(params.id)),{
      detail :{
        tags:['books']
      }
    })

    app.get('/books', ({db}) => db.getBooks(),{
      detail :{
        tags:['books']
      }
    });

    
    app.listen(8080)