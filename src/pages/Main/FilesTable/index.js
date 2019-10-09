import React from "react";
import Table from "shared/components/Table/Table";
import Section, {SectionSize} from "shared/components/Section/Section";
import Source from "shared/components/Source/Source";
import {SourceType} from "shared/components/Source";
import Name from "shared/components/Name/Name";
import {useSelector} from "react-redux";
import routes from "src/routes";
import useParams from "shared/hooks/useParams";
import Typo, {TypoColor} from "shared/components/Typo";

export default () => {
    const {repoId, path} = useParams();
    const getLink = (item) => {
        const name = item.name;
        const type = item.type;
        const route = type === 'blob' ? routes.BLOB : routes.TREE;
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
        <Section size={SectionSize.M} mobile={SectionSize.S}>
            <Table data={table}/>
        </Section>
    );
};