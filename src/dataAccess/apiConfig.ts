export const apiConfig = {
    baseUrl: "https://produits-gagnants.decathlon.fr/preparation", // when staging with docker and domain
    // baseUrl: "http://localhost:80", // when dev with docker
    //baseUrl: "https://produits-gagnants.decathlon.fr/preparation", // when staging with docker and domain
    //baseUrl: "http://217.182.158.166:80", // when staging with docker
    //baseUrl: "http://217.182.158.166:4000", //when staging and no docker
    //countrySpace: "dev",
    defaultCountrySpace: "fr", 
    authClientId: "C02192c9da610262216c2b812a5995ea5e8188505",
    authCallbackUrl: "https://produits-gagnants.decathlon.fr/preparation2/api/login/callback",
    authAuthUrl: "https://idpdecathlon.oxylane.com/as/authorization.oauth2",
}