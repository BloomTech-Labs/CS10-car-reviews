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


## Routing and Endpoints
fill out endpoints


## Database Models
### UserModel
fill out structure

### ReviewModel
fill out structure

### CarModel
fill out structure
