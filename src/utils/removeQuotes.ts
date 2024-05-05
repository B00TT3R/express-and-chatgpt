function removeQuotes(str:string) {
    return str.replace(/^['"`]|['"`]$/g, '');
}
export default removeQuotes