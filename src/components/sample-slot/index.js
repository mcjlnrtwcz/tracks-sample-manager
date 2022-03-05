import { h } from "preact";

import css from "./sample-slot.module.css";

const SampleSlot = ({name}) => (
  <div class={css.slot}>
    {name}
  </div>
);

export default SampleSlot;
