export type GetRepoNameFromPathI = (fullName: string) => string;

const getRepoNameFromPath: GetRepoNameFromPathI = (fullName: string) => {
    return fullName.endsWith('.git') ? fullName.replace(/.git$/i, '') : fullName;
};

export default getRepoNameFromPath;
