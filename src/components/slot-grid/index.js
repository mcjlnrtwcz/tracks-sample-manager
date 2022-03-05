import { h } from "preact";

import css from "./slot-grid.module.css";

const SlotGrid = ({children}) => (
  <div class={css.grid}>
    {children}
  </div>
);

export default SlotGrid;
