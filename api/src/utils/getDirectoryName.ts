export type GetDirectoryNameI = (repoName: string) => string;

const getDirectoryName: GetDirectoryNameI = (repoName: string) => {
    return `${repoName}.git`;
};

export default getDirectoryName;
