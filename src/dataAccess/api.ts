import axios from "axios";

export interface Sport {
    sportId: number;
    sportDisplayId: number;
    sportName: string;
    products: string[];
    status: number;
}

export const getSports = async () => {
    const params = {
        year: 2019,
        country: "fr"
    }

    const response = await axios.get<Sport[]>("http://217.182.158.166:4000/api/sports", {
        params
    })

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
}

export const getSportDetails = async (id: number) => {
    const response = await axios.get<SportDetails>(`http://217.182.158.166:4000/api/sports/${id}/details`);

    return response.data;
}

export const saveSportDetails = async (id: number, sportDetails: SportDetails) => {
    await axios.put(`http://217.182.158.166:4000/api/sports/${id}/details`, sportDetails);
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

interface ProductCategoryResponse {
    productCategories: ProductCategory[];
}

export const getProductCategories = async (sportId: number) => {
    const response = await axios.get<ProductCategoryResponse>(`http://217.182.158.166:4000/api/sports/${sportId}/productCategoryDetails`);

    return response.data.productCategories;
}

export const saveProductCategories = async(sportId: number, categories: ProductCategory[]) => {
    const body: ProductCategoryResponse = {
        productCategories: categories
    }

    await axios.put(`http://217.182.158.166:4000/api/sports/${sportId}/productCategoryDetails`, body);
}

export interface BrandCompetitor {
    id: number;
    name: string;
}

interface BrandCompetitorResponse {
    competitors: BrandCompetitor[];
}

export const getCompetitorBrands = async (sportId: number) => {
    const response = await axios.get<BrandCompetitorResponse>(`http://217.182.158.166:4000/api/sports/${sportId}/brandsCompetitorDetails`);

    return response.data.competitors;
}

export const saveCompetitorBrands = async (sportId: number, competitors: BrandCompetitor[]) => {
    const body: BrandCompetitorResponse = {
        competitors
    }

    await axios.put(`http://217.182.158.166:4000/api/sports/${sportId}/brandsCompetitorDetails`, body);
}
