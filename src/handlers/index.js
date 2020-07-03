const {
  wrapResponse,
  _generateJWT,
  _verifyJWT,
  _verifyPassword,
  _get,
  _delete,
  _addUser,
  _updateUser,
  _addQuestion,
} = require("../db");

// Dummy handler
async function hello(event, context) {
  console.log({ event, context });
  return wrapResponse({ status: true, message: "Hello World" });
}

// *************
// AUTH HANDLERS
// *************

// Register
async function register(event) {
  const data = JSON.parse(event.body);
  const { fullname, email, password } = data;

  if (!fullname || !email || !password) {
    return wrapResponse(null, 400, {
      message: "Empty Fields. Please fill all fields",
    });
  }

  try {
    let user = await _addUser({ fullname, email, password });
    let token = await _generateJWT(user);

    let userObj = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      image: user.image,
      description: user.description,
      updated_at: user.updated_at,
    };
    return wrapResponse({ user: userObj, token });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// Login
async function login(event) {
  const data = JSON.parse(event.body);
  const { email, password } = data;

  if (!email || !password) {
    return wrapResponse(null, 400, {
      message: "Empty Fields. Please fill all fields",
    });
  }

  try {
    let user = await _get("users", "email", email);
    if (user.length === 0) {
      return wrapResponse(null, 400, {
        message: "Not found. User does not exist.",
      });
    }

    let verified = await _verifyPassword(password, user[0].password);

    let userObj = {
      id: user[0].id,
      email: user[0].email,
      fullname: user[0].fullname,
      image: user[0].image,
      description: user[0].description,
      updated_at: user[0].updated_at,
    };

    if (verified) {
      let token = await _generateJWT(user[0]);
      return wrapResponse({ user: userObj, token });
    }

    return wrapResponse(null, 400, {
      message: "Incorrect password. Please enter correct password.",
    });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// *************
// USER HANDLERS
// *************

// GET user with id
async function getUser(event) {
  const queryParams = event.queryStringParameters;

  if (!queryParams || !queryParams.id) {
    return wrapResponse(null, 400, {
      message: "Empty Parameter. Please fill all parameters.",
    });
  }

  const { id } = queryParams;

  try {
    let user = await _get("users", "id", id);
    if (user.length === 0) {
      return wrapResponse(null, 400, {
        message: "Not Found. User does not exist.",
      });
    }

    let userObj = {
      email: user[0].email,
      fullname: user[0].fullname,
      image: user[0].image,
      description: user[0].description,
    };

    return wrapResponse({ user: userObj });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// DELETE user
async function deleteUser(event) {
  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _delete("users", "id", decodedUser.id);
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// UPDATE user
async function updateUser(event) {
  const data = JSON.parse(event.body);

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _updateUser(decodedUser.id, data);
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// *****************
// QUESTION HANDLERS
// *****************

// ADD question
async function addQuestion(event) {
  const data = JSON.parse(event.body);

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _addQuestion(decodedUser.id, data);
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

export { hello, register, login, getUser, deleteUser, updateUser, addQuestion };
