// load zipped JSON from a file
import { readFileSync } from 'fs';
import { brotliDecompressSync } from 'zlib';
const json = JSON.parse(brotliDecompressSync(readFileSync(process.argv[2])).toString('utf-8')); // improve read/unzip time with streams? 

// example really starts here
import { Table, Query, and, not } from '../core';

// load the database and table from file
const estimates = new Table(json);

// for conveniance, find the columns we are interested in; some aliased
const countryCode = estimates.columns.find(column => column.name === 'Country Code')!;
const countryName = estimates.columns.find(column => column.name === 'Country Name')!;
const indicatorName = estimates.columns.find(column => column.name === 'Indicator Name')!;
const value = estimates.columns.find(column => column.name === '2020')!.as('population').to(Number); // NOTE: "as" and "to" can be used here or in query; they are not fluent and create new virtual columns

// a list of country codes in the data that are not countries, but aggregates
const notCountry = ['ARB', 'CSS', 'CEB', 'EAR', 'EAS', 'EAP', 'TEA', 'ECS', 'ECA', 'TEC', 'EUU', 'FCS', 'HPC', 'HIC', 'INX', 'LTE', 'EMU', 'LCN', 'LAC', 'TLA', 'LDC', 'LIC', 'LMY', 'LMC', 'MEA', 'MNA', 'TMN', 'MIC', 'NAC', 'OED', 'OSS', 'PSS', 'PST', 'PRE', 'SST', 'SAS', 'TSA', 'SSF', 'SSA', 'TSS', 'UMC', 'WLD'];

// create a query with just three returned columns and a complex filter criteria
const query = new Query(estimates)
	.select(countryCode.as('code'), countryName.as('name'), value)
	.where(and(indicatorName.equals('Population, total'), not(value.equals(null)), not(countryCode.in(notCountry))));

// iterate the query results
for (const row of query) {
	console.log(row);
}

let count = 0;
const start = process.hrtime();

// iterate the query results - without console overhead
for (const row of query) {
	count++;
}

const elapsed = process.hrtime(start);

console.log (`Processed ${count} rows in ${elapsed[0]}s ${elapsed[1]/1000000}ms`);