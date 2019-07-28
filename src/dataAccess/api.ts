import axios from "axios";

export interface Sport {
    sportId: number;
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
