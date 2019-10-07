import config from 'src/config';

export default {
    tree: (repoId, path) => {
        const base = `${config.apiUrl}repos/${repoId}`;
        return path ? `${base}/tree/master/${path}` : base;
    },
    blob: (repoId, path) => `${config.apiUrl}repos/${repoId}/blob/master/${path}`,
    repos: () => `${config.apiUrl}repos`,
}