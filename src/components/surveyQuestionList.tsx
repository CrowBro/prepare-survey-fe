import * as React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SurveyQuestionForm from "components/surveyQuestionForm";
import { Question } from "dataAccess/surveyApi";
import { SurveyQuestion } from "types/surveyQuestion";
import * as uuid from "uuid";

const questionMap = (question: Question): SurveyQuestion => {
    return {
        id: question.id,
        text: question.questionText,
        category: question.answerCategory,
        answers: question.answerVariants.map(answer => ({
            id: answer.id,
            text: answer.answerText,
            isEnabled: answer.isEnabled
        }))
    };
}

interface SurveyQuestionListItemProps {
    question: Question;
    baseQuestion: Question;
}

const SurveyQuestionListItem = (props: SurveyQuestionListItemProps) => {
    const { question, baseQuestion } = props;

    const [ expanded, setExpanded ] = useState(false);

    return (
        <>
            <Grid item xs={6}>
                <SurveyQuestionForm
                    key={question.id}
                    question={questionMap(question)}
                    expanded={expanded}
                    onExpand={() => setExpanded(s => !s)}
                    editable={true}
                />
            </Grid>
            <Grid item xs={6}>
                <SurveyQuestionForm
                    key={baseQuestion.id}
                    question={questionMap(baseQuestion)}
                    expanded={expanded}
                    onExpand={() => setExpanded(s => !s)}
                    editable={false}
                />
            </Grid>
        </>
    )
}

interface QuestionsListProps {
    questions: Question[];
    baseQuestions: Question[];
}

const SurveyQuestionList = ({ questions, baseQuestions }: QuestionsListProps) => {
    return (
        <>
            { questions.map((question, index) => (
                <SurveyQuestionListItem
                    key={uuid()}
                    question={question}
                    baseQuestion={baseQuestions[index]}
                />
            )) }
        </>
    )
}

export default SurveyQuestionList;
