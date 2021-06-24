# Auth API

- Users created with this, without an implicit `role: roleVariable` will be set to a `user`, with permissions limited to `/signup` and `/signin` routes, along with limited `GET` requests (**review below for details on what they can or cant do**).

## Role Capabilities:

```JavaScript
user: ['read'],
writer: ['read', 'create'],
editor: ['read', 'create', 'update'],
admin: ['read', 'create', 'update', 'delete']
```

## Route Information

### POST `/signup`
- This route adds a user to the database, with the requirements of a `username` and `password` in the `request.body` sent to the server. If role requirements are needed to be added or changed in creation, a third, optional property can be added to the `request.body` sent to the server. To see the role capabilities, review ***Role Capabilities*** above.

### POST `/signin`
- This route creates a token signed by the server and returns it to the user, given they supply the server with an authenticated `username` and `password` in the `request` sent to the server.

### GET `/users`
- This route requires not only an authenticated token from the `/signin` route, but also requires the user's role that is requesting the information to have the role capabilities to be able to `delete`. In other words, their role must be: `admin`. Given these two conditions are met, the server will send back to the client a list of the usernames registered in the database.

### GET `/secret`
- This route doesn't require any role capabilites, just that an authenticated user, who has a signed token, will receive back the string `'Welcome to the secret area'`.