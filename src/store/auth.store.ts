import { setRoleName } from "@/config/enum";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

type AuthState = {
  user: any;
  setUser: (
    user: any,
    accessToken: string | null,
    refreshToken: string | null
  ) => void;
  setAuthToken: (accessToken: string, refreshToken: string) => void;
  accessToken?: string | null;
  // roleId?: number | null;
  primaryRole?: number | null;
  roleName?: string | null;
  isAuthenticated?: boolean;
  refreshToken?: string | null;
  setUserRights: (data: any) => void;
};

/**
 @param user
 @param setUser
 * Creates and configures an authentication store using Zustand with devtools and persistence middleware.
 *
 * This store holds the state necessary for managing user authentication, including:
 * - user: The authenticated user's information (or null if not authenticated).
 * - roleName: A derived string that represents the user's role name.
 * - accessToken: A string token used for API authentication.
 * - refreshToken: A string token used to refresh the access token.
 * - isAuthenticated: A boolean flag indicating whether the user is authenticated.
 *
 * The store provides a method, setUser, which:
 * - Updates the authentication state with a new user.
 * - Sets the user's role name, access token, and refresh token.
 * - Marks the user as authenticated.
 *
 * State persistence is configured to use sessionStorage via a JSON storage mechanism and includes a partial
 * state selection to only persist the relevant parts of the authentication state.
 *
 * @module auth.store
 */
const useAuthStoreBase = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user, accessToken?, refreshToken?) => {
          console.log("🔐 AUTH_STORE: setUser called with:", {
            user: user,
            accessToken: accessToken ? "SET" : "NULL",
            refreshToken: refreshToken ? "SET" : "NULL",
            willAuthenticate: !!user,
          });

          const newState = {
            user,
            roleName: setRoleName(user?.primaryRole),
            accessToken: accessToken,
            refreshToken: refreshToken,
            isAuthenticated: !!user,
          };

          // console.log("🔐 AUTH_STORE: New state will be:", newState);
          set(newState);
        },
        setAuthToken: (accessToken: string, refreshToken: string) => {
          console.log("🔐 AUTH_STORE: setAuthToken called with:", {
            accessToken,
            refreshToken,
          });
          console.log(
            "current user state before setting",
            useAuthStore.getState().user
          );
          set(
            (state) => (
              console.log("current user state at setting", state.user),
              {
                user: {
                  ...state.user,
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                },
                accessToken,
                refreshToken,
              }
            )
          );
        },
        setUserRights: (data: any) => {
          console.log("AUTH_STORE: setUserRights called with:", data);
          console.log(
            "current user state before setting",
            useAuthStore.getState().user
          );
          set((state) => (
            {...state, user: { ...state.user, rights: data }}
          ))
        },
      }),
      {
        name: "auth-storage", // unique name
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          primaryRole: state.primaryRole,
          roleName: state.roleName,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

/**
 * Helper function to get auth state from sessionStorage in development mode
 */
const getSessionStorageState = (): Partial<AuthState> | null => {
  try {
    const storedData = sessionStorage.getItem("auth-storage");
    if (!storedData) return null;

    const parsed = JSON.parse(storedData);
    const state = parsed?.state;

    if (!state) return null;

    return {
      user: state.user || null,
      roleName: state.roleName || null,
      accessToken: state.accessToken || null,
      refreshToken: state.refreshToken || null,
      isAuthenticated: state.isAuthenticated || false,
      primaryRole: state.primaryRole || null,
    };
  } catch (error) {
    console.error("🔐 AUTH_STORE: Error reading from sessionStorage:", error);
    return null;
  }
};

/**
 * Custom hook that returns auth state based on environment.
 * In development mode, it reads directly from sessionStorage to avoid issues with module federation.
 * In production mode, it uses the Zustand store as normal.
 */
export const useAuthStore = (() => {
  const isDevelopment = import.meta.env.MODE === "development";

  // Create the hook function with proper overloads
  function hook(): AuthState;
  function hook<T>(selector: (state: AuthState) => T): T;
  function hook<T>(selector?: (state: AuthState) => T): T | AuthState {
    const storeState = selector
      ? useAuthStoreBase(selector)
      : useAuthStoreBase();

    // In development mode, override with sessionStorage values (only when no selector)
    if (isDevelopment && !selector) {
      const sessionState = getSessionStorageState();
      if (sessionState) {
        //console.log("🔐 AUTH_STORE: Using sessionStorage state in development mode");
        return {
          ...storeState,
          ...sessionState,
          setUser: useAuthStoreBase.getState().setUser, // Always use store's setUser
        } as AuthState;
      }
    }

    return storeState;
  }

  // Add getState method for backward compatibility
  hook.getState = () => {
    const storeState = useAuthStoreBase.getState();

    // In development mode, override with sessionStorage values
    if (isDevelopment) {
      const sessionState = getSessionStorageState();
      if (sessionState) {
        // console.log("🔐 AUTH_STORE: getState() using sessionStorage in development mode");
        return {
          ...storeState,
          ...sessionState,
        };
      }
    }

    return storeState;
  };

  // Add setState method for backward compatibility
  hook.setState = useAuthStoreBase.setState;

  // Add subscribe method for backward compatibility
  hook.subscribe = useAuthStoreBase.subscribe;

  return hook;
})();
