interface Config {
  BASE_NAME: string;
  BASE_URL: string;
}

let config: Config;

// switch (process.env.MODE) {
//   case "production":
//     config = {
//       BASE_NAME: process.env.BASE_NAME || "/",
//       BASE_URL: process.env.BASE_URL || "",
//       APPLICATION_URL : process.env.APPLICATION_URL || "",
//       CAPTCHA_URL: process.env.CAPTCHA_URL || "",
//       STORE_URL: process.env.STORE_URL || "",
//       MODE: "production",
//       DEBUG: false,
//     };
//     break;

//   case "testing":
//     config = {
//       BASE_NAME: process.env.BASE_NAME || "/",
//       BASE_URL: process.env.BASE_URL || "",
//       APPLICATION_URL : process.env.APPLICATION_URL || "",
//       CAPTCHA_URL: process.env.CAPTCHA_URL || "",
//       STORE_URL: process.env.STORE_URL || "",
//       MODE: "testing",
//       DEBUG: process.env.DEBUG === 'true',
//     };
//     break;

//   case "development":
//   default:
//     config = {
//       BASE_NAME: process.env.BASE_NAME || "/",
//       BASE_URL: process.env.BASE_URL || "",
//       APPLICATION_URL : process.env.APPLICATION_URL || "",
//       CAPTCHA_URL: process.env.CAPTCHA_URL || "",
//       STORE_URL: process.env.STORE_URL || "",
//       MODE: "development",
//       DEBUG: process.env.DEBUG === 'true',
//     };
//     break;
// }

config = {
      BASE_NAME: "/",
      BASE_URL: "https://sdmcare.com/hospitalmainapi/api",
    };
console.log("Configuration loaded:", config);

export default config;
