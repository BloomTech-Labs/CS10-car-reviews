# Backend Documentation

## Technologies Used
 - Main Technologies: NodeJS with Express
 - Database: MongoDB with Mongoose
 - Testing: Mocha
 - Authentication: BcryptJS, JSONWebToken

## Data Models
- Our data is stored in three main arrays of objects: Users, Reviews, and Cars

### UserModel
General Notes:
- The UserModel has a pre-save hook that automatically hashes passwords stored with BcryptJS

Properties:
- fullname: String, required, lowercased
- username: String, unique, required, lowercased
- email: String, unique, required, lowercased
- password: String, required, minlength of 4
- reviews: array of objects, many-to-one relation to the user

### ReviewModel
General Notes: 

Properties:
- car: ObjectID, required, one-to-one relation to the review
- user: ObjectID, required, one-to-one relation to the review
- content: String, required
- score: String, required
- createOn: Date, defaults to the Date.now()

### CarModel
General Notes:

Properties:
- make: String, required
- model: String, required
- year: Number, required
- edition: String, required
- reviews: array of objects, one-to-many relation to the car


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
- Parameters: fullname, username, email, password--passed through `req.body`
- Response: sends a JWT as a JSON response when successful as: `{ JWT: token }`

##### POST to '/auth/login'
- Parameters: email, password--passed through `req.body`
- Response: sends a JWT as a JSON response when successful as: `{ JWT: token }`

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
- returns all of the featured reviews
- logic not implemented yet

##### GET to '/api/popular/popular_cars'
- returns all of the most popular cars
- logic not implemented yet

##### GET to '/api/popular/popular_reviewers'
- returns all of the most popular reviewers
- logic not implemented yet

### popularRouter
#### General Notes:
- handles all requests that deal with getting a specific user's data
- sub router of the contentRouter

#### Endpoints:
##### POST to '/api/users/data'
- returns the entire user record
- populates the reviews relational data for the record