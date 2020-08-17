# Description

A simple CRUD app that supports managing employees and the review process.

## Screens mockups

- Employees management screen mockup

![Employees management screen mockup](https://user-images.githubusercontent.com/3423859/90143092-24d6cf80-ddb8-11ea-80fe-8b598b2aac30.png)

- Reviews management screen mockup

![Reviews management screen mockup](https://user-images.githubusercontent.com/3423859/90144553-e9d59b80-ddb9-11ea-92eb-d17473aba4a7.png)

- Reviews management details modal

![enter image description here](https://user-images.githubusercontent.com/3423859/90145779-41c0d200-ddbb-11ea-8a5c-557fc4b7cdb0.png)

- Employee Portal - Reviews management screen

![enter image description here](https://user-images.githubusercontent.com/3423859/90146453-05da3c80-ddbc-11ea-8fc6-52cbbd7ec865.png)

- Employee Portal - Feedback modal

![enter image description here](https://user-images.githubusercontent.com/3423859/90146894-9284fa80-ddbc-11ea-8b0f-32000bd16456.png)

## Database schema

![database schema](https://user-images.githubusercontent.com/3423859/90414912-54a11280-e0eb-11ea-9279-c6a5217cacf0.png)

## API Endpoints

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b8b911e120f9eaeb16f8)

- Employees

| Name               | Endpoint          |
| ------------------ | ----------------- |
| Add employee       | POST /users/      |
| Remove employee    | DELETE /users/:id |
| Update employee    | PUT /users/:id    |
| View employee      | GET /users/:id    |
| View all employees | GET /users/       |

- Reviews

| Name                    | Endpoint                     |
| ----------------------- | ---------------------------- |
| Add review              | POST /reviews/               |
| Update employee         | PUT /reviews/:id             |
| View review by reviewee | GET /reviews?reviewee_id=:id |
| View all reviews        | GET /reviews/                |

## Technical decisions

- On the backend, I choose [featherjs](https://docs.feathersjs.com/) to quickly scaffolding the CRUD endpoints and [NeDB](https://github.com/louischatriot/nedb) as the persistent layer. All data are stored under `api/data` folder. Most logic are under these 4 files

  1.  `api/src/hooks/populate-user.js`.
  2.  `api/src/hooks/search-regex.js`.
  3.  `api/src/services/reviews/reviews.class.js`.
  4.  `api/src/services/users/users.class.js`

- On the frontend, I choose [vuejs](https://vuejs.org/) and [element-ui](https://element.eleme.io/) for their simplicity. There are 3 layers to the app: layouts, views and components.
  1.  Layouts are side-wide components that can be easily reusable by different views.
  2.  Views are page-level components, there are 2 views in this app, admin employees view and admin reviews view.
  3.  Components are the lowest building blocks and should be categorized based on their functionality under `components` folder.

## Features

- [x] CRUD API for Employees.
- [x] CRUD API for Reviews.
- [x] Admin View - Add/view employees.
- [ ] Admin View - Remove/update employees.
- [x] Admin View - Add/update performance reviews.
- [x] Admin View - Assign employees to participate in another employee's performance review.
- [ ] Employee view.
- [ ] Authentication system.
- [ ] More defensive coding in backend to guard against bad inputs.
- [ ] Testing.
- [ ] CD/CI.

# Demos

- [Admin Employees Management](https://recordit.co/0l6BTvYsBY)
- [Admin Reviews Management](https://recordit.co/9hcWvNR9Nn)
