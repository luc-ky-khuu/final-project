# vehicle-expenses-tracker
A web application for car owners who want to keep track of their vehicle's expenses

## Technologies Used
- React.js
- Webpack
- Bootstrap 5
- Node.js
- PostgreSQL
- CSS3
- HTML5
- Heroku
- Google Maps API

## Live Demo
Try the application live at [https://vehicle-expenses-tracker.herokuapp.com/](https://vehicle-expenses-tracker.herokuapp.com/)

## Features
- User can add their vehicle(s) to their list
- User can upload an image of their vehicle
- User can add and view a vehicle's records
- User can see a widget with total amount spent on their vehicle
- User can see a widget with a reminder for their next oil change
- User can see a map of nearby mechanics

## Preview
![add-record-preview](https://user-images.githubusercontent.com/48267398/166075504-07e8c264-87b2-4e73-a77a-afb8c492682e.gif)
![maps-preview](https://user-images.githubusercontent.com/48267398/166075509-9eb7fea1-045b-4c9f-8358-7e140718ff89.gif)

## Stretch Features
- User can create an account
- User can categorize their records
- User can see a chart for their records

## Development

### System Requirements
- Node.js 10 or higher
- NPM 6 or higher

### Getting Started
1. Clone the repository
    ```shell
    git clone https://github.com/luc-ky-khuu/vehicle-expenses-tracker.git
    cd vehicle-expenses-tracker
    ```
2. Install all dependencies with NPM.
    ```shell
    npm install
    ```
3. Make a copy of the provided .env.example file.
    ```shell
    cp .env.example .env
    ```
4. Start the PostgreSQL server
    ```shell
    sudo service postgresql start
    ```
6. Create the database
    ```shell
    createdb vehicleExpensesTracker
    ``` 
7. Import data into the database
    ```shell
    npm run db:import
    ``` 
8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
    ```
