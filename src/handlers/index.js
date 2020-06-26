const {
  wrapResponse,
  generateJWT,
  verifyJWT,
  verifyPassword,
  get,
  remove,
  addUser,
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
    let user = await addUser({ fullname, email, password });
    let token = await generateJWT(user);
    return wrapResponse({ user, token });
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
    let user = await get("users", "email", email);
    if (user.length === 0) {
      return wrapResponse(null, 400, {
        message: "Not found. User does not exist.",
      });
    }

    let verified = await verifyPassword(password, user[0].password);
    if (verified) {
      let token = await generateJWT(user[0]);
      return wrapResponse({ user: user[0], token });
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
    let user = await get("users", "id", id);
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
    const [verified, decodedUser] = await verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, { message: "Unauthorized. Token Error." });
    }

    let result = await remove("users", "id", decodedUser.id);
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

export { hello, register, login, getUser, deleteUser };
