# WE-BACKEND

Backend for the we-project (aka. NEDian's Forum)

## ⚙ Setup:

1. Make a folder `/src/config`
2. Add `index.js` and `db_config.js`
3. Run `npm install`
4. Configure AWS
5. Run `sls offline` to run locally.
6. Run `sls deploy` to deploy to AWS.

## ⚡ API Endpoints:

All response will be of similar structure as below:

```json
{
  "status": "[boolean]",
  "result": "[result_object]",
  "error": "[error_object]"
}
```

- The `result_object` will vary.
- `status` will be _true_ if request succeeds, _false_ otherwise.
- `error_object` will contain the error, if any.

### 1. POST /register

To register a user. Also logs the user in.

#### Request Body:

```json
{
  "fullname": "[full_name]",
  "email": "[email_address]",
  "password": "[password]"
}
```

### 2. POST /login

To login a user

#### Request Body:

```json
{
  "email": "[email_address]",
  "password": "[password]"
}
```

### #. GET /login?id=[id]

To get the user information
