import React from 'react';
import Table from "shared/components/Table/Table";
import Section from "shared/components/Section/Section";
import Source from "shared/components/Source/Source";
import {SourceType} from "shared/components/Source";
import Name from "shared/components/Name/Name";
import {useSelector} from "react-redux";
import routes from "src/routes";
import useParams from "shared/hooks/useParams";
import Typo from "shared/components/Typo/Typo";

export default () => {
    const {repoId, path} = useParams();
    const getLink = (name) => {
        const route = name.indexOf('.') > 0 ? routes.BLOB : routes.TREE;
        return route.create(repoId, `${path ? path + '/' : ''}${name}`)
    };

    const files = useSelector(state => state.files.items);

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
        values: (files || []).map(item => ({
            ...item,
            commit: <Typo color="accent">{item.commit}</Typo>,
            name: (
                <Source
                    to={getLink(item.name)}
                    type={SourceType.DIR}>{item.name}
                </Source>
            ),
            author: <Name>{item.author}</Name>
        }))
    };

    return (
        <Section size="m" mobile="s">
            <Table data={table}/>
        </Section>
    );
};