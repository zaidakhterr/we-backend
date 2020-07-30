const dbConfig = require("../config/db_config");
const JWTSecret = require("../config").JWT_SECRET;

const jwt = require("jsonwebtoken");
const moment = require("moment");
const bcrypt = require("bcryptjs");

const db = require("serverless-mysql")({ config: dbConfig });

// Wrap the result of all handlers with this function
function wrapResponse(jsonData = null, statusCode = 200, error = undefined) {
  if (error) {
    console.log("ERROR ===>>>", error);
  }

  let response = {
    statusCode:
      error && error.code && error.code === "ER_DUP_ENTRY" ? 400 : statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify({
      status: error === undefined,
      result: { ...jsonData },
      error,
    }),
  };
  return response;
}

// Generate Json Web Token
// returns: token or throws error
async function _generateJWT(user) {
  try {
    let token = jwt.sign(
      {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
      JWTSecret,
      { expiresIn: 60 * 60 * 24 * 365 }
    );
    return token;
  } catch (error) {
    throw error;
  }
}

// Verify Json Web Token
// returns: An array, [isVerified, decodedUser]
async function _verifyJWT(event) {
  let token = event.headers.Authorization
    ? event.headers.Authorization.replace("Bearer ", "")
    : null;

  if (!token) return [false, undefined];

  try {
    const decodedUser = jwt.verify(token, JWTSecret);
    return [true, decodedUser];
  } catch (error) {
    return [false, undefined];
  }
}

// Verify Password
// returns: A boolean specifying if password is verified or not
async function _verifyPassword(password, hash) {
  try {
    const verified = await bcrypt.compare(password, hash);
    return verified;
  } catch (error) {
    throw error;
  }
}

// Get results from any table. Can quey with 1 or 2 fields. Pass only table name to get all entries.
// returns: array of results or throws error
async function _get(
  table,
  field1 = undefined,
  value1 = undefined,
  field2 = undefined,
  value2 = undefined
) {
  let sql = "";
  let params = [];

  if (!field1 && !value1) {
    sql = `SELECT * FROM ${table} ORDER BY updated_at DESC`;
  } else if (field2 && value2) {
    sql = `SELECT * FROM ${table} WHERE ${field1} = ? AND ${field2} = ?`;
    params = [value1, value2];
  } else {
    sql = `SELECT * FROM ${table} WHERE ${field1} = ?`;
    params = [value1];
  }

  try {
    let results = await db.query(sql, params);
    await db.end();
    return results;
  } catch (error) {
    throw error;
  }
}

// Delete any entry from the DB. Works similarly as get()
async function _delete(table, field1, value1, field2, value2) {
  let sql = "";
  let params = [];

  if (field2 && value2) {
    sql = `DELETE FROM ${table} WHERE ${field1} = ? AND ${field2} = ?`;
    params = [value1, value2];
  } else {
    sql = `DELETE FROM ${table} WHERE ${field1} = ?`;
    params = [value1];
  }

  try {
    let results = await db.query(sql, params);
    await db.end();
    return results;
  } catch (error) {
    throw error;
  }
}

// Insert user to the users table
// returns: Object of the user inserted or throws error
async function _addUser(data) {
  let sql = `
  INSERT INTO users (fullname, email, password, created_at, updated_at)
  VALUES(?, ?, ?, ?, ?);
  `;

  let presentDate = moment().format();

  const hash = await bcrypt.hash(data.password, 8);

  let params = [data.fullname, data.email, hash, presentDate, presentDate];

  try {
    await db.query(sql, params);
    await db.end();

    let results = await db.query(
      "SELECT * FROM users WHERE id=(SELECT LAST_INSERT_ID())"
    );
    await db.end();
    return results[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Update details of user provided with user id
// returns: Object of updated user
async function _updateUser(id, data) {
  console.log(data);
  let sql =
    "UPDATE users SET fullname = ?, email = ?, image = ?, description = ?, updated_at = ? WHERE id = ?";
  let params = [
    data.fullname,
    data.email,
    data.image,
    data.description,
    moment().format(),
    id,
  ];

  try {
    await db.query(sql, params);
    await db.end();

    let updatedUser = await _get("users", "id", id);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Insert question to the questions table
// returns: Object of the question inserted or throws error
async function _addQuestion(user_id, data) {
  let sql = `
  INSERT INTO questions (user_id, question, description, tags, created_at, updated_at)
  VALUES(?, ?, ?, ?, ?, ?);
  `;

  let presentDate = moment().format();

  let params = [
    user_id,
    data.question,
    data.description,
    data.tags,
    presentDate,
    presentDate,
  ];

  try {
    await db.query(sql, params);
    await db.end();

    let results = await db.query(
      "SELECT * FROM questions WHERE id=(SELECT LAST_INSERT_ID())"
    );
    await db.end();
    return results[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Insert answers to the answers table
// returns: Object of the answer inserted or throws error
async function _addAnswer(user_id, data) {
  let sql = `
  INSERT INTO answers (question_id, user_id, answer, up_vote, down_vote, created_at, updated_at)
  VALUES(?, ?, ?, ?, ?, ?, ?);
  `;

  let presentDate = moment().format();

  let params = [
    data.question_id,
    user_id,
    data.answer,
    0,
    0,
    presentDate,
    presentDate,
  ];

  try {
    await db.query(sql, params);
    await db.end();

    let results = await db.query(
      "SELECT * FROM answers WHERE id=(SELECT LAST_INSERT_ID())"
    );
    await db.end();
    return results[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// upvote answer
async function _upVote(answer_id) {
  let sql = `
  UPDATE answers SET up_vote = up_vote + 1 WHERE id = ?;
  `;

  let params = [answer_id];

  try {
    let result = await db.query(sql, params);
    await db.end();

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// downvote answer
async function _downVote(answer_id) {
  let sql = `
  UPDATE answers SET down_vote = down_vote - 1 WHERE id = ?;
  `;

  let params = [answer_id];

  try {
    let result = await db.query(sql, params);
    await db.end();

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Insert comments in the comments table
// returns: Object of the comment inserted or throws error
async function _addComments(user_id, data) {
  let sql = `
  INSERT INTO comments (question_id, user_id, comment, created_at, updated_at)
  VALUES(?, ?, ?, ?, ?);
  `;

  let presentDate = moment().format();

  let params = [
    question_id,
    user_id,
    data.comment,
    presentDate,
    presentDate,
  ];

  try {
    await db.query(sql, params);
    await db.end();

    let results = await db.query(
      "SELECT * FROM comments WHERE id=(SELECT LAST_INSERT_ID())"
    );
    await db.end();
    return results[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  wrapResponse,
  _generateJWT,
  _verifyJWT,
  _verifyPassword,
  _get,
  _delete,
  _addUser,
  _updateUser,
  _addQuestion,
  _addAnswer,
  _upVote,
  _downVote,
  _addComments,
};
