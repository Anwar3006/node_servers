var size = process.argv[2];
var total = process.argv[3] || 20;

var buf = [];
for (let i = 0; i < total; i++) {
  buf.push(Buffer.from(size + i));
  process.stdout.write(process.memoryUsage().heapTotal + "\n");
}
