import axios from "axios";

export interface Country {
    id: number;
    name: string;
    shortName: string;
}

export const getCountries = async () => {
    const response = await axios.get<Country[]>("http://217.182.158.166:4000/index.html");

    return response.data;
}
