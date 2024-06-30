
# Pizza Order App

## Author
Yaniv Gabay  


## Overview
The Pizza Order App is a web application designed to manage pizza orders, including customer information, ingredient selection, and pricing. The backend is built with Spring Boot and includes various services, controllers, and configurations to support the application's functionality.

## Table of Contents
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Services](#services)
- [Configuration](#configuration)
- [Frontend](#frontend) *(to be added)*

## Project Structure
```
src/main/java/org/example/pizzaorderapp
|-- config
|   |-- PricingConfig.java
|-- controller
|   |-- BaseController.java
|   |-- FormController.java
|   |-- GlobalExceptionHandler.java
|   |-- IngredientController.java
|   |-- OrderController.java
|-- model
|   |-- CustomerInfo.java
|   |-- FormField.java
|   |-- Ingredient.java
|   |-- IngredientSelection.java
|   |-- Order.java
|   |-- Pizza.java
|-- service
|   |-- FormService.java
|   |-- IngredientService.java
|   |-- OrderService.java
```

## Usage

The application provides several endpoints to manage orders and ingredients. You can interact with these endpoints using tools like Postman or curl.

## API Endpoints

### Base URL

```
/api/v1
```

### FormController

- **Get form structure:**
    ```
    GET /api/v1/form-structure
    Response: 200 OK
    Body: List of form fields
    ```

### IngredientController

- **Get all ingredients:**
    ```
    GET /api/v1/ingredients
    Response: 200 OK
    Body: List of ingredients
    ```

- **Get ingredient by ID:**
    ```
    GET /api/v1/ingredients/{id}
    Response: 200 OK / 404 Not Found
    Body: Ingredient details / Error message
    ```

### OrderController
- **Create a new order:**
    ```
    POST /api/v1/orders
    Request Body: CustomerInfo
    Response: 201 Created
    Body: Order details
    ```

- **Get order by code:**
    ```
    GET /api/v1/orders/{orderCode}
    Response: 200 OK / 404 Not Found
    Body: Order details / Error message
    ```

- **Update an order:**
    ```
    PUT /api/v1/orders/{orderCode}
    Request Body: List of Pizzas
    Response: 200 OK / 404 Not Found
    Body: Updated order details / Error message
    ```

## Services
### FormService
- Provides form field data for the customer information form.

### IngredientService
- Manages ingredient data and provides methods to retrieve and delete ingredients.

### OrderService
- Manages order data, including creation, retrieval, and updating of orders. It also calculates the total price of an order based on the selected ingredients.

## Configuration
### PricingConfig
- Contains static pricing information for pizza ingredients and the base price of a pizza.


### Frontend

The frontend of the Pizza Order App is built using React and Material-UI for styling. It includes several components and contexts to manage the state and UI of the application.

## Table of Contents
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contexts](#contexts)

## Project Structure
```
src
|-- components
|   |-- CartModal
|   |   |-- CartModal.js
|   |-- HomePage
|   |   |-- Home.js
|   |   |-- HomeButton.js
|   |   |-- WelcomeHead.js
|   |-- NotFound.js
|   |-- OrderFormPage
|   |   |-- OrderFormPage.js
|   |-- OrderView
|   |   |-- OrderView.js
|   |   |-- OrderDetails.js
|   |-- PizzaFormPage
|   |   |-- PizzaFormPage.js
|   |   |-- PizzaFormHeader.js
|   |   |-- PizzaFormTotal.js
|-- context
|   |-- CartContext.js
|   |-- OrderContext.js
|   |-- SnackbarContext.js
|-- App.js
```

## Installation

1. **Clone the repository:**

    ```sh
    git clone 
    cd into the frontend directory
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Run the application:**

    ```sh
    npm start
    ```

## Usage
The application provides several pages and modals to manage pizza orders. You can navigate through the app using the provided links and buttons.

## Components

### CartModal

Displays the items in the cart in a modal.

### Home

Displays the home page with options to order pizza or view existing orders.

### HomeButton

A button component used in the Home page to navigate to different routes.

### WelcomeHead

Displays a welcome message on the Home page.

### NotFound

Displays a 404 page when the user navigates to an unknown route.

### OrderFormPage

Displays the form for creating a new order.

### OrderView

Displays the details of an order.

### OrderDetails
Displays the details of a successfully added order.

### PizzaFormPage

Displays the form for selecting ingredients for a pizza.

### PizzaFormHeader

Displays the header for the pizza form.

### PizzaFormTotal

Displays the total price for the current pizza.

## Contexts

### CartContext

Provides cart-related state and functionality to its children.

### OrderContext

Provides order-related state and functionality to its children.

### SnackbarContext

Provides Snackbar-related state and functionality to its children.

