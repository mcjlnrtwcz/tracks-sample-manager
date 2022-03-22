import JSZip from "jszip";

// TODO: this path should be set in some configuration file on env variable?
const FFMPEG_PATH = "/ffmpeg/ffmpeg-core.js";

export default async function convertCompressSamples(samples) {
  const { createFFmpeg } = window.FFmpeg;
  const ffmpeg = await createFFmpeg({ log: true, corePath: FFMPEG_PATH });
  await ffmpeg.load();

  let zip = new JSZip();

  for (let index = 0; index < samples.length; index++) {
    const { file } = samples[index];
    if (!file) continue;

    // Read the file into WASM filesystem
    const inputFileBuffer = await file.arrayBuffer();
    const inputFileView = new Uint8Array(inputFileBuffer);
    await ffmpeg.FS("writeFile", file.name, inputFileView);

    // Convert the file
    const prefix = String(index).padStart(2, "0"); // e.g. 00, 01, 02...
    const withoutExtension = file.name.substr(0, file.name.lastIndexOf("."));
    const outputFilename = `${prefix} ${withoutExtension}.wav`;
    await ffmpeg.run(
      "-i",
      file.name,
      "-c:a",
      "pcm_s16le",
      "-ar",
      "48000",
      outputFilename
    );

    // Add converted file to the archive
    const convertedFileView = await ffmpeg.FS("readFile", outputFilename);
    const blob = new Blob([convertedFileView.buffer], { type: "audio/wav" });
    zip.file(outputFilename, blob);
  }

  return await zip.generateAsync({ type: "blob" });
}
