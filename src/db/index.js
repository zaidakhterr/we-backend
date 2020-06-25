const dbConfig = require("../config/db_config");
const JWTSecret = require("../config").JWT_SECRET;

const jwt = require("jsonwebtoken");
const moment = require("moment");
const bcrypt = require("bcryptjs");

const db = require("serverless-mysql")(dbConfig);

const wrapResponse = (jsonData, statusCode = 200, error = null) => {
  let response = {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify({ ...jsonData, error }),
  };
  return response;
};

const generateJWT = async user => {
  return new Promise((resolve, reject) => {
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
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

const get = async (table, field1, value1, field2, value2) => {
  let sql = "";
  let params = [];

  if (field2 && value2) {
    sql = `SELECT * FROM ${table} WHERE is_deleted = 0 AND ${field1} = ? AND ${field2} = ?`;
    params = [value1, value2];
  } else {
    sql = `SELECT * FROM ${table} WHERE is_deleted = 0 AND ${field1} = ?`;
    params = [value1];
  }

  try {
    let results = await db.query(sql, params);
    await db.end();
    return { results };
  } catch (error) {
    return { error };
  }
};

const addUser = async data => {
  let sql = `
  INSERT INTO users (fullname, email, password, created_at, updated_at)
  VALUES(?, ?, ?, ?, ?);
  `;

  let presentDate = moment().format("DD-MM-YYYY HH:mm:ss");
  const hash = await bcrypt.hash(data.password, 8);

  let params = [data.fullname, data.email, hash, presentDate, presentDate];

  try {
    await db.query(sql, params);
    await db.end();

    let results = await db.query(
      "SELECT * FROM users WHERE id=(SELECT LAST_INSERT_ID())"
    );
    await db.end();
    return { results: results[0] };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  wrapResponse,
  get,
  addUser,
};
