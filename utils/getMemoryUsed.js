module.exports = () => `process used roughly ${(process.memoryUsage().heapUsed /1024/1024).toFixed(2)} MB`;
