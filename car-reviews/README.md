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
After doing research, we decided to use the color scheme above because the standard Blue, Gray, and White scheme is a standard that works. This particular comination of colors is useful for what is called 'flat-design', meaning very minimal and subtle 3D effects. 

* Color Scheme:
    - #77A6F7 - light blue
        - This, in combination with white, will be our 'dominant color', used for backgrounds of the search bar, nav bar, and other backgrounds. Blue evokes trust, security, and calmness, which are feelings we want our Users to feel when reading reviews.
    - #2F77F3 - darker blue
        - This color is used when a darker shade of blue is neccessary to make something stand out against a white background, like fonts.
    - #FFFFFF - white
        - White will be our other 'dominant color', being the default background for the majority of the app.
    - #D3E3FC - light blue/gray
        - This color should be used for Modal Buttons, and perhaps borders as well. This complements both Blue and White.
    - #B4B6BA - Gray
        - This is a darker shade of gray to be used for contrasting the lighter elements.
    - #00887A - turquoise
        - This color will be our main go-to for Buttons and Components that need to "pop" or have attention drawn to it without standing out in 'loud' way. 
    - #FFCCBC - beige/salmon
        - This color will be used for components that need to standout, but need to be differentiated from turquoise. This color should be used sparingly. 

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

# Naming Conventions
- Class names and React Components are named (within their files) using PascalCasing.
- Filenames of all JS and CSS files are lowercase.