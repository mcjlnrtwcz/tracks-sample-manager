# Novation Circuit Tracks Sample Manager

The purpose of this project is to provide an easy way to prepare samples for Novation Circuit Tracks groovebox. The device is known to have problems with SD card compatibility, thus users need to manage the samples manually instead using provided Components software.

**Planned features:**
* drag'n'drop samples into slots on the grid from your drive,
* (optionally) move samples around and preview them,
* save and load intermediate state (e.g. in case of failure during the process),
* (optionally) warn about stereo files,
* convert audio files to format used by Tracks,
* name files in regard to their position on the grid and generate a `.zip` file than be unpacked onto the SD card manually.

**Disclaimer:** this is a hobby, fan-made project, no support is provided. I'm just another Tracks user that is looking to make their sample management bit more straightforward.

## CLI Commands

``` bash
# install dependencies
npm install

# build for development (with watch)
npm run dev

# build for production with minification
npm run build

# serve at localhost:8080 (run along with `dev`)
npm run serve

# run tests with jest and enzyme
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
