# Backend Documentation

## Technologies Used
 - Main Technologies: [Node](https://nodejs.org/en/docs/), [Express](https://expressjs.com/en/4x/api.html)
 - Database: [MongoDB](https://docs.mongodb.com/?_ga=2.190964271.428309763.1539131858-110660816.1527959939), [Mongoose](https://mongoosejs.com/docs/guide.html)
 - Testing: [Mocha](https://mochajs.org/#getting-started), [Chai](https://www.chaijs.com/api/), [Chai-HTTP](https://www.chaijs.com/plugins/chai-http/)
 - Authentication: [BcryptJS](https://www.npmjs.com/package/bcryptjs), [JWT](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md)

## Data Models
- Our data is stored in three main arrays of objects: Users, Reviews, and Cars

### UserModel
#### General Notes:
- The UserModel has a pre-save hook that automatically hashes passwords stored with BcryptJS

Properties:
- `fullname`: String, required, lowercased
- `username`: String, unique, required, lowercased
- `email`: String, unique, required, lowercased
- `password`: String, required, minlength of 4
- `reviews`: array of objects, many-to-one relation to the user
- `paid`: Boolean, defaults to false, updates to true if user buys a subscription
- `timesViewed`: Number, defaults to 0, indexed, keeps track of amount of reviews viewed by each user per day,      in conjuction with the next property
-`date`: Date, defaults to current date, indexed

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
- `edition`: String, not required
- `reviews`: Array of objects, one-to-many relation to the car
- `imageURL`: Array of Strings (urls) corresponding to images associated with the car, uploaded by users when creating a review

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
- Made up of sub-routers `popularRouter`, `userRouter`, and `reviewsRouter`.

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

##### GET to '/api/popular/featured_reviews'
Sends back all of the featured reviews, sorted, for the landing page

### userRouter
#### General Notes:
- handles all requests that deal with getting a specific user's data
- sub router of the contentRouter

#### Endpoints:
##### GET to '/api/users/data'
- returns the entire user record
- populates the reviews relational data for the record

##### PUT to '/api/users/data'
- This endpoint allows a user to change their personal data.
- A valid JWT is required to access this endpoint.
- User identity is verified via the JWT.

###### Parameters
- Accepts any of the following types of data corresponding to the user sent on the body of the request:
    - `email`: String, lowercased automatically
    - `password`: String, minimum length of 4
    - `username`: String, lowercased automatically

- Also accepts:
    - `counter`: Number, to keep track of amount of reviews viewed per user per day.
    - `newDate`: Date, to reset the counter if the date has changed since the user last viewed reviews.

###### Response 
- `Status`: 200
- `Body`: 
    - If user data was updated: Responds with new JWT with updated user data.
    - If counter or date were updated: Responds with the full user record with updated data 
- `Errors`: responds with a status of `500` and a JSON response with a key of `databaseError`

### reviewsRouter
#### General Notes:
- Handles all requests to create, update, and delete a review.
- Also handles requests to retrieve review data according to the parameters received.
- ReviewsRouter includes a provision for the functionality of the front-end review search feature.

#### Endpoints:
##### POST to '/api/reviews'
- Creates a new review in the reviews collection.
- Checks if the car referenced in the review already exists in the cars collection. 
    - If the car already exists, adds the new review _id to the array of review ids in car.reviews
    - If the car does not exist, create the car with recieved data, adds the new review _id to the array of review ids in the new car.reviews.
- Requires a valid JWT.
- Retrieves user data from the JWT, and updates user data with a reference to the new review.

###### Parameters
All parameters are expected to be passed through the request body
- `title`: String, required
- `content`: String, required, 
- `score`: Number, required, 
- `carImage`: String (url), not required
- `year`: Number, required
- `make`: String, required
- `model`: String, required 

###### Response 
- `Status`: 200
- `Body`: Responds with the new review created
- `Errors`: responds with a status of `500` and a JSON response with a key of `error`

##### GET to '/api/reviews'
- Retrieves all reviews of a given user.
- User data is expected to be passed into req.headers with key 'jwt'
- JWT is checked for validity, and user data is accessed via the JWT.

###### Response 
- `Status`: 200
- `Body`: Responds with all reviews of given user
- `Errors`: responds with a status of `500` and a JSON response with a key of `error`

##### PUT to '/api/reviews/:id'
- Id parameter must correspond to a review _id in the database.
- Edits an individual review.
- User data is expected to be passed into req.headers with key 'jwt'.
- JWT is checked for validity, and user data is accessed via the JWT.

###### Parameters
All parameters are expected to be passed through the request body
- `title`: String, required, 
- `content`: String, required

###### Response 
- `Status`: 200
- `Body`: Responds with updated review.
- `Errors`: responds with a status of `500` and a JSON response with a key of `error`

##### DELETE to '/api/reviews/:id'
- Id parameter must correspond to a review _id in the database.
- Deletes an individual review.
- User data is expected to be passed into req.headers with key 'jwt'.
- JWT is checked for validity, and user data is accessed via the JWT.
- Deletes review data from user, car, and review collections.

###### Response 
- `Status`: 200
- `Body`: Responds with updated user info (showing that review has been deleted).
- `Errors`: responds with a status of `500` and a JSON response with a key of `error`

##### POST to '/api/reviews/search'
- Searchs for reviews based on the car or user data passed in via the request body.
- All parameters are optional: An empty request body will simply return all reviews in the database.
- More specific parameters recieved return more specific search results, according to the parameters received.

###### Parameters
- If car parameters are received, the response is an array of review data, along with car data and user data for each review.
- Car parameters include any of the following:
    - `make`: String
    - `model`: String
    - `year`: Number
    - `edition`: String
    - `trim`: String
- If user parameters are recieved, the API responds with all reviews by that user.
- User parameter include only:
    - `username`: String

###### Response 
- `Status`: 200
- `Body`: Responds with an array of reviews with review data (title, content, rating, etc.), with car data      for each review (make, model, year, trim), as well as user data (username).
- `Errors`: responds with a status of `500` and a JSON response with a key of `error`

### paymentRouter
#### General Notes:
- Processes payments for various subscription options.
- Sends data to Stripe payment processing, and updates user data in the users collection as well

#### Endpoints:
##### POST to '/api/payment'
- User data is expected to be passed into req.headers with key 'jwt'.
- JWT is checked for validity, and user data is accessed via the JWT.
- Sends info to Stripe for processing, then updates users collection in database and notifies front-end of success or failure.

###### Parameters
All parameters are expected to be passed through the request body
- `description`: String, must be one of the following:
    - '1 year unlimited reviews'
    - '6 month unlimited reviews'
    - '1 month unlimited reviews'
- `source`: Object, stripe token

###### Response 
- `Status`: 200
- `Body`: Responds with an user data of the now paying user, showing the 'paid' field set to true
- `Errors`: responds with a status of `500` and a JSON response with a key of `error`

## Testing: COMPLETED
- All testing is run through Mocha and Chai

### Database Tests
- tests CRUD operations, as well as the population of relational data on all models
- run with `yarn test_db`

### Routing Tests
- tests all routes currently implemented
- run with `yarn test_routing`