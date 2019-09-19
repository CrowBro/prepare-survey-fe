import * as React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles({
    textGroup: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },
    typographyPadding: {
        paddingTop: "1em",
        paddingBottom: "1em",
    },
    marginTop: {
        marginTop: "72px",
    },
    iframeContainer: {
        position: "relative",
        overflow: "hidden",
        paddingTop: "56.25%",
        marginTop: "20px",
    },
    respIFrame: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: 0,
    },
})


const Help = () => {
    const classes = useStyles();
    return (
        <Container maxWidth={"lg"} className={classes.marginTop}>
            <Grid
                justify="center"
                direction="row"
                container
                spacing={2}
            >
                <Grid item lg={12}>
                    <Paper>
                        <Box component="div" className={classes.textGroup}>
                            <Typography
                                variant="h4"
                                component="h4"
                                color="primary"
                            >
                                Help
                            </Typography>
                        </Box>
                        <Divider />
                        <Box component="div" className={classes.textGroup}>
                            <Typography
                                variant="h5"
                                component="h5"
                                paragraph
                            >
                                <b><u><em>INTRO</em></u></b>
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                The purpose of this platform is to prepare and crowdsource the elements to appear in the&nbsp;
                                <Link
                                    href="https://produits-gagnants.decathlon.fr/"
                                    target="_blank"
                                >
                                    Winning Products Survey
                                </Link>
                                &nbsp;coming in october.
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                A list of sports is going to be submitted to our teammates. They will
                                be able to give their opinion on our products and the reason why they
                                would or would not recommend them to close ones. Each sport will
                                submit its own selection of emblematic products, and a list of
                                competitors for comparassing.
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                This process should be done by the end of the month. Needing reviewing:
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                className={classes.typographyPadding}
                                paragraph
                            >
                                <b>FOR NOW</b>
                            </Typography>
                            <ul>
                                <li>
                                    <Typography>
                                        <Link href="#reviewproducts">
                                            <b><u><em>REVIEWING PRODUCTS TRANSLATIONS</em></u> </b>
                                        </Link>
                                        Are the products' translations looking OK on the main table? (*SPORTS* >> "choose sport list" >> "Product Categories")
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        <Link href="#reviewbrands">
                                            <b><u><em>REVIEWING BRANDS PICKED FOR COMPARISON</em></u> </b>
                                        </Link>
                                        Are the selected competitor brands relevant in your country? (*SPORTS* >> "choose sport list" >> "Brands")
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        <Link href="#disablesport">
                                            <b><u><em>DISABLING A SPORT ALL TOGETHER</em></u> </b>
                                        </Link>
                                        Is a given sport in the list worth proposing in your country? You can disable some sports from the list (*SPORTS* >> status "disabled")
                                    </Typography>
                                </li>
                            </ul>
                            <Typography
                                variant="h6"
                                component="h6"
                                className={classes.typographyPadding}
                                paragraph
                            >
                                <b>IN A FEW DAYS</b>
                            </Typography>
                            <ul>
                                <li>
                                    <Typography>
                                        <Link href="#reviewsportsname">
                                            <b><u><em>REVIEWING SPORTS NAMES TRANSLATIONS</em></u> </b>
                                        </Link>
                                        Are the translations option accurate? (*SPORTS* >> "choose sport list" >> *click on any sport and check 1st section*)
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        <Link href="#reviewsurveyquestions">
                                            <b><u><em>REVIEWING SURVEY QUESTIONS TRANSLATIONS</em></u> </b>
                                        </Link>
                                        Are the survey questions translations accurate? (*SURVEY* >> *click on "choose survey" *)
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Divider />
                        <Box id="reviewproducts" component="div" className={classes.textGroup}>
                            <Typography
                                variant="h5"
                                component="h5"
                                paragraph
                            >
                                <b><em>REVIEWING PRODUCTS TRANSLATIONS</em></b>
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                <strong>WHERE ? </strong>
                                Under SPORTS >> Choose sport list >> Product Categories
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                On the general table, with the
                                <strong> Product Categories list </strong>
                                open, you can review on the go the different
                                translations offered for your set of products. Remember that
                                <strong> the products list itself is shared by all the countries around the world</strong>.
                                <strong> You only get to edit the local translations</strong>
                                , the product always remains the same. The translation review is meant to correcto bizarre,
                                too general or even missleading, not explicit enough translations.
                                Also, translations are country-bound, meaning that for example each
                                spanish speaking countries will each one have its set of translation:
                                that is one for Spain, one for Colombia and one for Chile.
                                When you edit Chile, you are editing only Chile's translations.
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                <strong>HOW ? </strong>
                                <strong>Click on any word in the table</strong>, and inside the sport's page
                                <strong> scroll down to "Product category details"</strong>
                                . As a reference, the french name for the product is indicated above.
                                Edit any field and <strong>Save at the bottom right</strong>
                                . To get out without saving, click on SPORTS on the top left to go to
                                the general table.
                            </Typography>
                            <Box component="div" className={classes.iframeContainer}>
                                <iframe
                                    title="Reviewing products translations"
                                    className={classes.respIFrame}
                                    src="https://www.loom.com/embed/9b8517a8d7f64655acfe38ab24ee8506"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </Box>
                        </Box>
                        <Box id="reviewbrands" component="div" className={classes.textGroup}>
                            <Typography
                                variant="h5"
                                component="h5"
                                paragraph
                            >
                                <b><em>REVIEWING BRANDS PICKED FOR COMPARISON</em></b>
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                <strong>WHERE ?</strong> Under SPORTS >> Choose sport list >> Brands
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                On the general table, with the <strong>Brands</strong> open, you can review
                                the set of competitors pre-selected. If a competitor is not present in your own
                                country, or if a different one is more active, you can either remove or change
                                a competitor from the list. NB : The maximum amount of competitors is 4, there's
                                no minimum, though we want to open the survey as much as possible. Those changes
                                are for your country only, and are made to best reflect the market you face their.
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                <strong>HOW ?</strong> Click on any brand in the table, and inside the sport's
                                page <strong>scroll down to "Brand's competitors details"</strong>. There you
                                can replace, remove or add a brand to better reflect the country's market. In
                                case of any change, the previous competitors will appear, as a reminder of the
                                history of the field. You'll notice that the text fields are predictive, so we
                                avoid listing twice the same competitor because of a typo, etc. Maximum of 4
                                fields, no minimum.
                            </Typography>
                            <Box component="div" className={classes.iframeContainer}>
                                <iframe
                                    title="Reviewing brands"
                                    className={classes.respIFrame}
                                    src="https://www.loom.com/embed/55d64cd0787f413c98653c29984ab4d0"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </Box>
                        </Box>
                        <Box id="disablesport" component="div" className={classes.textGroup}>
                            <Typography
                                variant="h5"
                                component="h5"
                                paragraph
                            >
                                <b><em>DISABLE A SPORT ALL TOGETHER</em></b>
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                If you expect your teams to have no opinion for a given sport practice, and if
                                asking opinions for this sport seems non relevant given your country, you can
                                use the "Disabled" status to remove the given sport from the suggested sports
                                list once in the survey phase.
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                Just remember that <strong>we want as many answers as we can</strong> globally,
                                regardless of the local amount of sportsmen and women provided by a given country
                                . <strong>Results are collected worldwide</strong>, so every opinion counts!
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                <strong>WHERE ?</strong> This option is available within any sport's page, at the end of the first section.
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                <strong>HOW?</strong> head to the end of the first section, STATUS >> Disabled
                            </Typography>
                            <Box component="div" className={classes.iframeContainer}>
                                <iframe
                                    title="Disabling a sport"
                                    className={classes.respIFrame}
                                    src="https://www.loom.com/embed/485e1ad76c864c9c828a7601c4a72086"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </Box>
                        </Box>
                        <Box id="reviewproducts" component="div" className={classes.textGroup}>
                            <Typography
                                variant="h5"
                                component="h5"
                                paragraph
                            >
                                <b><em>SUPPORT</em></b>
                            </Typography>
                            <Typography className={classes.typographyPadding}>
                                If you run into an issue which is not covered byt the points above, please send me a message
                                at nicolasgodon@gmail.com with "preparation" in the email's subject.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Help;