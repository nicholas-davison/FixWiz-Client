# FizWiz Client


## Table of Contents

- [Installation](##installation)

- [Usage](##usage)

- [Development](#development)

## Installation

Make sure you have the following installed:

- Node.js
- React 18.3.1
- Vite 5.3.4

Clone this repository on Github.

Navigate to the fixwiz-client directory. Then run the following commands one at a time:

```
npm install

npm run dev

```

Finally, navigate to http://localhost:5173 in your browser.

## Usage

Users can register as either a Customer or Contractor. Once registered, Customers can create, view, edit, and delete service tickets for various home repair tasks. Contractors can view, claim, unclaim, and close their claimed service tickets. 

## Development

This application was developed using Django/Python on the server side and React/Javascript on the client side. Data is stored in a SQLite3 database.