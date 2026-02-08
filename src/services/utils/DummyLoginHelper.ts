export const dummyLogin = (credentials: any) => {
  console.log("credentials", credentials);

  const { emailId, password } = credentials;

  if (emailId === "hospital@gmail.com" && password == "123456") {
    return {
      data: {
        userName: "Test Hospital",
        role: 2,
        email: emailId,
      },
      message: "Login Successfull",
      status: 200,
    };
  } else if (emailId === "admin@gmail.com" && password == "123456") {
    return {
      data: {
        userName: "Dr. Hitesh",
        role: 3,
        email: emailId,
      },
      message: "Login Successfull",
      status: 200,
    };
  }
  return {
    data: null,
    message: "Login Failed",
    status: 401,
  };
};
