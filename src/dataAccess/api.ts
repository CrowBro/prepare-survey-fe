import axios from "axios";
import { apiConfig } from "./apiConfig";

export interface Sport {
    sportId: number;
    sportDisplayId: number;
    sportName: string;
    defaultSportName: string;
    products: string[];
    passionBrand: string;
    brands: string[];
    nps2018: string;
    nps2017: string;
    noRespondents2018: number;
    noRespondents2017: number;
    videoNote: boolean;
    sportLeader: string;
    status: "To Review" | "Pending" | "Approved" | "Disabled";
}



function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));

    return JSON.parse(jsonPayload);
};

export type CountrySpace = string;

export const checkValidity = async (authHeader: string) => {
    return { status: 200, user: "asdf" };
    try {
        const response = await axios.get<string>(apiConfig.baseUrl + "/api/heartBeat/auth", {
            headers: {
                "Authorization": authHeader
            }
        })
        // console.log(response.headers);
        const headerUser = response.headers["x-user"]

        var token = authHeader.replace(/Bearer /, "");
        const user = !!headerUser
            ? headerUser
            : (!!token
                ? parseJwt(token).sub
                : "Anonymous");

        // console.log(user);

        const result = { status: response.status, user: user };

        // console.log(response);

        return result;

    } catch (err) {
        if (err.response != null && err.response.status === 401) {
            return { status: err.response.status, user: null };
        }
        throw err;
    }

}

export const getSports = async (authHeader: string, countrySpace: CountrySpace) => {
    const params = {
        year: 2020,
        country: countrySpace
    }

    const response = await axios.get<Sport[]>(apiConfig.baseUrl + "/api/sports", {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
        params: params
    })

    console.debug(response);

    return response.data;
}

export interface User {
    userId: number;
    name: string;
    email: string;
    role: string;
    countryCode: string;
}

export const getUsers = async (authHeader: string, countrySpace: CountrySpace) => {
    const params = {
        year: 2020,
        country: countrySpace
    }

    const response = await axios.get<User[]>(apiConfig.baseUrl + "/api/users", {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
        params: params
    })

    console.debug(response);

    return response.data;
}

export const checkPermissionsToViewUsers = async (authHeader: string) => {
    const response = await axios.get<any>(apiConfig.baseUrl + "/api/users/checkPermissions", {
        headers: {
            "Authorization": authHeader
        }
    });

    return response.status === 200;
}

export const saveUser = async (authHeader: string, user: User, countrySpace: string) => {
    const id = user.userId;
    const response = await axios.put<User>(`${apiConfig.baseUrl}/api/Users/${id}`, user,
        {
            headers: {
                "Authorization": authHeader,
                "X-CountrySpace": countrySpace
            },
            params: {}
        });

    return response.data;
}

export const deleteUser = async (authHeader: string, user: User, countrySpace: string) => {
    const id = user.userId;
    const response = await axios.put<User>(`${apiConfig.baseUrl}/api/Users/${id}/delete`, user,
        {
            headers: {
                "Authorization": authHeader,
                "X-CountrySpace": countrySpace
            },
            params: {}
        });

    return response.data;
}

export interface Location {
    locationId: number;
    source: string;
    name: string;
    region: string;
    countryCode: string;
    isHidden: boolean;
}

export const getLocations = async (authHeader: string, countrySpace: CountrySpace) => {
    const params = {
        year: 2020,
        country: countrySpace
    }

    const response = await axios.get<Location[]>(apiConfig.baseUrl + "/api/locations", {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
        params: params
    })

    console.debug(response);

    return response.data;
}

export const saveLocation = async (authHeader: string, location: Location, countrySpace: string) => {
    const id = location.locationId;
    const response = await axios.put<Location>(`${apiConfig.baseUrl}/api/Locations/${id}`, location,
        {
            headers: {
                "Authorization": authHeader,
                "X-CountrySpace": countrySpace
            },
            params: {}
        });

    return response.data;
}

