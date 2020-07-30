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
  _addAnswer,
  _upVote,
  _downVote,
  _getSignedUrl,
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

  if (!queryParams && !queryParams.id) {
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

// GET SignedUrl
async function getSignedUrl(event) {
  const params = JSON.parse(event.body);

  try {
    let url = await _getSignedUrl(params);
    return wrapResponse({ url });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// *****************
// QUESTION HANDLERS
// *****************

// ADD question
async function addQuestion(event) {
  console.log(event.body);
  const data = JSON.parse(event.body);

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }
    123;

    let result = await _addQuestion(decodedUser.id, data);
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// DELETE question
async function deleteQuestion(event) {
  const queryParams = event.queryStringParameters;

  if (!queryParams || !queryParams.id) {
    return wrapResponse(null, 400, {
      message: "Empty Parameter. Please fill all parameters.",
    });
  }

  const { id } = queryParams;

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _delete(
      "questions",
      "id",
      id,
      "user_id",
      decodedUser.id
    );
    if (result.affectedRows === 0) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. You can't delete a question you didn't ask.",
      });
    }
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// GET question
async function getQuestion(event) {
  const queryParams = event.queryStringParameters;

  if (!queryParams && (!queryParams.id || !queryParams.user_id)) {
    return wrapResponse(null, 400, {
      message: "Empty Parameter. Please fill all parameters.",
    });
  }

  const { id, user_id } = queryParams;

  try {
    if (id) {
      let question = await _get("questions", "id", id);
      let answer = await _get("answers", "question_id", id);

      if (question.length === 0) {
        return wrapResponse(null, 400, {
          message: "Not Found. Question does not exist.",
        });
      }

      return wrapResponse({ question: question[0], answer });
    } else {
      let questions = await _get("questions", "user_id", user_id);
      let answers = await _get("answers", "user_id", user_id);

      if (questions.length === 0) {
        return wrapResponse(null, 400, {
          message: "Not Found. User hasn't asked any questions",
        });
      }

      return wrapResponse({ questions, answers });
    }
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// GET all questions
async function getAllQuestions(event) {
  try {
    let questions = await _get("questions");
    if (questions.length === 0) {
      return wrapResponse(null, 400, {
        message: "Questions Not Found",
      });
    }
    return wrapResponse({ questions });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// ADD answer
async function addAnswer(event) {
  console.log(event.body);
  const data = JSON.parse(event.body);

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _addAnswer(decodedUser.id, data);
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// DELETE answer
async function deleteAnswer(event) {
  const queryParams = event.queryStringParameters;

  if (!queryParams || !queryParams.id) {
    return wrapResponse(null, 400, {
      message: "Empty Parameter. Please fill all parameters.",
    });
  }

  const { id } = queryParams;

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _delete("answers", "id", id, "user_id", decodedUser.id);
    if (result.affectedRows === 0) {
      return wrapResponse(null, 401, {
        message:
          "Unauthorized. You can't delete an answer you didn't answered.",
      });
    }
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// UPVOTE answer
async function upVote(event) {
  const queryParams = event.queryStringParameters;

  if (!queryParams || !queryParams.id) {
    return wrapResponse(null, 400, {
      message: "Empty Parameter. Please fill all parameters.",
    });
  }

  const { id } = queryParams;

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _upVote(id);
    if (result.affectedRows === 0) {
      return wrapResponse(null, 401, {
        message:
          "Unauthorized. You can't upvote an answer if you're not logged in.",
      });
    }
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// DOWNVOTE answer
async function downVote(event) {
  const queryParams = event.queryStringParameters;

  if (!queryParams || !queryParams.id) {
    return wrapResponse(null, 400, {
      message: "Empty Parameter. Please fill all parameters.",
    });
  }

  const { id } = queryParams;

  try {
    const [verified, decodedUser] = await _verifyJWT(event);

    if (!verified) {
      return wrapResponse(null, 401, {
        message: "Unauthorized. Token Error.",
      });
    }

    let result = await _downVote(id);
    if (result.affectedRows === 0) {
      return wrapResponse(null, 401, {
        message:
          "Unauthorized. You can't downvote an answer if you're not logged in.",
      });
    }
    return wrapResponse(result);
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

module.exports = {
  hello,
  register,
  login,
  getUser,
  deleteUser,
  updateUser,
  addQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestions,
  addAnswer,
  deleteAnswer,
  upVote,
  downVote,
  getSignedUrl,
};
