export const capitalize = (word) => {
    const lowerCase = word.toLowerCase();
    return lowerCase[0].toUpperCase() + lowerCase.slice(1);
}