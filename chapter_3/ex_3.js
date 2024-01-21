// Now let us use pipe to continuously redirect anthing written in the terminal(stdin a Writable stream)
// to the terminal(stdout a Readable stream)
process.stdin.pipe(process.stdout);
