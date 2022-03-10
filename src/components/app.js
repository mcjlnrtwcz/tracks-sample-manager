import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import JSZip from "jszip";

import SlotGrid from "./slot-grid";
import SampleSlot from "./sample-slot";
import Button from "./button";
import downloadBlob from "../utils/download-blob";

import css from "./app.module.css";

const DEFAULT_SAMPLES = new Array(64);
const FFMPEG_PATH = "/assets/ffmpeg/ffmpeg-core.js";

function App() {
  const [samples, setSamples] = useState(DEFAULT_SAMPLES);

  async function convert() {
    const { createFFmpeg } = window.FFmpeg;
    const ffmpeg = await createFFmpeg({ log: true, corePath: FFMPEG_PATH, });
    await ffmpeg.load();

    let zip = new JSZip();

    for (let index = 0; index < samples.length; index++) {
      const sample = samples[index];
      if (!sample) continue;
      const file = sample[0];
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

  return (
    <>
      <SlotGrid>
        {new Array(64)
          .fill("")
          .map((name, index) =>
            <SampleSlot
              key={index + name}
              name={`${index + 1} ${name}`}
              onUpdate={
                (files) => setSamples((previousSamples) => Object.assign([], previousSamples, { [index]: files }))
              }
            />
          )
        }
      </SlotGrid>
      <Button customClass={css.convertButton} onClick={convert}>Convert</Button>
    </>
  );
}

export default App;
