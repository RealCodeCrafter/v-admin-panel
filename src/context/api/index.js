// import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// const baseQuery = async (args, api, extraOptions) => {
//   const { dispatch } = api;
//   const rawBaseQuery = fetchBaseQuery({
//     baseUrl: "https://bot.valescooil.com/",
//     // baseUrl: "https://tj.valescooil.com/ru-tj/",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("x-auth-token");
//       if (token) {
//          headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   });

//   const result = await rawBaseQuery(args, api, extraOptions);

//   if (result.error) {
//     const { status } = result.error;
//     if (status === 401 || status === 403) {
//       console.error("Unauthorized access - Redirecting to login...");
//     }
//   }
//   return result;
// };

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

// export const api = createApi({
//   reducerPath: "myApi",
//   baseQuery: baseQueryWithRetry,
//   tagTypes: ["User", "Dashboard","Clients","Codes","Profile","Gifts"],
//   endpoints: () => ({}),
// });


import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => {
  const botBaseUrl = localStorage.getItem("bot-base-url");
  if (!botBaseUrl) {
    return null;
  }
  let cleanUrl = botBaseUrl.trim();
  return cleanUrl.endsWith("/") ? cleanUrl : `${cleanUrl}/`;
};

const createDynamicBaseQuery = () => {
  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    return fetchBaseQuery({
      baseUrl: "https://bot.valescooil.com/",
      prepareHeaders: (headers) => {
        const token = localStorage.getItem("x-auth-token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });
  }

  return fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("x-auth-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
};

// BASE QUERY WRAPPER
const baseQuery = async (args, api, extraOptions) => {
  const botBaseUrl = localStorage.getItem("bot-base-url");

  // Agar bot URL bo'lmasa, login sahifaga yuborish
  if (!botBaseUrl) {
    console.warn("Bot base URL topilmadi. Login sahifaga o'tkazilmoqda...");
    window.location.href = "/login";
    return { error: { status: 401, data: "Bot URL topilmadi" } };
  }

  const rawBaseQuery = createDynamicBaseQuery();
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error) {
    const status = result.error.status;

    if (status === 401 || status === 403) {
      console.warn("Token eskirdi yoki ruxsat yo'q. Login sahifaga o'tkazilmoqda...");

      // ✅ tokenni va URL'ni tozalash
      localStorage.removeItem("x-auth-token");
      localStorage.removeItem("bot-base-url");

      // ✅ login sahifaga yuborish
      window.location.href = "/login";
    }
  }

  return result;
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: "myApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["User", "Dashboard", "Clients", "Codes", "Profile", "Gifts"],
  endpoints: () => ({}),
});
