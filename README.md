# Book-management

This is a Book Record Management API Server for Library system (Management of Documents, Books)

Server  >> Storing Book Data
        >> User Registration
        >> Subscription Model


# Routes and EndPoints

## /users
POST: Create a New User
GET: Fetch all the User info here

## /users/{id}
GET: Fetch the User ID
PUT: Update User by their ID
DELETE: Delete a User by ID (Check first if they have issued a book)

## Subscription Types
3 Months (Basic)
6 Months (Standard)
12 Months (Premium)

Fine System:
Subscription ongoing >> Missed renewal of the book >> 50/- per day
No ongoing Subscription >> Missed renewal of the book >> 100 + 50/- per day

## /users/subscription-details/{id}
GET: Get User Subscription Detials
        >> Date of Subscription
        >> Valid Till
        >> Fine check

## /books
GET: Fetch all the books
POST: Create/Add new books

## /books/{id}
GET: Fetch a book by its ID
PUT: Updation of the book by ID

## /books/issued
GET: Fetch all the issued books

## /books/issued/withFine
GET: Fetch the issued books with fine




## npm init
## npm i nodemon --save-dev
## npm run dev