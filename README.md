# ´novalogica PCF Boilerplate

A CLI tool to generate a new **PowerApps Component Framework (PCF)** project from a base template with customizable options.

## Features

- Quickly scaffold a new PCF control using `npx`
- Supports **field** and **dataset** component types
- Automatically renames files, updates manifest, and installs dependencies
- Works seamlessly with **React, Fluent UI, Web API**, and other libraries

## Installation

You can use the generator without installing globally:

```sh
npx pcf-boilerplate my-pcf-component -c ControlName -t field
```

Or install globally:

```sh
npm install -g pcf-boilerplate
```

Then run:

```sh
pcf-boilerplate my-pcf-component -c ControlName -t dataset
```

## Usage

```sh
npx pcf-boilerplate <component-name> [options]
```

### Options

| Option             | Alias | Description                                          | Default     |
|--------------------|-------|------------------------------------------------------|-------------|
| `-c, --control`   |       | Control class name                                  | `BaseControl` |
| `-t, --type`      |       | Component type (`field` or `dataset`)               | `field`     |

### Example

```sh
npx pcf-boilerplate MyCustomControl -c MyControl -t dataset
```

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
   git clone https://github.com/your-repo/pcf-boilerplate.git
   cd pcf-boilerplate
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
   pcf-boilerplate test-control -c TestControl -t field
   ```

## License

This project is licensed under the **MIT License**.