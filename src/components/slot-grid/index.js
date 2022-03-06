import { useState } from "preact/hooks";

import Button from "components/button";

import css from "./slot-grid.module.css";

const ITEMS_PER_PAGE = 32;

function SlotGrid({ children }) {
  const [page, setPage] = useState(0);
  return (
    <div class={css.grid}>
      {/* For sake of simplicity it's assumed that there only two pages */}
      <Button onClick={() => setPage(1)} disabled={page === 1} customClass={`${css.pageButton} ${css.nextButton}`}>\/</Button>
      <Button onClick={() => setPage(0)} disabled={page === 0} customClass={css.pageButton}>/\</Button>
      <div class={css.contents}>
        {children.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)}
      </div>
    </div>
  );
}

export default SlotGrid;
