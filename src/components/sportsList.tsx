import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getSports, Sport } from "dataAccess/api";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/styles";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    orange: {
        backgroundColor: "#FF6633",
    }
});

const StatusChip = ({status}: {status: "Approved" | "Pending" | "To Review"}) => {
    const classes = useStyles();
    switch(status){
        case "Approved": return <Chip
                                    size="small" 
                                    color="primary" 
                                    label={status}
                                    />
        case "Pending": return <Chip 
                                  size="small" 
                                  color="default" 
                                  label={status} 
                                  />
        case "To Review": return <Chip 
                                size="small" 
                                color="secondary" 
                                label={status} 
                                className={classes.orange}/>

    }
}



const useStyles = makeStyles({
    root: {
        margin: "20px",
        padding: "20px",
        "& div": {
            margin: "20px",
            padding: "20px"
        }
    },
    header: {
        "& th": {
            color: "rgba(0, 0, 0, 0.9)",
            backgroundColor: "#F2F3F8 !important",
            fontWeight: 700,
            lineHeight: "3rem"
        }
    },
    body: {
        cursor: "pointer"
    }
})

const SportsList = (props: RouteComponentProps) => {
    const classes = useStyles();

    const [ sports, setSports ] = useState<Sport[]>([])
    useEffect(() => {
        getSports()
            .then((resp) => setSports(resp));
    }, []);

    return (
        <Paper className={classes.root}>
            <Table size="medium">
                <TableHead className={classes.header}>
                    <TableRow className={classes.header}>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Product 1</TableCell>
                        <TableCell>Product 2</TableCell>
                        <TableCell>Product 3</TableCell>
                        <TableCell>Product 4</TableCell>
                        <TableCell>Product 5</TableCell>
                        <TableCell>Product 6</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.body}>
                    {sports.map(sport => (
                        <TableRow key={sport.sportId} onClick={event => props.history.push(`/sports/${sport.sportId}`)}>
                            <TableCell>{sport.sportDisplayId}</TableCell>
                            <TableCell>{sport.sportName}</TableCell>
                            <TableCell>{sport.products[0]}</TableCell>
                            <TableCell>{sport.products[1]}</TableCell>
                            <TableCell>{sport.products[2]}</TableCell>
                            <TableCell>{sport.products[3]}</TableCell>
                            <TableCell>{sport.products[4]}</TableCell>
                            <TableCell>{sport.products[5]}</TableCell>
                            <TableCell><StatusChip status={sport.status}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withRouter(SportsList);
