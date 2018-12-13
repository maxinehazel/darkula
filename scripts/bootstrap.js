const path = require('path');
const os = require('os');
const fs = require('fs');

const symlinkType = os.platform() === 'win32' ? 'junction' : 'dir';

const repoPath = path.resolve(__dirname, '..');
const extensionspath = path.resolve(os.homedir(), '.vscode', 'extensions');
const disabledPath = path.join(extensionspath, 'disabled');
const bootstrapeddarkulaPath = path.join(extensionspath, 'darkula');

const commands = {
    attach() {
        if (fs.existsSync(disabledPath)) {
            return;
        }
        const darkulaDir = fs
            .readdirSync(extensionspath)
            .find(extension => extension.match(/^darkula/));
        const darkulaPath = path.join(extensionspath, darkulaDir);
        if (!fs.existsSync(disabledPath)) {
            fs.mkdirSync(disabledPath);
        }

        fs.renameSync(darkulaPath, path.join(disabledPath, darkulaDir));
        fs.symlinkSync(repoPath, bootstrapeddarkulaPath, symlinkType);
    },
    eject() {
        if (fs.existsSync(bootstrapeddarkulaPath)) {
            fs.unlinkSync(bootstrapeddarkulaPath);
        }
        if (fs.existsSync(disabledPath)) {
            const darkulaDir = fs
                .readdirSync(disabledPath)
                .find(extension => extension.match(/^darkula/));
            const darkulaPath = path.join(disabledPath, darkulaDir);

            fs.renameSync(darkulaPath, path.join(extensionspath, darkulaDir));
            fs.rmdirSync(disabledPath);
        }
    },
};

const [, , command] = process.argv;

commands[command]();
