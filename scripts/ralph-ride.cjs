/* eslint-disable no-console */
'use strict';
process.on('exit', code => {
  if (code === 0 && ralphRideSettings.done) {
    console.log();
    console.log();
    console.log('\x1B[32m%s\x1B[0m', '   Ralph-ride was successful!');
    console.log();
    console.log('\x1B[32m%s\x1B[0m', '   Files created:');
    for (const file of ralphRideSettings.component.files) {
      console.log(
        '\x1B[32m%s\x1B[0m',
        `   ✔ ${(file.endsWith('.scss') ? '/styles' : '') +
          '/components/' +
          file}`
      );
    }
    console.log();
  }
  if (code === 0 && !ralphRideSettings.done) {
    console.log();
    console.log('\x1B[34m%s\x1B[0m', '   ✖ Aborted');
    console.log();
  }
});

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const prompts = require('prompts');

const dirSrcComponent = '../node_modules/@ralph/ralph-ui/components/';
const dirDestComponent = '../components/';
const dirSrcStyle = '../node_modules/@ralph/ralph-ui/styles/components/';
const dirDestStyle = '../styles/components/';
const TYPES = ['atoms', 'molecules', 'organisms', 'mixins'];
const ralphRideSettings = {
  component: null,
  type: null,
  onlyStyleFile: false,
  files: [],
  done: false
};

(async () => {
  // get all the components in @ralph/ralph-ui
  const files = await glob.sync('**/*', {
    cwd: path.resolve(__dirname, '../node_modules/@ralph/ralph-ui/components/'),
    nodir: true
  });
  const styleFiles = await glob.sync('**/*', {
    cwd: path.resolve(
      __dirname,
      '../node_modules/@ralph/ralph-ui/styles/components/'
    ),
    nodir: true
  });

  // create an array of style files
  const styles = [];
  for (const file of styleFiles) {
    const type = file.split('/')[0];
    const nameParts = file
      .split('/')[1]
      .split('.')[0]
      .split('-');
    // create the component name in camel case
    for (let i = 0; i < nameParts.length; i++) {
      nameParts[i] =
        nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
    }
    const component = nameParts.join('');
    styles.push({
      component_type: type,
      component_name: component,
      files: [file]
    });
  }

  const components = [];
  for (const file of files) {
    const type = file.split('/')[0];
    const component = file.split('/')[1];
    if (!TYPES.includes(type)) {
      continue;
    }
    // add components to components array
    if (
      !components.find(
        c => c.component_name === component && c.component_type === type
      )
    ) {
      components.push({
        component_type: type,
        component_name: component,
        files: [file]
      });
    } else {
      components.find(c => c.component_name === component).files.push(file);
    }
  }
  // promt for component type
  const responseType = await prompts({
    type: 'select',
    name: 'type',
    message: 'What type of component do you want to ralph-ride?',
    choices: TYPES.map(t => ({
      title: t.substring(0, t.length - 1).toUpperCase(),
      value: t
    })),
    initial: 1
  });
  ralphRideSettings.type = responseType.type;

  // get all the components of the selected type
  const componentNames = components
    .filter(c => c.component_type === ralphRideSettings.type)
    .map(c => {
      return { title: c.component_name, value: c.component_name };
    });

  // promt for component name
  const responseComponent = await prompts({
    type: 'select',
    name: 'name',
    message: 'What component?',
    choices: componentNames,
    initial: 1
  });
  ralphRideSettings.name = responseComponent.name;

  const component = components.find(
    c =>
      c.component_name === ralphRideSettings.name &&
      c.component_type === ralphRideSettings.type
  );
  ralphRideSettings.component = component;

  // if type not mixin ask if only style or all
  if (ralphRideSettings.type !== 'mixins') {
    const response = await prompts({
      type: 'select',
      name: 'onlystyle',
      message: 'What do you want to ralph-ride?',
      choices: [
        { title: 'Only Styling', value: true },
        { title: 'Whole Component', value: false }
      ],
      initial: 0
    });
    ralphRideSettings.onlyStyleFile = response.onlystyle;

    // remove all files from component files if only style
    if (ralphRideSettings.onlyStyleFile) {
      ralphRideSettings.component.files = [];
    }
    // add style file to component files
    const styleFile = styles.find(
      s =>
        s.component_name === ralphRideSettings.name &&
        s.component_type === ralphRideSettings.type
    );
    ralphRideSettings.component.files.push(styleFile.files[0]);
  }

  // summary of settings to be used and promt to confirm
  const response = await prompts({
    type: 'confirm',
    name: 'value',
    message: `You are about to ralph-ride a component with the following settings:
    Type: ${ralphRideSettings.type}
    Name: ${ralphRideSettings.name}
    ${
      ralphRideSettings.type !== 'mixin'
        ? 'Only Style: ' + (ralphRideSettings.onlyStyleFile ? 'Yes' : 'No')
        : ''
    }
    Is this correct?`
  });

  if (!response.value) {
    process.exit(0);
  }

  // get the component files with selected type and name and create the new files
  for (const file of ralphRideSettings.component.files) {
    const src = path.resolve(
      __dirname,
      file.endsWith('.scss') ? dirSrcStyle : dirSrcComponent,
      file
    );
    const dest = path.resolve(
      // path to the new file in the project
      __dirname,
      file.endsWith('.scss') ? dirDestStyle : dirDestComponent,
      file
    );
    // create directory if it doesn't exist
    if (!fs.existsSync(path.dirname(dest))) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
    }
    // copy file
    fs.copyFile(src, dest, err => {
      if (err) {
        console.log(
          '\x1B[31m%s\x1B[0m',
          'Something went wrong while generating files',
          err
        );
        // exit with error
        process.exit(1);
      }
    });
    ralphRideSettings.done = true;
  }
})();
