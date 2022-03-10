import { h, Fragment } from 'preact'

import Box from "../box";

import css from "./sample-slot.module.css";

const SampleSlot = ({ name, onUpdate }) => (
  <Box customClass={css.slot}>
    {name}
    <label class={css.selectFile}>
      <input type="file" onChange={(event) => onUpdate(event.target.files)} />
      <Box>📂</Box>
    </label>
  </Box>
);

export default SampleSlot;
