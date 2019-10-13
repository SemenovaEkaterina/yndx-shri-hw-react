export default (str: string) => {
    const input = str.startsWith('/') ? str.slice(1) : str;
    const index = input.indexOf('/');
    return input.slice(0, index);
};
