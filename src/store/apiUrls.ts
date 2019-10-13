import config from 'src/config';

export default {
    tree: (repoId: string, path?: string) => {
        const base = `${config.apiUrl}repos/${repoId}`;
        return path ? `${base}/tree/master/${path}` : base;
    },
    blob: (repoId: string, path: string = '') => `${config.apiUrl}repos/${repoId}/blob/master/${path}`,
    repos: () => `${config.apiUrl}repos`,
}
