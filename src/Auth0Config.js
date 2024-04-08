import { urlFrontend } from "./config";

const Ath0Config = {
    domain: "testerun.us.auth0.com",
    clientID: "qsyvSMj1lcb68hl1xJj2D0awZpi6KZuk",
    redirectUri: `${urlFrontend}Home`,
    responseType: "code token",
    scope:"openid profile email"
  };

  export default Ath0Config;