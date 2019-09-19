import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import { Theme, Paper } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import ReactSelect, { OptionType } from "components/autoComplete";
import { SportsLabelsItem, getSportsLabels } from "dataAccess/api";
import { getSurvey, saveSurvey, SurveyResponse, SurveyType } from "dataAccess/surveyApi";
import { QuestionsAction } from "types/survey";
import SurveyQuestionList from "components/surveyQuestionList";
import { apiConfig } from "dataAccess/apiConfig";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1),
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",

        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        previewInfo: {
            padding: 20
        }
    }),
);

const SurveyForm = (props: RouteComponentProps) => {
    let currentCountry = "";
    let authHeader = "";
    if (props.location.state != null) {
        currentCountry = props.location.state.countrySpace;
        authHeader = props.location.state.authHeader;
    } else {
        currentCountry = apiConfig.defaultCountrySpace;
    }

    const classes = useStyles();
    const [surveys, setSurveys] = useState<SurveyResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sportsLabels, setSportsLabels] = useState<SportsLabelsItem[]>([]);
    const [sportsPreviewOptions, setSportsPreviewOptions] = useState<OptionType<number>[]>([]);
    const [selectedSport, setSelectedSport] = useState<SportsLabelsItem | null>(null);
    const [preview, setPreview] = useState<boolean>(true);
    const [surveyType, setSurveyType] = useState<SurveyType>("intro");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const isPreviewAvailable: boolean = !!sportsPreviewOptions.length && ["sport", "end"].includes(surveyType) && !isLoading;

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
        setIsLoading(true);
        getSurvey(authHeader, surveyType, currentCountry)
            .then(resp => {
                setSurveys(resp);
                setIsLoading(false);
            });
    }, [surveyType]);

    useEffect(() => {
        getSportsLabels(authHeader, currentCountry)
            .then(resp => {
                if (resp && resp.length) {
                    setSelectedSport(resp[0]);
                }
                setSportsPreviewOptions(resp.map((val => ({ value: val.sportId, label: val.sportShortName }))));
                setSportsLabels(resp);
            });
    }, [currentCountry]);

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
            saveSurvey(authHeader, surveyType, surveys, currentCountry)
                .then(resp => setSurveys(resp));
        }
    }

    const handlePreviewToggleChange = (e: React.SyntheticEvent, value: boolean) => {
        setPreview(value);
    };

    const handlePreviewSportChange = (value: {label: string; value: number}) => {
        if (value.value) {
            setSelectedSport(sportsLabels.find(item => item.sportId === value.value) || null);
        } else {
            setSelectedSport(null);
        }
    };

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
                <Grid item xs={12} hidden={!isPreviewAvailable}>
                    <Paper className={classes.previewInfo}>
                        <Typography component="p">
                            The preview functionality can be used to check how the wording of the questions turns out.
                        </Typography>
                        <Typography component="p">
                            The available keys are: [sport_adult], [sport_junior], [sport_full], [sport_full2], [sport_short], [passion_brand].
                        </Typography>
                        <FormGroup row>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={preview}
                                            onChange={handlePreviewToggleChange}
                                            value="preview"
                                            color="primary"
                                        />
                                    }
                                    label="Preview"
                                />
                            </Grid>
                            <Grid item xs={12} hidden={!preview}>
                                <FormControl fullWidth>
                                    <ReactSelect
                                        label={""}
                                        placeholder="Select a sport to preview"
                                        value={(
                                            selectedSport
                                                ? { value: selectedSport.sportId, label: selectedSport.sportShortName }
                                                : { value: 0, label: "Select a sport to preview" }
                                        )}
                                        options={sportsPreviewOptions}
                                        onChange={v => handlePreviewSportChange(v)}
                                        defaultT={0}
                                        // Workaround, but the issue lies in the ReactSelect component
                                        key={selectedSport ? selectedSport.sportId : 0}
                                    />
                                </FormControl>
                            </Grid>
                        </FormGroup>     
                    </Paper>
                </Grid>
                <SurveyQuestionList
                    questions={currentQuestions}
                    onChange={onChange}
                    baseQuestions={benchmarkQuestions}
                    selectedSportLabels={selectedSport}
                    enablePreview={isPreviewAvailable && preview}
                />
                <Button variant={"contained"} size={"large"} className={classes.fab} color={"primary"} onClick={handleSave}>
                    <SaveIcon className={classes.extendedIcon} /> Save
                </Button>

            </Grid>
        </div>
    )
}

export default withRouter(SurveyForm);
