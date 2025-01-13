async function some() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello, World!")
        }, 1000)
    });
}


(async function execute() {
    try {
        const result = await some()
        console.log(result)
    } catch (error) {
        console.error("Error:", error)
    }
})()