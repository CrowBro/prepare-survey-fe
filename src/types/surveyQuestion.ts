export interface Answer {
    id: number;
    text: string;
    isEnabled: boolean;
}

export interface SurveyQuestion {
    id: number;
    text: string;
    category: string;
    answers: Answer[];
}
