// Messi is a soccer player with goals in three leagues:

// LaLiga
// Copa del Rey
// Champions
// Complete the function to return his total number of goals in all three leagues.

//     Note: the input will always be valid.
function goals(laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
    return laLigaGoals + copaDelReyGoals + championsLeagueGoals
}
// Given an array(arr) as an argument complete the function countSmileys that should return the total number of smiling faces.

// Rules for a smiling face:

// Each smiley face must contain a valid pair of eyes.Eyes can be marked as : or;
// A smiley face can have a nose but it does not have to.Valid characters for a nose are - or ~
//     Every smiling face must have a smiling mouth that should be marked with either) or D
// No additional characters are allowed except for those mentioned.

// Valid smiley face examples: :) : D; -D : ~)
// Invalid smiley faces: ; ( :> :} :]
function countSmileys(arr) {
    return arr.filter(face => /^[:;][-~]?[)D]$/.test(face)).length;
}

// Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument(also a string).
function solution(str, ending) {
    return str.endsWith(ending);
}
