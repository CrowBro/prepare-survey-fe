import * as React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SurveyQuestionForm from "components/surveyQuestionForm";
import { Question } from "dataAccess/surveyApi";
import { QuestionsChange, QuestionAction, QuestionChange } from "types/survey";

export interface QuestionWithPreview extends Question {
    questionPreview?: string;
}

interface SurveyQuestionListItemProps {
    question: QuestionWithPreview;
    onChange: QuestionChange;
    baseQuestion: Question;
    enablePreview: boolean;
}

const SurveyQuestionListItem = (props: SurveyQuestionListItemProps) => {
    const { question, onChange, baseQuestion, enablePreview } = props;

    const [ expanded, setExpanded ] = useState(false);
    const handleExpand = () => {
        setExpanded(s => !s);
    }

    return (
        <>
            <Grid item xs={6}>
                <SurveyQuestionForm
                    key={question.id}
                    question={question}
                    expanded={expanded}
                    onExpand={handleExpand}
                    onChange={onChange}
                    editable={true}
                    enablePreview={enablePreview}
                />
            </Grid>
            <Grid item xs={6}>
                <SurveyQuestionForm
                    key={baseQuestion.id}
                    question={baseQuestion}
                    expanded={expanded}
                    onChange={() => { }}
                    onExpand={handleExpand}
                    editable={false}
                />
            </Grid>
        </>
    )
}

interface QuestionsListProps {
    questions: QuestionWithPreview[];
    onChange: QuestionsChange;
    baseQuestions: Question[];
    enablePreview: boolean;
};

const SurveyQuestionList = ({ questions, onChange, baseQuestions, enablePreview }: QuestionsListProps) => {
    const handleQuestionChange = (questionAction: QuestionAction, index: number) => {
        onChange(questions => {
            questions[index] = questionAction(questions[index]);
            return questions;
        })
    }

    return (
        <>
            { questions.map((question, index) => (
                <SurveyQuestionListItem
                    key={index}
                    question={question}
                    onChange={(action) => handleQuestionChange(action, index)}
                    baseQuestion={baseQuestions[index]}
                    enablePreview={enablePreview}
                />
            )) }
        </>
    )
}

export default SurveyQuestionList;
