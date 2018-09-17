# Frontend Documentation

# Technologies Used
- Main Tech: React.js
- HTTP Client: Axios
- CSS: Reactstrap
- Routing: React Router
- Testing: TBD(we will probably go with Jest)
- State Management: TBD

# Styles
![Image of Color Scheme](http://blog.visme.co/wp-content/uploads/2016/09/website42-1024x512.jpg)

* Color Scheme:
    - #77A6F7 - light blue
    - #D3E3FC - light blue/gray
    - #FFFFFF - white
    - #FFCCBC - beige/salmon
    - #00887A- turquoise

* Fonts:
    - Julius Sans One - headers
    - Montserrat - body

# Component Structure
- src/App.js
    - /MainPage
        - SearchBar
        - MainContent
        - Search Results
    - /UserPage
        - Header
        - /Settings
            - LeftNavBar
            - UserSettings
    - Signin/Signup Modals.
    - Review Modals

# Main Page
- The main page consists of the landing page as well as the search results. It is made up of a searchbar component which includes sign-up/sign-in buttons, search filters, and a review button.
- The Main Content component is a display of featured reviews, featured cars, and featured reviewers. We decided on "featured" being the most popular, being ranked according to their view counter.
- The Search Results content will replace the Main Content on the page when someone does a search. It displays a list of results matching the search filter criteria.

# User Page
- The User Page is a collection of several components that make up various parts of a user's profile, such as their reviews, a button to create a new review, billing information, and settings.

# Modals
- The core feature of the app are it's modals. The sign-up/sign-in modal is self explainatory, however it is the Review modal that is the true core of the app. Much of the app consists of buttons representing reviews, cars, or reviwers, which will open a modal with the corresponding data.

# AXIOS ENDPOINTS
TBD