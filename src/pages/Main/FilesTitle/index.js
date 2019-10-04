import React from 'react';
import Title from "shared/components/Title/Title";
import Section from "shared/components/Section/Section";
import Name from "shared/components/Name/Name";
import {useSelector} from "react-redux";
import useParams from "shared/hooks/useParams";
import Typo from "shared/components/Typo";
import moment from 'moment';

export default () => {
    const {repoId, path} = useParams();
    const last = useSelector(state => state.files.last) || {};

    const name = path ? path.split('/').slice(-1) : repoId;
    const commit = <>Last commit <Typo color="accent">{last.hash}</Typo></>;
    const date = `on ${moment.unix(last.time).format('D MMM YYYY, h:mm')}`;
    const author = <>by <Name>{last.author}</Name></>;
    const description = (
        <>
            {commit} {date} {author}
        </>
    );

    return (
        <Section size="s">
            <Title name={name} description={description}/>
        </Section>
    )
}
