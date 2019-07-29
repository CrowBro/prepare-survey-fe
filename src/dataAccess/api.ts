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
