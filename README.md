[![NPM Version](https://img.shields.io/npm/v/novalogica-pcf-control?style=flat&color=%2371c1bb)](https://www.npmjs.com/package/novalogica-pcf-control)


# novalogica PCF Starter

A CLI tool to generate a new **PowerApps Component Framework (PCF)** project from a base template with customizable options.

## Features

- Quickly scaffold a new PCF control using `npx`
- Supports **field** and **dataset** component types
- Automatically renames files, updates manifest, and installs dependencies
- Works seamlessly with **React, Fluent UI, Web API**, and other libraries

## Installation

You can use the generator without installing globally:

```sh
npx novalogica-pcf-control my-pcf-component -n novalogica -c ControlName -t field
```

Or install globally:

```sh
npm install -g novalogica-pcf-control
```

Then run:

```sh
novalogica-pcf my-pcf-component -n novalogica -c ControlName -t dataset
```

## Usage

```sh
npx novalogica-pcf-control <component-name> [options]
```

### Options

| Option             | Alias | Description                                          | Default     |
|--------------------|-------|------------------------------------------------------|-------------|
| `-n, --namespace`  |       | Control namespace                                  | `novalogica`     |
| `-c, --control`   |       | Control class name                                  | `BaseControl` |
| `-t, --type`      |       | Component type (`field` or `dataset`)               | `field`     |

This will:
- Create a new PCF control in the `MyCustomControl` folder
- Rename the base control to `MyControl`
- Modify `ControlManifest.Input.xml` based on the type (`field` or `dataset`)
- Update related files (`index.ts`, `.resx`, `.pcfproj`, etc.)
- Install dependencies automatically

## Development

To contribute or modify the tool:

1. Clone the repo:
   ```sh
   git clone https://github.com/your-repo/novalogica-pcf.git
   cd novalogica-pcf
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Link the CLI locally for testing:
   ```sh
   npm link
   ```

4. Run the tool locally:
   ```sh
   novalogica-pcf test-control -c TestControl -t field
   ```

## License

This project is licensed under the **MIT License**.