import { Question, Answer } from "dataAccess/surveyApi";

type Action<T> = (item: T) => T;
type Change<T> = (action: Action<T>) => void;

export type QuestionsAction = Action<Question[]>;
export type QuestionsChange = Change<Question[]>;
export type QuestionAction = Action<Question>;
export type QuestionChange = Change<Question>;

export type AnswersAction = Action<Answer[]>;
export type AnswersChange = Change<Answer[]>;
export type AnswerAction = Action<Answer>;
export type AnswerChange = Change<Answer>;
