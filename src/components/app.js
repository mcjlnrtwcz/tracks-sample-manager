import { useState } from "preact/hooks";

import SlotGrid from "./slot-grid";
import SampleSlot from "./sample-slot";

const DEFAULT_SAMPLES = new Array(64);

function App() {
  const [samples, setSamples] = useState(DEFAULT_SAMPLES);

  return (
    <div id="app">
      <SlotGrid>
        {new Array(64)
          .fill("BD 808")
          .map((name, index) =>
            <SampleSlot
              key={index + name}
              name={`${index} ${name}`}
              onUpdate={
                (files) => setSamples((previousSamples) => Object.assign([], previousSamples, { [index]: files }))
              }
            />
          )
        }
      </SlotGrid>
    </div>
  );
}

export default App;
