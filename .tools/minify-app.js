/**
 * Tool for minifying the resulting meteor bundle. We use our own
 * minifier in order to reduce time/memory consumed in the meteor
 * build process.
 * 
 *  TODO: the app source file path should be supplied to this script.
 * 
 */

const compressor = require('node-minify');
const fs = require('fs');

// Using Google Closure Compiler 
compressor.minify({
    compressor: 'gcc',
    input: 'app.js',
    output: 'app.min.js',
    callback: function (err, min) {}
});

// Remove original source and rename minified.
fs.unlink('app.js', 
    (err) => {
        if (err) {
            throw err;
        }

        console.log('Successfully deleted unminified source.');
    });

// Rename minified source to original source file name.
fs.rename(
    'app.min.js', 
    'app.js', 
    (err) => {
        if (err) {
            throw err;
        }

        console.log('Successfully renamed minified source.');
    });