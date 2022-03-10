import { h, Fragment } from 'preact'

import Box from "../box";

import css from "./button.module.css";

const Button = ({ children, customClass, onClick, disabled }) => (
    <button class={`${css.buttonWrapper} ${customClass}`.trim()} onClick={onClick} disabled={disabled}>
        <Box customClass={css.button}>
            {children}
        </Box>
    </button>
);

export default Button;
