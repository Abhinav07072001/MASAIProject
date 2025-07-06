let count = 0;

const loadingInterval = setInterval(() => {
    console.log("Loading...");
    count++;
}, 1000);

setTimeout(() => {
    clearInterval(loadingInterval);
    console.log("Loaded successfully!");
}, 5000);
