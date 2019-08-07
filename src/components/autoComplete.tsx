import * as React from "react";
import { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import Select from "react-select";
import { createStyles, emphasize, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { ValueContainerProps } from "react-select/src/components/containers";
import { ControlProps } from "react-select/src/components/Control";
import { MenuProps, NoticeProps } from "react-select/src/components/Menu";
import { MultiValueProps } from "react-select/src/components/MultiValue";
import { OptionProps } from "react-select/src/components/Option";
import { PlaceholderProps } from "react-select/src/components/Placeholder";
import { SingleValueProps } from "react-select/src/components/SingleValue";
import { ValueType } from "react-select/src/types";

export interface OptionType<TKey> {
    label: string;
    value: TKey;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: 25
        },
        input: {
            display: "flex",
            padding: 0,
            height: "auto",
        },
        valueContainer: {
            display: "flex",
            flexWrap: "wrap",
            flex: 1,
            alignItems: "center",
            overflow: "hidden",
        },
        chip: {
            margin: theme.spacing(0.5, 0.25),
        },
        chipFocused: {
            backgroundColor: emphasize(
                theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
                0.08,
            ),
        },
        noOptionsMessage: {
            padding: theme.spacing(1, 2),
        },
        singleValue: {
            fontSize: 16,
        },
        placeholder: {
            position: "absolute",
            left: 2,
            bottom: 6,
            fontSize: 16,
        },
        paper: {
            position: "absolute",
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        divider: {
            height: theme.spacing(2),
        },
    }),
);

function NoOptionsMessage<T>(props: NoticeProps<OptionType<T>>) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

type InputComponentProps = Pick<BaseTextFieldProps, "inputRef"> & HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
    return <div ref={inputRef} {...props} />;
}

function Control<T>(props: ControlProps<OptionType<T>>) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    );
}

function Option<T>(props: OptionProps<OptionType<T>>) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder<T>(props: PlaceholderProps<OptionType<T>>) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue<T>(props: SingleValueProps<OptionType<T>>) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer<T>(props: ValueContainerProps<OptionType<T>>) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue<T>(props: MultiValueProps<OptionType<T>>) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu<T>(props: MenuProps<OptionType<T>>) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

interface SelectProps<T> {
    label: string;
    placeholder?: string;
    value?: OptionType<T>;
    options: OptionType<T>[];
    onChange: (value: OptionType<T>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IntegrationReactSelect = <T extends any>(props: SelectProps<T>) => {
    const classes = useStyles();
    const theme = useTheme();

    function handleChangeSingle(value: OptionType<T>) {
        props.onChange(value);
    }

    const selectStyles = {
        input: (base: CSSProperties) => ({
            ...base,
            color: theme.palette.text.primary,
            "& input": {
                font: "inherit",
            },
        }),
    };

    return (
        <div className={classes.root}>
            <Select
                classes={classes}
                styles={selectStyles}
                inputId="react-select-single"
                TextFieldProps={{
                    label: props.label,
                    InputLabelProps: {
                        htmlFor: "react-select-single",
                        shrink: true,
                    },
                    placeholder: props.placeholder,
                }}
                options={props.options}
                components={components}
                value={props.value}
                onChange={handleChangeSingle}
                required
            />
        </div>
    );
}

export default IntegrationReactSelect;
