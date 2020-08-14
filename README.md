# Description
A simple CRUD app that supports managing employees and the review process.

## Screens mockups
* Employees management screen mockup

![Employees management screen mockup](https://user-images.githubusercontent.com/3423859/90143092-24d6cf80-ddb8-11ea-80fe-8b598b2aac30.png)

* Reviews management screen mockup

![Reviews management screen mockup](https://user-images.githubusercontent.com/3423859/90144553-e9d59b80-ddb9-11ea-92eb-d17473aba4a7.png)

* Reviews management details modal

![enter image description here](https://user-images.githubusercontent.com/3423859/90145779-41c0d200-ddbb-11ea-8a5c-557fc4b7cdb0.png)

* Employee Portal - Reviews management screen

![enter image description here](https://user-images.githubusercontent.com/3423859/90146453-05da3c80-ddbc-11ea-8fc6-52cbbd7ec865.png)

* Employee Portal - Feedback modal

![enter image description here](https://user-images.githubusercontent.com/3423859/90146894-9284fa80-ddbc-11ea-8b0f-32000bd16456.png)

## Database schema
![database schema](https://user-images.githubusercontent.com/3423859/90150266-73886780-ddc0-11ea-959e-1cf350d559c3.png)

## API Endpoints
* Employees

| Name | Endpoint |
|-|-|
| Add employee | POST /users/ |
| Remove employee | DELETE /users/:id |
| Update employee | PUT /users/:id |
| View employee | GET /users/:id |
| View all employees | GET /users/ |


* Reviews

| Name | Endpoint |
|-|-|
| Add review | POST /reviews/ |
| Update employee | PUT /reviews/:id |
| View review by reviewee | GET /reviews?reviewee_id=:id |
| View all reviews | GET /reviews/ |


# Logs
* 2020/08/13: Add mockups, schema. (1 hour).
* 2020/08/14: Add employees API endpoints.