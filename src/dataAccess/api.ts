import axios from "axios";
import { apiConfig } from "./apiConfig";

export interface Sport {
    sportId: number;
    sportDisplayId: number;
    sportName: string;
    products: string[];
    passionBrand: string;
    brands: string[];
    nps2018: string;
    nps2017: string;
    noRespondents2018: number;
    noRespondents2017: number;
    videoNote: boolean;
    sportLeader: string;
    status: "Approved" | "Pending" | "To Review";
}

export type CountrySpace = string;

export const getSports = async (authHeader: string, countrySpace: CountrySpace) => {
    const params = {
        year: 2019,
        country: countrySpace
    }

    const response = await axios.get<Sport[]>(apiConfig.baseUrl + "/api/sports", {
        headers: {
            "Authorization": authHeader
        },
        params: params
    })

    console.log(response);

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
    status: "Approved" | "Pending" | "To Review";
}

export interface SportPair {
    targetSport: SportDetails;
    benchmarkSport: SportDetails;
}

export const getSportDetails = async (authHeader: string, id: number) => {
    const response = await axios.get<SportPair>(apiConfig.baseUrl + `/api/sports/${id}/details`,
        {
            headers: {
                "Authorization": authHeader
            },
        }
    );

    return response.data;
}

export const saveSportDetails = async (authHeader: string, id: number, sportDetails: SportPair) => {
    await axios.put(apiConfig.baseUrl + `/api/sports/${id}/details`, sportDetails, {
        headers: {
            "Authorization": authHeader
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

export const getProductCategories = async (authHeader: string, sportId: number) => {
    const response = await axios.get<ProductsPair>(apiConfig.baseUrl + `/api/sports/${sportId}/productCategoryDetails`, {
        headers: {
            "Authorization": authHeader
        },
    }
    );

    return response.data;
}

export const saveProductCategories = async (authHeader: string, sportId: number, categories: ProductsPair) => {
    const body: ProductsPair = categories;

    await axios.put(apiConfig.baseUrl + `/api/sports/${sportId}/productCategoryDetails`, body, {
        headers: {
            "Authorization": authHeader
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

export const getCompetitorBrands = async (authHeader: string, sportId: number) => {
    const response = await axios.get<BrandCompetitorResponse>(apiConfig.baseUrl + `/api/sports/${sportId}/brandsCompetitorDetails`,
        {
            headers: {
                "Authorization": authHeader
            },
        }
    );

    return response.data.competitors;
}

export const saveCompetitorBrands = async (authHeader: string, sportId: number, competitors: BrandCompetitor[]) => {
    const body: BrandCompetitorResponse = {
        competitors
    }

    await axios.put(apiConfig.baseUrl + `/api/sports/${sportId}/brandsCompetitorDetails`, body, {
        headers: {
            "Authorization": authHeader
        },
    }
    );
}
