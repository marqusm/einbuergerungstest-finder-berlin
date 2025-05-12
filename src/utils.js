function logWithTimestamp(...args) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}]`, ...args);
}

module.exports = {logWithTimestamp};