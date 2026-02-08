import { message } from "antd";
import axios from "axios";
import { resetAuthStore } from "./utils/LoginHelper";
import { useAuthStore } from "@/store/auth.store";
import config from "./config";
let isRefreshing = false;

type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
};

let failedQueue: FailedQueueItem[] = [];

export const forceLogout = async () => {
  await resetAuthStore();
  message.info("Session Expired!");
  console.log("................force logout.......................");
};
export const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const attachAuthHeader = async (apiInstance: any) => {
  apiInstance.interceptors.request.use(async function (config: any) {
    let { accessToken } = useAuthStore.getState();
    // const token = accessToken || localStorage.getItem("token");
    const token = accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

export const attachAuthInterceptor = (apiInstance: any) => {
  try {
    apiInstance.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          let { refreshToken, accessToken } = useAuthStore.getState();
          console.log("Current Token on Interceptor: ", accessToken);
          console.log("Current Refresh Token on Interceptor: ", refreshToken);
          if (!accessToken || !refreshToken) {
            console.warn("No token or refresh token found! Logging out...");
            forceLogout();
            return Promise.reject(error);
          }
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((accessToken) => {
                originalRequest.headers[
                  "Authorization"
                ] = `Bearer ${accessToken}`;
                return apiInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }
          isRefreshing = true;

          try {
            console.log("Refreshing token...");
            // const {data} = await refreshTokenApi({
            //   authToken: token,
            //   refreshToken: refreshToken,
            // });
            const response = await axios.post(
              `${config.BASE_URL}/Authentication/refreshtoken`,
              {
                authToken: accessToken,
                refreshToken: refreshToken,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );

            console.log("Refresh Response: ", response);

            const newToken = response.data.authToken;
            const newRefreshToken = response.data.refreshToken;
            console.log(
              "=================SETTING NEW TOKEN & R-TOKEN -> LOCAL STORAGE============================"
            );

            useAuthStore.getState().setAuthToken(newToken, newRefreshToken);
            apiInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            message.success("Session Refreshed!");
            return apiInstance(originalRequest);
          } catch (err) {
            processQueue(err, null);
            // message.error("Error Refreshing the Session!");
            forceLogout();
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }

          // ----------------OLD---------------------------------
          // console.warn("Forbidden! Logging out...");
          // await resetAuthStore();
        }

         if (error.response?.status === 403) {
          console.warn("Forbidden! Logging out...");
          forceLogout();
        }

        return Promise.reject(error);
      }
    );
  } catch (error) {
    console.log("Interceptor error", error);
  }
};
