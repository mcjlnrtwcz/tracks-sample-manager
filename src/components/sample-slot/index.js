import Box from "components/box";

import css from "./sample-slot.module.css";

const SampleSlot = ({ name }) => (
  <Box customClass={css.slot}>
    {name}
  </Box>
);

export default SampleSlot;
