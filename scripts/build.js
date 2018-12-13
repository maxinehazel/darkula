'use strict';

const path = require('path');
const fsp = require('./fsp');
const loadThemes = require('./loadThemes');

const THEME_DIR = path.join(__dirname, '..', 'theme');
const THEME_YAML_FILE = path.join(__dirname, '..', 'src', 'darkula.yml');

function toJSON(theme) {
    return JSON.stringify(theme, null, 4);
}

(async () => {
    if (!(await fsp.exists(THEME_DIR))) {
        await fsp.mkdir(THEME_DIR);
    }

    const standardTheme = await loadThemes(THEME_YAML_FILE);
    const standardThemePath = path.join(THEME_DIR, 'darkula.json');

    await Promise.all([
        fsp.writeFile(standardThemePath, toJSON(standardTheme))
    ]);
})();
