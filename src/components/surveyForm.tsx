import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getSurvey, saveSurvey, SurveyResponse, SurveyType } from "dataAccess/surveyApi";
import { QuestionsAction } from "types/survey";
import SurveyQuestionList from "components/surveyQuestionList";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { apiConfig } from "dataAccess/apiConfig";

const SurveyForm = (props: RouteComponentProps) => {
    let currentCountry = "";
    if (props.location.state != null) {
        currentCountry = props.location.state.countrySpace
    } else {
        currentCountry = apiConfig.defaultCountrySpace;
    }
    
    const [surveys, setSurveys] = useState<SurveyResponse | null>(null)
    const [surveyType, setSurveyType] = useState<SurveyType>("intro");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleChange = (value: SurveyType) => {
        setSurveyType(value);
        setAnchorEl(null);
    }

    const handleClose = (value: SurveyType) => {
        setAnchorEl(null);
    }

    useEffect(() => {
        getSurvey(surveyType ,currentCountry)
            .then(resp => setSurveys(resp));
    }, [surveyType]);

    const currentSurvey = surveys && surveys.latestVersionSurvey && surveys.latestVersionSurvey.questions;
    const currentQuestions = currentSurvey || [];
    const benchmarkSurvey = surveys && surveys.benchmarkSurvey && surveys.benchmarkSurvey.questions;
    const benchmarkQuestions = benchmarkSurvey || [];

    const onChange = (onChange: QuestionsAction) => {
        setSurveys((s: SurveyResponse) => ({
            ...s,
            latestVersionSurvey: {
                ...s.latestVersionSurvey,
                questions: onChange(s.latestVersionSurvey.questions)
            }
        }));
    }

    const handleSave = () => {
        if (surveys) {
            saveSurvey(surveyType, surveys, currentCountry)
                .then(resp => setSurveys(resp));
        }
    }

    return (
        <div style={{ padding: 20, marginTop: 72 }}>
            <Grid
                container
                direction={"row"}
                justify={"center"}
                alignItems={"flex-start"}
                spacing={3}
            >
                <Grid item xs={12}>
                    <Button onClick={handleClick}>
                        Choose survey
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={!!anchorEl}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleChange("intro")}>Intro</MenuItem>
                        <MenuItem onClick={() => handleChange("sport")}>Sport</MenuItem>
                        <MenuItem onClick={() => handleChange("end")}>End</MenuItem>
                    </Menu>
                </Grid>
                <SurveyQuestionList
                    questions={currentQuestions}
                    onChange={onChange}
                    baseQuestions={benchmarkQuestions}
                />
                <Grid item xs={12}>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(SurveyForm);
