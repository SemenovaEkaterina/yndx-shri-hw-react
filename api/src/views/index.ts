import {asyncErrorHandler, repoNotFoundHandler} from '../handlers';
import create from './create';
import file from './file';
import remove from './remove';
import repos from './repos';
import tree from './tree';

const wrappedCreate = asyncErrorHandler(create);
const wrappedFile = repoNotFoundHandler(file);
const wrappedRemove = repoNotFoundHandler(remove);
const wrappedRepos = asyncErrorHandler(repos);
const wrappedTree = repoNotFoundHandler(tree);

export {
    wrappedCreate as create,
    wrappedFile as file,
    wrappedRemove as remove,
    wrappedRepos as repos,
    wrappedTree as tree,
};
