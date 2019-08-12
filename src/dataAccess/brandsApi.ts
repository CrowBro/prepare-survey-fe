import axios from "axios";
import { apiConfig } from "./apiConfig";
import { memoize } from "lodash";

export interface Brand {
    id: number;
    name: string;
}

const getBrandsApi = async () => {
    const response = await axios.get<Brand[]>(`${apiConfig.baseUrl}/api/Sports/lookupBrand`);

    return response.data;
}

export const getBrands = memoize(getBrandsApi);
