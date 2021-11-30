# Requirements

## Functional requirements
 - [x] ~~Admins should be able to register users~~.
 - [x] ~~Admins should be able to edit users~~.
 - [x] ~~Admins should be able to remove users~~.
 - [x] Users must have a role.
 - [ ] Roles must have permissions.
 - [ ] Users with right permissions should be able to register users.
 - [ ] Users with right permissions should be able to edit users.
 - [ ] Users with right permissions should be able to remove users.
 - [ ] An email must be sent for new users to access their accounts.
 - [ ] Users must have a password.

## Non-functional requirements
 - [x] NestJS.
 - [x] Prisma.
 - [x] PostgresSQL.
 - [x] Token JWT for auth.
 - [ ] BCrypt for hashing passwords.
 - [ ] Must have a defaut admin user seed.

## Business rules
 - [x] ~~Must be authenticated to manage users~~.
 - [x] ~~Only admins should be able to manage users~~.
 - [x] Emails must be unique between users.
 - [ ] Passwords must have at least 8 digits, be composed by numbers, words and symbols.

 - #### __Must have specific permissions for specific actions:__
   - [ ] For managing users, must have 'manage_user' permission.
