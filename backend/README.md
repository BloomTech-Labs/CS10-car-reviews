# Auto Review For You
Auto Review For You is an app made for everyone who loves cars and wants to know more about them, from the people who drive them. Users can search car reviews in our database by make, model and year, and can filter the results by reviewer and sort them by year or score. If the user hits our 3 view limit, they'll be invited to register. Once a user is registered with us, they can read all the reviews they want. Our app comes with a subscription plan for those of us who really love cars, and want to write even more about it.

 Check us out, sign up, and tell the world about your car!

- Deployments:
    * https://car-reviews-2.herokuapp.com
    * https://back-lambda-car-reviews.herokuapp.com

# Docs
* The Stack:
    - M [MongoDB](https://docs.mongodb.com/?_ga=2.190964271.428309763.1539131858-110660816.1527959939)
    - E [Express](https://expressjs.com/en/4x/api.html)
    - R [React](https://reactjs.org/docs/getting-started.html)
    - N [Node](https://nodejs.org/en/docs/)

* Other Technologies Used:
    - HTTP Client: [axios](https://github.com/axios/axios/blob/master/README.md)
    - Routing: [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
    - Testing: [Enzyme](https://airbnb.io/enzyme/), [Jest](https://jestjs.io/docs/en/getting-started)
    - Authorization: [JWT](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md)
    - Payment: [Stripe](https://stripe.com/docs/api#intro)
    - Image Upload: [Dropzone](https://react-dropzone.netlify.com)
    - Linter: [ESLint](https://eslint.org)

* UX/UI:
    - [UX/UI Docs](car-reviews/README.md)

* ENDPOINTS:
    - [Backend Docs](backend/README.md)

# How to START a local instance:
- fork/clone : [repo link](https://github.com/Lambda-School-Labs/CS10-car-reviews)
1. navigate into root directory
2. to start the server:
    - ```cd backend```
    - ```yarn install```
    - ```yarn start```
 3. to start the front end:
    - ```cd car-reviews```
    - ```yarn install```
    - ```yarn start```
- local host will be at http://localhost:3000/


# Naming Conventions
- Class names and React Components are named (within their files) using PascalCasing.
- Filenames of all JS and CSS files are lowercase.

# Component Structure
* Navbar
    - The Navbar component exists fixed to the top throughout the app, offering quick access to everything available to the user. It is conditionally rendereds the User Page links based on the users "loggedIn" status. 
* Main Page
    - The Main Page consists of the landing page as well as the search results.
    - The Searchbar is the component that allows the user to search cars and reviews in our database. 
    - The Main Content component is a display of featured reviews, featured cars, and featured reviewers. We decided on "featured" being the most popular, being ranked according to their view counter.
    - The Search Results content will replace the Main Content on the page when someone does a search. It displays a list of results matching the search filter criteria.

* User Page
    - The User Page is a collection of several components that make up various parts of a user's profile, such as their reviews, billing information, and settings page.
    - billingcontainer.js, myreviews.js, and settings.js are "container" components that include the navbar and the complimentary component.

* Modals
    - The core feature of the app are it's modals. There is a self explanitory modal for logging in, however it is our review modals that are the core of the app. They are very similar, but each serves a different purpose, or displays data in a different way.

# Team
* Project Manager
    - Shobana Ramesh
* Devs:
    - Jonathan Greene
    - Herbert Hodgson
    - Andrew Kolumbic
    - Sam Landsman
    - Charlie Sparks