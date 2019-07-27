export interface Answer {
    id: number;
    text: string;
}

export interface SurveyQuestion {
    id: number;
    text: string;
    answers: Answer[];
}
