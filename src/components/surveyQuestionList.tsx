import * as React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SurveyQuestionForm from "components/surveyQuestionForm";
import { Question } from "dataAccess/surveyApi";
import { QuestionsChange, QuestionAction, QuestionChange } from "types/survey";
import { SportsLabelsItem } from "dataAccess/api";

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
    questions: Question[];
    onChange: QuestionsChange;
    baseQuestions: Question[];
    selectedSportLabels: SportsLabelsItem | null;
    enablePreview: boolean;
};

const questionKeySourceMap: { [key: string]: string } = {
    "[sport_adult]": "adultSportName",
    "[sport_junior]": "juniorSportName",
    "[sport_full]": "sportFullName1",
    "[sport_full2]": "sportFullName2",
    "[sport_short]": "sportShortName",
    "[passion_brand]": "passionBrand",
};

const regexString = /\[sport_adult\]|\[sport_junior\]|\[sport_full\]|\[sport_full2\]|\[sport_short\]|\[passion_brand\]/g;

const SurveyQuestionList = ({ questions, onChange, baseQuestions, selectedSportLabels, enablePreview }: QuestionsListProps) => {
    const handleQuestionChange = (questionAction: QuestionAction, index: number) => {
        onChange(questions => {
            questions[index] = questionAction(questions[index]);
            return questions;
        })
    }

    const populateQuestionsKeys = (questions: Question[]) => {
        if (enablePreview && selectedSportLabels) {        
            return questions.map((q) => {
                const questionPreview = q.questionText.replace(
                    new RegExp(regexString),
                    // @ts-ignore
                    (match: string) => selectedSportLabels[questionKeySourceMap[match]],
                );
                return { ...q, questionPreview };
            });
        }
        return questions;
    };

    return (
        <>
            { populateQuestionsKeys(questions).map((question, index) => (
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
