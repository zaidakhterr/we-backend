# WE-BACKEND

Backend for the we-project (aka. NEDian's Forum)

## API Endpoints

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
