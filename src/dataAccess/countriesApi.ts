import axios from "axios";
import {apiConfig} from "./apiConfig";

export interface Country {
    id: number;
    name: string;
    shortName: string;
}

export const getCountries = async () => {
    const response = await axios.get<Country[]>(apiConfig.baseUrl + "/index.html");

    return response.data;
}
