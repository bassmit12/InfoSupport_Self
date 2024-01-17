# Frontend

This application is constructed using React and Vite, offering a streamlined setup for a swift and effective development environment. The following instructions detail how to utilize and execute the application, now enhanced with TypeScript support.

## Table of Contents

- [Application structure](#application-structure)
  - [Guests](#guests)
  - [Staff](#staff)
- [Using the application](#using-the-application)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
  - [Build](#build)
  - [Testing](#testing)

## Application structure

The application is structured into two distinct parts: "Guests" and "Staff," each catering to specific user roles and functionalities.

- The application has some shared and divided components, styles, and utilities that are used by both guests and staff sections to maintain consistency in design and functionality.
- Routing is likely implemented to direct users to the appropriate section based on their authentication status and role.
- The division into "Guests" and "Staff" helps organize the codebase, making it more modular and easier to maintain. It also ensures a clear separation of concerns, improving security and access control.

### Guests

The guest part of the application is divided into 2 mayor sections. The menu part and the transaction part. The menu part allows you to find and order different sets of food or drinks which will then be added to your transaction list. This list can be seen when clicking on the cart icon on the top right.

The Transaction part is where users can see their cart and increase/decrease the quantity of items in the cart and/or remove items. When all is set they can press Order now and the transaction will be complete. It will then be handled by the backend and appear on the staff side of the application

### Staff

(Rowan)

## Using the application

First of all, go into the MenuMasters folder in this directory before you run any code!

### Scripts

The following scripts are available for development, testing, and deployment:

- predeploy: Runs before deploying to build the application.
- deploy: Deploys the application to GitHub Pages using gh-pages.
- dev: Starts the development server with Vite.
- build: Compiles TypeScript and builds the application.
- scan:translations: Scans translations using i18next-scanner.
- lint: Lints the code using ESLint.
- preview: Previews the production build locally.
- test: Runs Cypress tests in headless mode.
- test:open: Opens Cypress test runner for interactive testing.

### Dependencies

Start with installing the dependancies with:

```
npm install
```

Key dependencies used in this project:

- React: A JavaScript library for building user interfaces.
- Vite: A fast and efficient development server and bundler.
- Chakra UI Icons: Provides a set of accessible icons.
- Axios: A promise-based HTTP client for making requests.
- i18next: An internationalization framework for JavaScript.
- Recoil: A state management library for React.

For a complete list, refer to the package.json file.

### Build

To build the application for production, run:

```
npm run build
```

### Testing

To run Cypress tests in headless mode, use:

```
npm test
```

For interactive testing, run:

```
npm run test:open
```
