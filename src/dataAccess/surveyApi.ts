import axios from "axios";

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

export interface Survey {
    questions: Question[];
    surveyType: "intro" | "sport" | "end";
}

export interface SurveyResponse {
    benchmarkSurvey: Survey;
    latestVersionSurvey: Survey;
}

export const getSurvey = async () => {
    const params = {
        country: "dev",
        surveyType: "intro"
    }

    const response = await axios.get<SurveyResponse>("http://217.182.158.166:4000/api/Surveys", {
        params
    })

    return response.data;
}
