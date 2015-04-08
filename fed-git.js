var commands = {
    "init"      : "git init",
    "clone"     : "git clone",
    "status"    : "git status",
    "checkout"  : "git checkout",
    "branch"    : "git branch",
    "merge"     : "git merge",
    "commit"    : "git commit",
    "push"      : "git push",
    "add"       : "git add",
    "stash"     : "git stash"
};
/**
 * Name of the fed module
 * @type {string}
 */
exports.name = "node-fed-git";

/**
 * Test if the command start with main git command
 *
 * @param {String} command Command to run
 * @param {Object} dir Directory information
 * @returns {boolean}
 */
exports.canDo = function canDoGitCommand(command, dir) {
    if (!dir.repository || dir.repository.type !== 'git') {
        return false;
    }
    var key, keys = [], rg;
    for (key in commands) {
        if (commands.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    rg = new RegExp("^(" + keys.join('|') + ")");
    return (rg.test(command));
};

/**
 * Return the command to execute
 *
 * @param {String} command Command to run
 * @param {Object} dir Directory information
 * @returns {String}
 */
exports.getCommand = function getGitCommand(command,dir) {
    var isClone = (/^(clone)/.test(command)), key;


    // Prevent fed to browse when trying to clone repository
    exports.preventBrowse = isClone;
    if (isClone) {
        command = command.replace('clone', commands.clone + ' ' + dir.repository.url);
    } else {
        for (key in commands) {
            if (commands.hasOwnProperty(key)) {
                command = command.replace(key, commands[key]);
            }
        }
    }
    return command;
};

/**
 * Prevent browsing (false by default)
 * Except for clone
 * @type {boolean}
 */
exports.preventBrowse = false;