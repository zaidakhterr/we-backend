# WE-BACKEND

Backend for the we-project (aka. NEDian's Forum)

## ⚙ Setup:

1. Make a folder `/src/config`
2. Add `index.js` and `db_config.js`
3. Run `npm install`
4. Configure AWS
5. Run `sls offline` to run locally.
6. Run `sls deploy` to deploy to AWS.

# ⚡ API Endpoints:

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

## 📢 Public Endpoints

These endpoints can be accessed by any user.

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

### 3. GET /user?id=[id]

To get the user information

### 4. GET /question?id=[id]

To get the question by **question_id**

### 5. GET /question?user_id=[user_id]

To get the questions by **user_id**

### 6. GET /answer?question_id=[id]

To get answer by **question_id**

### 7. GET /answer?user_id=[user_id]

To get answer by **user_id**

### 8. POST /getSignedUrl

To get a signed URL for uploading images to s3 bucket.

<hr/>

## 🔏 Private Endpoints

These endpoints require a valid token.

### 1. DELETE /user

Delete the user making the request.

### 2. PUT /user

To update a user.

#### Request Body:

All fields are nessecary here. Pass new(updated) value in field that is to be updated. Keep the rest of the fields the same.

```json
{
  "fullname": "[full_name]",
  "email": "[email_address]",
  "description": "[description]",
  "image": "[image_url]"
}
```

### 3. POST /question

To ask a new question.

#### Request Body:

Here.the question will be a _string_ , the description will be the _stringified_ **JSON Object** we get from the text editor(_Slate.js_) and the tags will be a _stringified_ array of tags.

```json
{
  "question": "[question]",
  "description": "[description]",
  "tags": "[tags]"
}
```

### 4. DELETE /question?id=[id]

To delete a question.

### 4. POST /answer

To answer a question.

### Request Body:

Here. the question*id will be a number and the answer will be a \_string*

```json
{
  "question_id": [question_id],
  "answer": "[answer]"
}
```

### 5. DELETE /answer?id=[id]

To delete an answer.

### 6. GET /upvote?id=[id]

To upvote an answer.

### 7. GET /downvote?id=[id]

To downvote an answer.
