function removeQuotes(str) {
    return str.replace(/^['"`]|['"`]$/g, '');
}
export default removeQuotes