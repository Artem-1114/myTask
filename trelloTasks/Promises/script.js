const promis = new Promise((fulfill) => {
    setTimeout(() => {
        fulfill("Promise resolved!")
  },2000)
})

promis.then((some) => {
    console.log(some)
})

const errorPromis = new Promise((_, reject) => {
    reject("Promise rejected!")
})

errorPromis.catch((error) => {
   console.error(error)
})



// Завдання з чату GPT просто сам зрлбив щоб засвоєти то для мене ця тема давалась дуже тяжко і ще досі не впевнений що нормально її розумію

const someProm = new Promise((fulfill, reject) => {
    const num = 10
    setTimeout(() => {
        if (typeof num === "number") {
            fulfill(num)
        } else {
            reject ("Потрібно вести число")
        }
    },1000)
})

someProm.then((Prom1) => {
    console.log(Prom1)
    return Prom1
})
    .then((Prom2) => {
        const sum = Prom2 * 5
        console.log(sum)
        return sum
    })
    .then((Prom3) => {
        const sum1 = Prom3 * 2
        console.log(sum1)
    })
    .catch((error) => {
       console.log(error)
        
    })
    




