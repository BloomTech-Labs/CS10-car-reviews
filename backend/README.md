# Backend Documentation

## Technologies Used
 - Main Technologies: NodeJS with Express
 - Database: MongoDB with Mongoose
 - Testing: Mocha, Chai, and Chai-HTTP
 - Authentication: BcryptJS, JSONWebToken

## Data Models
- Our data is stored in three main arrays of objects: Users, Reviews, and Cars

### UserModel
#### General Notes:
- The UserModel has a pre-save hook that automatically hashes passwords stored with BcryptJS

Properties:
- fullname: String, required, lowercased
- username: String, unique, required, lowercased
- email: String, unique, required, lowercased
- password: String, required, minlength of 4
- reviews: array of objects, many-to-one relation to the user

### ReviewModel
#### General Notes:

#### Properties
- `car`: ObjectID, required, one-to-one relation to the review
- `user`: ObjectID, required, one-to-one relation to the review
- `content`: String, required
- `score`: String, required
- `createOn`: Date, defaults to the Date.now()

### CarModel
#### General Notes

#### Properties
- `make`: String, required
- `model`: String, required
- `year`: Number, required
- `edition`: String, required
- `reviews`: array of objects, one-to-many relation to the car


### Model Tests: COMPLETED
- Run tests with `yarn test`
- Tests for the Models can be found in `src/routers/tests`.
- All tests were implemented with Mocha and test a variety of circumstances

## Routing and Endpoints

### authRouter
#### General Notes:
- authRouter handles all registering and logging in
- Issues JWTs when login or register is successful

#### Endpoints:
##### POST to '/auth/register'
###### Parameters
All parameters are expected to be passed through the request body
- `fullname`: String, required, lowercased automatically
- `username`: String, unique, required, lowercased automatically
- `email`: String, unique, required, lowercased automatically
- `password`: String, required, minimum length of 4
- `testEntry`: Bool, defaults to `false`, used only for records created with the unit tests

###### Response 
- `Status`: 200
- `Body`: Responds with a JWT inside of a JSON response when successful as: `{ JWT: token }`
- `Errors`: All errors respond with a status of `500` and a JSON response with a key of `registerError`


##### POST to '/auth/login'
###### Parameters
All parameters are expected to be passed through the request body
- `email`: String, unique, required, lowercased automatically
- `password`: String, required, minimum length of 4
- `testEntry`: Bool, defaults to `false`, used only for records created with the unit tests

###### Response 
- `Status`: 200
- `Body`: Responds with a JWT inside of a JSON response when successful as: `{ JWT: token }`
- `Errors`: All errors respond with a status of `500` and a JSON response with a key of `registerError`

### contentRouter
#### General Notes:
- contetRouter handles all requests that are seeking data
- Made up of sub-routers `popularRouter` and `userRouter`

### popularRouter
#### General Notes:
- handles all requests that deal with sorting popular data
- sub router of the contentRouter

#### Endpoints:
##### GET to '/api/popular/featured_reviews'
Sends back all of the featured reviews, sorted, for the landing page

###### Parameters
No parameters expected

###### Response 
- `Status`: 200
- `Body`: responds with the sorted array of featured reviews 
- `Errors`: responds with a status of `500` and a JSON response with a key of `popRouterError`


##### GET to '/api/popular/popular_cars'
Sends back all of the most popular cars

###### Parameters
No parameters expected

###### Response 
- `Status`: 200
- `Body`: responds with the sorted array of featured reviews 
- `Errors`: responds with a status of `500` and a JSON response with a key of `popRouterError`

##### GET to '/api/popular/popular_reviewers'
Sends back all of the most popular reviewers

###### Parameters
No parameters expected

###### Response 
- `Status`: 200
- `Body`: responds with the sorted array of featured reviews 
- `Errors`: responds with a status of `500` and a JSON response with a key of `popRouterError`

### popularRouter
#### General Notes:
- handles all requests that deal with getting a specific user's data
- sub router of the contentRouter

#### Endpoints:
##### POST to '/api/users/data'
- returns the entire user record
- populates the reviews relational data for the record

##### POST to '/api/reviews'
- adds new review to 'reviews' collection
- populates relavent fields in 'users' and 'cars' collection
- returns a JSON response TBD by front-end needs

##### GET to '/api/reviews/:id'
- expects id variable consistent with the id of a user stored in the MongoDB user collection
- returns all reviews of the given user as a JSON response
- for each review: returns the make and model of the car, the review, and the year

## Testing: COMPLETED
- All testing is run through Mocha and Chai

### Database Tests
- tests CRUD operations, as well as the population of relational data on all models
- run with `yarn test_db`

### Routing Tests
- tests all routes currently implemented
- run with `yarn test_routing`