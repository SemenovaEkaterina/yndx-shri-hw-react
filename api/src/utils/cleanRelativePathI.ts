export type CleanRelativePathI = (path: string, trailingSlash?: boolean) => string;

const cleanRelativePath: CleanRelativePathI = (path: string, trailingSlash = true) => {
    if (!path || path.includes('./') || path.includes('../')) {
        return '';
    }

    let result = path.split(/\s/).join('');
    if (trailingSlash && result && !result.endsWith('/')) {
        result = `${result}/`;
    }

    return result || '';
};

export default cleanRelativePath;
