import React from 'react';
import {useSelector} from 'react-redux';
import Section, {SectionSize} from 'src/shared/components/Section/Section';
import Title from 'src/shared/components/Title/Title';
import useParams from 'src/shared/hooks/useParams';
import { AppState } from 'src/store';
import FilesTitleDescription from './FilesTitleDescription';

export default () => {
    const {repoId, path} = useParams();
    const last = useSelector((state: AppState) => state.files.last);

    const name = path ? path.split('/').slice(-1)[0] : repoId;

    return (
        <Section size={SectionSize.S}>
            {name && <Title name={name} description={last && <FilesTitleDescription last={last} />}/>}
        </Section>
    );
};
