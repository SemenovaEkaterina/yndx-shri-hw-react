import moment from 'moment';
import React, {FunctionComponent} from 'react';
import Name from 'src/shared/components/Name/Name';
import Typo, {TypoColor} from 'src/shared/components/Typo';
import { CommitI } from 'src/store/files/types';

interface Props {
  last: CommitI;
}

const FilesTitleDescription: FunctionComponent<Props> = ({last}) => {
    const commit = <>Last commit <Typo color={TypoColor.ACCENT}>{last.hash}</Typo></>;
    const date = `on ${moment.unix(parseInt(last.time, 10)).format('D MMM YYYY, h:mm')}`;
    const author = <>by <Name>{last.author}</Name></>;

    return (
      <>
        {commit} {date} {author}
      </>
    );
};

export default FilesTitleDescription;