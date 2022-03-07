import { useState } from "preact/hooks";

import SlotGrid from "./slot-grid";
import SampleSlot from "./sample-slot";

const DEFAULT_SAMPLES = new Array(64);

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    });
  };

  a.addEventListener("click", clickHandler, false);
  a.click();
}

function App() {
  const [samples, setSamples] = useState(DEFAULT_SAMPLES);

  async function convert() {
    const { createFFmpeg } = window.FFmpeg;
    const ffmpeg = await createFFmpeg({ log: true, corePath: "/assets/ffmpeg/ffmpeg-core.js", });
    await ffmpeg.load();
    const inputFileBuffer = await samples[0][0].arrayBuffer();
    const inputFileView = new Uint8Array(inputFileBuffer);
    await ffmpeg.FS("writeFile", "test.wav", inputFileView);
    await ffmpeg.run("-i", "test.wav", "test.ogg");
    const convertedFileView = await ffmpeg.FS("readFile", "test.ogg");
    downloadBlob(new Blob([convertedFileView.buffer], { type: "application/ogg" }), "test.ogg");
  }

  return (
    <div id="app">
      <button onClick={convert}>Convert</button>
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
