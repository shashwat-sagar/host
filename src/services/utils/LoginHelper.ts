import { useAuthStore } from "@/store/auth.store";
import { message } from "antd";
export async function loginHelper(response: any, setUser: any, navigate: any) {
  console.log("response in helper", response);
  await setUser(response, response?.token, response?.refreshToken);
  //redirector(response?.roleId, navigate);
  let transformRole = parseInt(response?.primaryRole);
  redirector(transformRole, navigate);
}

export function redirector(resData: any, navigate: any) {
  console.log("resData", resData);
  const userRole = resData || getUser()?.role;
  console.log("resData1", userRole);
  switch (parseInt(userRole)) {
    //modules wise redirection

    //Super Admin Module
    case 1:
      navigate("/auth/admin/dashboard");
      break;

    // District Nodal Module
    case 2:
      navigate("/auth/district-nodal/dashboard");
      break;

    // DEO Module
    case 3:
      navigate("/auth/deo/dashboard");
      break;

    default:
      resetAuthStore();
      navigate("/login");
      break;
  }
}

export function getUser() {
  // retrieve user from auth store, but using useAuthStore directly here causes invalid hook call
  const { user, accessToken, roleName } = useAuthStore.getState();

  if (!accessToken || !user) {
    return {
      accessToken: null,
      user: null,
      role: null,
      roleName: null,
    };
  }
  return {
    accessToken: accessToken,
    user: user,
    role: user?.role,
    roleName: roleName,
  };
}

export async function setUser(user: any) {
  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("accessToken", user?.token);
  } else {
    await resetAuthStore();
  }
}

export const resetAuthStore = async () => {
  useAuthStore.setState({
    user: null,
    accessToken: null,
    primaryRole: null,
    refreshToken: null,
    roleName: null,
  });
  console.log("logout");

  message.error("Session expired!");
  console.log("clearing");
  sessionStorage.clear();
  localStorage.clear();
  setTimeout(() => {
    message.info("Please login again...");
    window.location.replace(`${process.env.BASE_NAME}login`);
  }, 1000);
};
