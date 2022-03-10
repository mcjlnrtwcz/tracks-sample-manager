import { h, Fragment } from 'preact'

import css from "./box.module.css";

const Box = ({ children, customClass }) => (
    <div class={`${css.box} ${customClass}`.trim()}>
        {children}
    </div>
);

export default Box;
