import { readFileSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);

function getArg(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] ?? '' : '';
}

const runId = getArg('--run-id');
const sha = getArg('--sha');
const env = getArg('--env');
const pr = getArg('--pr');
const framework = getArg('--framework');
const reportType = getArg('--report-type') || 'html';
const results = JSON.parse(getArg('--results') || '{}');

const manifestPath = 'manifest.json';
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const reportSegment =
  reportType === 'allure-results' ? 'allure-report' : framework;
const linkPath = `${env}/latest/${reportSegment}/index.html`;

let entry = manifest.find((item) => item.runId === runId && item.env === env);

if (!entry) {
  entry = {
    runId,
    timestamp: new Date().toISOString(),
    env,
    sha,
    pr: pr ? Number(pr) : null,
    results: {},
    links: {},
  };
  manifest.unshift(entry);
}

entry.timestamp = new Date().toISOString();
entry.sha = sha;
if (pr) {
  entry.pr = Number(pr);
}
entry.results[framework] = results;
entry.links[framework] =
  reportType === 'allure-results'
    ? `${env}/latest/allure-report/index.html`
    : linkPath;

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
