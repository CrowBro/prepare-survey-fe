export const apiConfig = {
    //baseUrl: "http://localhost:4000", // when dev and no docker
    // baseUrl: "http://localhost:80", // when dev with docker
    baseUrl: "https://produits-gagnants.decathlon.fr/preparation", // when staging with docker and domain
    //baseUrl: "http://217.182.158.166:80", // when staging with docker
    //baseUrl: "http://217.182.158.166:4000", //when staging and no docker
    //countrySpace: "dev",
    defaultCountrySpace: "fr",
    authClientId: "C344d538f23aa65cec06705296f9034ce5d5e657c",
    authCallbackUrl: "http://217.182.158.166:80/api/login/callback",
    authAuthUrl: "https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2",
}
