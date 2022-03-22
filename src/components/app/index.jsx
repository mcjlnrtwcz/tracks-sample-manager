import { useState } from "preact/hooks";

import SlotGrid from "../slot-grid";
import SampleSlot from "../sample-slot";
import Button from "../button";
import downloadBlob from "../../utils/download-blob";
import convertCompressSamples from "../../utils/convert-compress-samples";

import css from "./app.module.css";

const DEFAULT_SAMPLE = { name: "Empty", file: null };
const DEFAULT_SAMPLES = new Array(64).fill(DEFAULT_SAMPLE);

function App() {
  const [samples, setSamples] = useState(DEFAULT_SAMPLES);
  const [loading, setLoading] = useState(false);

  const handleUpdate = (index, file) => {
    setSamples((previousSamples) =>
      Object.assign([], previousSamples, { [index]: { name: file.name, file } })
    );
  };

  const handleDownload = () => {
    setLoading(true);
    convertCompressSamples(samples)
      .then((archive) => downloadBlob(archive, "samples.zip"))
      // TODO: .catch - handle error
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <div class={css.spinner} />}
      <div class={css.app}>
        <SlotGrid>
          {samples.map((sample, index) =>
            <SampleSlot
              key={`${index}-${sample.name}`}
              index={index}
              name={sample.name}
              onUpdate={(newSample) => handleUpdate(index, newSample)}
            />)
          }
        </SlotGrid>
        {/* TODO: this should disable all the inputs */}
        <Button customClass={css.button} onClick={handleDownload}>
          {loading ? "..." : "Download"}
        </Button>
      </div>
    </>
  );
}

export default App;
