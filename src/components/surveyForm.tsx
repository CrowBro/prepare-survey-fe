import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getSurvey, SurveyResponse, SurveyType } from "dataAccess/surveyApi";
import SurveyQuestionList from "components/surveyQuestionList";

const SurveyForm = () => {
    const [ surveys, setSurveys ] = useState<SurveyResponse | null>(null)
    const [ surveyType, setSurveyType ] = useState<SurveyType>("intro");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ anchorEl, setAnchorEl ] = useState<any>(null);

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
        getSurvey(surveyType)
            .then(resp => setSurveys(resp));
    }, [surveyType]);

    const currentSurvey = surveys && surveys.latestVersionSurvey && surveys.latestVersionSurvey.questions;
    const currentQuestions = currentSurvey || [];
    const benchmarkSurvey = surveys && surveys.benchmarkSurvey && surveys.benchmarkSurvey.questions;
    const benchmarkQuestions = benchmarkSurvey || [];

    return (
        <div style={{ padding: 20,  marginTop: 82}}>
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
                    baseQuestions={benchmarkQuestions}
                />
            </Grid>
        </div>
    )
}

export default SurveyForm;
