export interface Answer {
    id: number;
    text: string;
}

export interface SurveyQuestion {
    id: number;
    text: string;
    category: string;
    answers: Answer[];
}