export const switchLocationVisibility = async (authHeader: string, location: Location, countrySpace: string) => {
    const id = location.locationId;
    const response = await axios.put<Location>(`${apiConfig.baseUrl}/api/Locations/${id}/switchVisibility`, location,
        {
            headers: {
                "Authorization": authHeader,
                "X-CountrySpace": countrySpace
            },
            params: {}
        });

    return response.data;
}

export interface PassionBrand {
    id: number;
    name: string;
}

export interface SportDetails {
    passionBrand: PassionBrand;
    adultName: string;
    juniorName: string;
    fullName1: string;
    fullName2: string;
    shortName: string;
    status: "To Review" | "Pending" | "Approved" | "Disabled";
    video: string;
}

export interface SportPair {
    targetSport: SportDetails;
    benchmarkSport: SportDetails;
}

export const getSportDetails = async (authHeader: string, countrySpace: string, id: number) => {
    const response = await axios.get<SportPair>(apiConfig.baseUrl + `/api/sports/${id}/details`,
        {
            headers: {
                "Authorization": authHeader,
                "X-CountrySpace": countrySpace
            },
        }
    );

    return response.data;
}

export const saveSportDetails = async (authHeader: string, countrySpace: string, id: number, sportDetails: SportPair) => {
    await axios.put(apiConfig.baseUrl + `/api/sports/${id}/details`, sportDetails, {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
    }
    );
}

export interface ProductFamily {
    id: number;
    name: string;
}

export interface ProductCategory {
    id: number;
    name: string;
    family: ProductFamily;
    iconId: number;
    order: number;
}

interface ProductCategoryDetails {
    productCategories: ProductCategory[];
}

interface ProductsPair {
    targetDetails: ProductCategoryDetails;
    benchmarkDetails: ProductCategoryDetails;
}

export const getProductCategories = async (authHeader: string, countrySpace: string, sportId: number) => {
    const response = await axios.get<ProductsPair>(apiConfig.baseUrl + `/api/sports/${sportId}/productCategoryDetails`, {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
    }
    );

    return response.data;
}

export const saveProductCategories = async (authHeader: string, countrySpace: string, sportId: number, categories: ProductsPair) => {
    const body: ProductsPair = categories;

    await axios.put(apiConfig.baseUrl + `/api/sports/${sportId}/productCategoryDetails`, body, {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
    }
    );
}

export interface BrandCompetitor {
    id: number;
    name: string;
    history: string;
    order: number;
}

interface BrandCompetitorResponse {
    competitors: BrandCompetitor[];
}

export const getCompetitorBrands = async (authHeader: string, countrySpace: string, sportId: number) => {
    const response = await axios.get<BrandCompetitorResponse>(apiConfig.baseUrl + `/api/sports/${sportId}/brandsCompetitorDetails`,
        {
            headers: {
                "Authorization": authHeader,
                "X-CountrySpace": countrySpace
            },
        }
    );

    return response.data.competitors;
}

export const saveCompetitorBrands = async (authHeader: string, countrySpace: string, sportId: number, competitors: BrandCompetitor[]) => {
    const body: BrandCompetitorResponse = {
        competitors
    }

    await axios.put(apiConfig.baseUrl + `/api/sports/${sportId}/brandsCompetitorDetails`, body, {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
    }
    );
}

export interface SportsLabelsItem {
    sportId: number;
    sportDisplayId: number;
    adultSportName: string;
    juniorSportName: string;
    sportFullName1: string;
    sportFullName2: string;
    sportShortName: string;
    passionBrand: string;
}

export const getSportsLabels = async (authHeader: string, countrySpace: CountrySpace) => {
    const params = {
        year: 2020,
        country: countrySpace
    }

    const response = await axios.get<SportsLabelsItem[]>(apiConfig.baseUrl + "/api/sports/labels", {
        headers: {
            "Authorization": authHeader,
            "X-CountrySpace": countrySpace
        },
        params: params
    })

    return response.data;
}