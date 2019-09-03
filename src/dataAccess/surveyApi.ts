import axios from "axios";
import {apiConfig} from "./apiConfig";

export interface Answer {
    id: number;
    answerText: string;
    order: number;
    isEnabled: boolean;
}

export interface Question {
    id: number;
    questionText: string;
    noteText: string;
    order: number;
    answerCategory: string;
    answerVariants: Answer[];
}

export type SurveyType = "intro" | "sport" | "end";

export interface Survey {
    questions: Question[];
    surveyType: SurveyType;
}

export interface SurveyResponse {
    benchmarkSurvey: Survey;
    latestVersionSurvey: Survey;
}

export const getSurvey = async (surveyType: SurveyType, countrySpace: string) => {
    const params = {
        country: countrySpace,
        surveyType
    }

    const response = await axios.get<SurveyResponse>(apiConfig.baseUrl + "/api/Surveys", {
        params
    })

    return response.data;
}

export const saveSurvey = async (surveyType: SurveyType, survey: SurveyResponse, countrySpace: string) => {
    const response = await axios.put<SurveyResponse>(`${apiConfig.baseUrl}/api/Surveys`, survey, {
        params: {
            country: countrySpace,
            surveyType
        }
    });

    return response.data;
}
