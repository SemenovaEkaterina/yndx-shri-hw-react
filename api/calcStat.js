process.on('message', (m) => {
    const result = {};
    Array(m.length).fill(0).map((_, i) => {
        if (!result[m[i]]) {
            result[m[i]] = 0;
        }
        result[m[i]]++;
    });
    process.send(result);
});
