import Box from "../box";

import css from "./sample-slot.module.css";

const SampleSlot = ({ index, name, onUpdate }) => (
  <Box customClass={css.slot}>
    <span class={css.index}>{String(index).padStart(2, "0")}</span>
    {name}
    <label class={css.selectFile}>
      <input type="file" onChange={(event) => onUpdate(event.target.files[0])} />
      <Box>📂</Box>
    </label>
  </Box>
);

export default SampleSlot;
