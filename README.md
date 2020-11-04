# Codefort CLI

## Setup

#### 1. Install the CLI tool.

```bash
$ npm install @codefort/cf --global
```
*Depending on your system, you might need to run this command as sudo.*

#### 2. Initialize the config.

```bash
$ mkdir codefort-theme && cd codefort-theme
$ cf init
```

#### 3. Update codefort.config.json with your store URL, Theme ID, and API credentials.

#### 4. Fetch the latest theme files.
```bash
$ cf fetch
```

### Usage
Fetch the latest theme files and upload files when they are changed.
```bash
$ cf fetch
$ cf watch
```

Alternatively it's also possible to just upload or delete a single file.
```bash
$ cf upload templates/page.liquid
$ cf delete templates/page.liquid
```

*Please note that it's recommended to always run "cf fetch" every time you resume your work, as you could risk overwriting changes by other developers by making changes to outdated files.*

### Available commands

```bash
$ cf init
$ cf fetch
$ cf upload {filname}
$ cf delete {filname}
$ cf watch
```


### Updating to the latest version.

```bash
$ npm install @codefort/cf@latest --global
```
*Depending on your system, you might need to run this command as sudo.*

## Semver

Until this CLI tool reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.5.1`, and `0.5.4` will have the same API, but `0.6.0` will have breaking changes.

## License

[MIT](LICENSE)