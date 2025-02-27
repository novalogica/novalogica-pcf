#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const baseTemplatePath = path.join(__dirname, "..", "pcf-control");

program
  .argument("<appName>", "Name of the PCF component folder")
  .option("-c, --control <controlName>", "Control class name", "FieldControl")
  .option("-t, --type <type>", "Component type (field or dataset)", "field")
  .action((appName, options) => {
    const { control, type } = options;

    if(!control) {
      console.error(chalk.red(`❌ Please provide a control constructor name. Use "-c".`));
      process.exit(1);
    }

    if(!type) {
      console.error(chalk.red(`❌ Please provide a type. Use "-t" with "field" or "dataset".`));
      process.exit(1);
    }

    const newProjectPath = path.join(process.cwd(), appName);

    if (!["field", "dataset"].includes(type.toLowerCase())) {
      console.error(chalk.red(`❌ Invalid type: ${type}. Use "field" or "dataset".`));
      process.exit(1);
    }

    console.log(chalk.blue(`📁 Creating PCF project: ${appName} (Type: ${type}, Control: ${control})...`));

    try {
      fs.copySync(baseTemplatePath, newProjectPath, { overwrite: true });
    } catch (err) {
      console.error(chalk.red(`❌ Error copying base control: ${err.message}`));
      process.exit(1);
    }

    const oldControlPath = path.join(newProjectPath, "BaseControl");
    const newControlPath = path.join(newProjectPath, control);
    fs.renameSync(oldControlPath, newControlPath);

    const manifestPath = path.join(newControlPath, "ControlManifest.Input.xml");
    let manifestContent = fs.readFileSync(manifestPath, "utf8");

    manifestContent = manifestContent.replace(/constructor=".*?"/, `constructor="${control}"`);
    manifestContent = manifestContent.replace(/display-name-key=".*?"/, `display-name-key="${control}"`);

    const propertyBlock = `<property 
        name="sampleProperty" 
        display-name-key="Sample Property" 
        of-type="SingleLine.Text" 
        usage="input" 
        required="false"
      />
    `;

    const datasetBlock = `
    <data-set 
      name="dataSetGrid" 
      display-name-key="DataSetGridProperty"
    >
    </data-set>`;

    if (type === "field") {
      if (!manifestContent.includes("<property")) {
        manifestContent = manifestContent.replace(/(<control[^>]*>)/, `$1\n${propertyBlock}`);
      }
      manifestContent = manifestContent.replace(/<data-set[\s\S]*?<\/data-set>/, "");
    } else {
      if (!manifestContent.includes("<data-set")) {
        manifestContent = manifestContent.replace(/(<control[^>]*>)/, `$1\n${datasetBlock}`);
      }
      manifestContent = manifestContent.replace(/<property[\s\S]*?\/>/, "");
    }

    // Update resx file reference
    manifestContent = manifestContent.replace(/<resx path="strings\/.*?\.1033\.resx"/, `<resx path="strings/${control}.1033.resx"`);

    fs.writeFileSync(manifestPath, manifestContent);

    // Update class name in index.ts
    const indexTsPath = path.join(newControlPath, "index.ts");
    let indexTsContent = fs.readFileSync(indexTsPath, "utf8");
    indexTsContent = indexTsContent.replace(/class \w+/, `class ${control}`);
    fs.writeFileSync(indexTsPath, indexTsContent);

    // Rename strings resource file
    const stringsFolder = path.join(newControlPath, "strings");
    const resxFileOld = path.join(stringsFolder, "BaseControl.1033.resx");
    const resxFileNew = path.join(stringsFolder, `${control}.1033.resx`);
    if (fs.existsSync(resxFileOld)) {
      fs.renameSync(resxFileOld, resxFileNew);
    }

    // Rename PCF project file
    const oldPcfProjPath = path.join(newProjectPath, "pcf.pcfproj");
    const newPcfProjPath = path.join(newProjectPath, `${control}.pcfproj`);
    if (fs.existsSync(oldPcfProjPath)) {
      fs.renameSync(oldPcfProjPath, newPcfProjPath);
    }

    console.log(chalk.yellow("📦 Installing dependencies..."));
    execSync("npm install", { cwd: newProjectPath, stdio: "inherit" });

    console.log(chalk.green("PCF Project created successfully!"));
  });

program.parse(process.argv);
