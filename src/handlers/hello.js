async function hello(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from http://zenveus.com" }),
  };
}

export const handler = hello;
