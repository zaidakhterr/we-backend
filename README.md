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

### 1. POST /register

To register a user

#### Request Body:

```json
{
  "fullname": "[full_name]",
  "email": "[email_address]",
  "password": "[password]"
}
```

#### Response:

```json
{
  "status": "[boolean]",
  "result": "[result_object]",
  "error": "[error_object]"
}
```
