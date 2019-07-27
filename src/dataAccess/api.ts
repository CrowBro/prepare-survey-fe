import axios from "axios";

export interface Sport {
    sportId: number;
    sportName: string;
    products: string[];
    status: number;
}

export const getSports = async () => {
    const params = {
        year: 2018,
        country: "france"
    }

    const response = await axios.get<Sport[]>("http://217.182.158.166:5000/api/sports", {
        params
    })

    return response.data;
}
