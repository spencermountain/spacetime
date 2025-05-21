import {readFileSync, writeFileSync} from "node:fs";
import spacetime from './src/index.js';
import {format} from './src/methods/format/index.js';
import {mapping} from './src/methods/format/unixFmt.js';

const buildTableContent = (map, method) => [...map.entries()].map(entry => {
    const argument = ["`", `timestamp.${method}("${entry.at(0)}")`, "`"].join("");
    const result = ["`", `${entry.at(1)}`, "`"].join("");
    return `| ${argument} | ${result} |`;
}).join("\n")

const ts = spacetime('2011-12-13 12:34:56.789Z', 'UTC');

const namedFormats = Object.keys(format).sort((a, b) => a.localeCompare(b));
const unixFormats = Object.keys(mapping).sort((a, b) => a.localeCompare(b));

const named = new Map();
const unix = new Map();

namedFormats.map(_format => named.set(_format, ts.format(_format)));
unixFormats.map(_format => unix.set(_format, ts.unixFmt(_format)));

named.delete("json");

const template = readFileSync('./_formatting.md', "utf-8");

writeFileSync(
    './formatting.md',
    template
        .replace("_named", buildTableContent(named, 'format'))
        .replace("_json", JSON.stringify(ts.format("json"), null, 2))
        .replace("_unix", buildTableContent(unix, 'unixFmt'))
);
