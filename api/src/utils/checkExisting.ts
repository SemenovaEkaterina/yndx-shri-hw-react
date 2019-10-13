import fs, {PathLike} from 'fs';
import util from 'util';
const exists = util.promisify(fs.exists);

export type CheckExistingI = (filePath: PathLike) => Promise<boolean>;

const checkExisting: CheckExistingI = async (filePath: PathLike) => {
    return await exists(filePath);
};

export default checkExisting;
