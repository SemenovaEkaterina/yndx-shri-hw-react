import React from 'react';
import {useSelector} from 'react-redux';
import routes from 'src/routes';
import Name from 'src/shared/components/Name/Name';
import Section, {
    SectionMobile,
    SectionSize,
} from 'src/shared/components/Section/Section';
import {SourceType} from 'src/shared/components/Source';
import Source from 'src/shared/components/Source/Source';
import Table from 'src/shared/components/Table/Table';
import Typo, {TypoColor} from 'src/shared/components/Typo';
import useParams from 'src/shared/hooks/useParams';
import { AppState } from 'src/store';
import { SourceI } from 'src/store/files/types';

export default () => {
    const {repoId, path} = useParams();
    const getLink = (item: SourceI) => {
        const name = item.name;
        const type = item.type;
        const route = type === 'blob' ? routes.BLOB : routes.TREE;
        // !, иначе рут не совпадет
        return route.create(repoId!, `${path ? path + '/' : ''}${name}`);
    };

    const files = useSelector((state: AppState) => state.files.items);

    const table = {
        names: [
            {
                key: 'name',
                title: 'Name',
            },
            {
                key: 'commit',
                title: 'Last commit',
            },
            {
                key: 'message',
                title: 'Commit message',
            },
            {
                key: 'author',
                title: 'Commiter',
            },
            {
                key: 'time',
                title: 'Updated',
            },
        ],
        values: (files || []).map((item) => ({
            ...item,
            author: <Name>{item.author}</Name>,
            commit: <Typo color={TypoColor.ACCENT}>{item.commit}</Typo>,
            name: (
                <Source
                    to={getLink(item)}
                    type={item.type === 'tree' ? SourceType.DIR : SourceType.FILE}>{item.name}
                </Source>
            ),
        })),
    };

    return (
        <Section size={SectionSize.M} mobile={SectionMobile.S}>
            <Table data={table}/>
        </Section>
    );
};
