import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import JSZip from "jszip";

import SlotGrid from "./slot-grid";
import SampleSlot from "./sample-slot";
import Button from "./button";
import downloadBlob from "../utils/download-blob";

import css from "./app.module.css";

// TODO: this path should be set in some configuration file on env variable?
const FFMPEG_PATH = "/assets/ffmpeg/ffmpeg-core.js";
const DEFAULT_SAMPLE = { name: "Empty", file: null };
const DEFAULT_SAMPLES = new Array(64).fill(DEFAULT_SAMPLE);

function App() {
  const [samples, setSamples] = useState(DEFAULT_SAMPLES);
  const handleUpdate = (index, file) => {
    setSamples((previousSamples) =>
      Object.assign([], previousSamples, { [index]: { name: file.name, file } })
    );
  };

  return (
    <>
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
      {/* TODO: spinner while converting */}
      <Button customClass={css.convertButton} onClick={() => convert(samples)}>Convert</Button>
    </>
  );
}

export default App;

async function convert(samples) {
  const { createFFmpeg } = window.FFmpeg;
  const ffmpeg = await createFFmpeg({ log: true, corePath: FFMPEG_PATH, });
  await ffmpeg.load();

  let zip = new JSZip();

  for (let index = 0; index < samples.length; index++) {
    const { file } = samples[index];
    if (!file) continue;
    const inputFileBuffer = await file.arrayBuffer();
    const inputFileView = new Uint8Array(inputFileBuffer);
    await ffmpeg.FS("writeFile", file.name, inputFileView);
    const prefix = String(index).padStart(2, "0");
    const withoutExtension = file.name.substr(0, file.name.lastIndexOf("."));
    const outputFilename = `${prefix} ${withoutExtension}.wav`;
    await ffmpeg.run("-i", file.name, "-c:a", "pcm_s16le", "-ar", "48000", outputFilename);
    const convertedFileView = await ffmpeg.FS("readFile", outputFilename);
    const blob = new Blob([convertedFileView.buffer], { type: "audio/wav" });
    zip.file(outputFilename, blob);
  }

  const result = await zip.generateAsync({ type: "blob" });
  downloadBlob(result, "converted.zip");
}
