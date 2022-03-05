import { h } from "preact";

import SlotGrid from "./slot-grid";
import SampleSlot from "./sample-slot";

const App = () => (
  <div id="app">
    <SlotGrid>
      {/* First row */}
      <SampleSlot name={"1 BD 909"} />
      <SampleSlot name={"1 BD 808"} />
      <SampleSlot name={"1 BD 606"} />
      <SampleSlot name={"1 SD 909"} />
      <SampleSlot name={"1 BD 909"} />
      <SampleSlot name={"1 BD 808"} />
      <SampleSlot name={"1 BD 606"} />
      <SampleSlot name={"1 SD 909"} />
      {/* Second row */}
      <SampleSlot name={"2 BD 909"} />
      <SampleSlot name={"2 BD 808"} />
      <SampleSlot name={"2 BD 606"} />
      <SampleSlot name={"2 SD 909"} />
      <SampleSlot name={"2 BD 909"} />
      <SampleSlot name={"2 BD 808"} />
      <SampleSlot name={"2 BD 606"} />
      <SampleSlot name={"2 SD 909"} />
    </SlotGrid>
  </div>
);

export default App;
