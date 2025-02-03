
// A pangram is a sentence that contains every single letter of the alphabet at least once.For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A - Z at least once(case is irrelevant).

// Given a string, detect whether or not it is a pangram.Return True if it is, False if not.Ignore numbers and punctuation.
function isPangram(string) {

    string = string.toLowerCase();// прирівнюю всі букви в нижньому регістрі

    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// створю масив символів
    for (let i = 0; i < arr.length; i++) {// прохожусь циклом по масиву
        if (!string.includes(arr[i])) {// метод інклудс - перевіряє чи є символ у рядку
            return false;
        }
    }
    return true;
}   
// Given two integers a and b, which can be positive or negative, find the sum of all the integers between and including them and return it.If the two numbers are equal return a or b.

//     Note: a and b are not ordered!
function getSum(a, b) {
    //взагалі не зрозумів умови ось чому його довго вирішував я думав що це звичайна сума
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    if (a == b) {
        return a;
    } else {
        return (min + max) * (max - min + 1) / 2;
    }
}
