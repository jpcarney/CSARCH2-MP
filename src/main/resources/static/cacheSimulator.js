document.getElementById('simulationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        blockSize: parseInt(formData.get('blockSize')),
        memorySize: parseInt(formData.get('memorySize')),
        cacheSize: parseInt(formData.get('cacheSize')),
        programFlow: formData.get('programFlow').split(',').map(Number),
        missPenalty: parseInt(formData.get('missPenalty'))
    };

    const result = simulateCache(data);
    displayResults(result);
});

function simulateCache(data) {
    const { blockSize, memorySize, cacheSize, programFlow, missPenalty } = data;
    const cache = new Array(cacheSize / blockSize).fill(-1);
    let cacheHits = 0;
    let cacheMisses = 0;

    programFlow.forEach(address => {
        const blockNumber = Math.floor(address / blockSize);
        const cacheIndex = blockNumber % (cacheSize / blockSize);

        if (cache[cacheIndex] === blockNumber) {
            cacheHits++;
        } else {
            cacheMisses++;
            cache[cacheIndex] = blockNumber;
        }
    });

    const totalAccessTime = (cacheHits + cacheMisses) * blockSize + cacheMisses * missPenalty;
    const averageAccessTime = totalAccessTime / programFlow.length;

    return {
        cacheHits,
        cacheMisses,
        missPenalty,
        totalAccessTime,
        averageAccessTime,
        cache
    };
}

function displayResults(result) {
    const resultsTableBody = document.getElementById('resultsTableBody');
    resultsTableBody.innerHTML = `
        <tr><td>Cache Hits</td><td>${result.cacheHits}</td></tr>
        <tr><td>Cache Misses</td><td>${result.cacheMisses}</td></tr>
        <tr><td>Miss Penalty</td><td>${result.missPenalty}</td></tr>
        <tr><td>Average Memory Access Time</td><td>${result.averageAccessTime}</td></tr>
        <tr><td>Total Memory Access Time</td><td>${result.totalAccessTime}</td></tr>
        <tr><td>Cache Snapshot</td><td>${generateCacheSnapshot(result.cache)}</td></tr>
    `;

    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cache Hits', 'Cache Misses'],
            datasets: [{
                label: 'Simulation Results',
                data: [result.cacheHits, result.cacheMisses],
                backgroundColor: ['#4caf50', '#f44336'],
            }]
        }
    });
}

function generateCacheSnapshot(cache) {
    return cache.map((block, index) => `Block ${index}: ${block}`).join('<br>');
}
