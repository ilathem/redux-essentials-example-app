# Redux Essentials, Part 3: Basic Redux Data Flow

Link: https://redux.js.org/tutorials/essentials/part-3-data-flow

This app will be a social media feed app to practice using redux in real-world scenarios.

- To create all the redux dependencies automatically for new projects, use the [Redux template](!https://github.com/reduxjs/cra-template-redux)

## Starting off
- I started off this tutorial by forking [this repo](!https://github.com/reduxjs/redux-essentials-example-app), which contains some boilerplate code for getting going:
  - `/public`: contains the HTML host page template and other static files like icons
  - `/src`
    - `index.js`: entry point for application. Renders the React-Redux `Provider` component and the main `App` component
    - `App.js`: the main application component. Renders the top navbar and handles client-side routing for the other content
    - `index.css`: styles for the entire application
    - `/api`
      - `client.js`: a small AJAX request client that allows us to make GET and POST requests
      - `server.js`: provides a fake REST API for our data. Our app will fetch data from these fake endpoints later
    - `/app`
      - `Navbar.js`: renders the top header and nav content
      - `store.js`: creates the Redux store instance

## Part 6: Performance and Normalizing Data
- This part is about showcasing different techniques to optimize performance

## Part 7: RTK Query Basics
- RTK Query is a data fetching and caching solution designed fro Redux applications
- There is a mindset change from "managing state" to "managing cached data" (https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#thinking-in-rtk-query-caching)
- 