import React, {useEffect} from 'react';
import Container from "shared/components/Container";
import FileContainer from "shared/components/FileContainer";
import Crumbs from "shared/components/Crumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchFile} from "src/store/files/actions";
import useParams from "shared/hooks/useParams";
import Code from "shared/components/Code";
import Title from "shared/components/Title";
import {SourceStatus} from "src/store/types";
import routes from "src/routes";
import {Redirect} from "react-router-dom";
import Loader from "shared/components/Loader/Loader";
import Section from "shared/components/Section/Section";
import Tabs from "shared/components/Tabs/Tabs";

export default () => {
    // TODO часть с вызовом loadData для текущего рута частично дублируется на страницах -> сделать универсально
    const dispatch = useDispatch();
    const {repoId, path} = useParams();
    const state = useSelector(state => state);
    useEffect(() => {
        if (state.files.itemStatus === SourceStatus.INITIAL) {
            routes.BLOB.loadData(dispatch, () => state, {repoId, path});
        }
    }, []);

    useEffect(() => {
        dispatch(fetchFile(repoId, path))
    }, [path]);

    const file = useSelector(state => state.files.item);
    const status = useSelector(state => state.files.itemStatus);
    const name = useSelector(state => state.files.name);
    const current = useSelector(state => state.repos.item);

    return (
        <>
            {status === SourceStatus.NOT_FOUND && <Redirect to={routes.NOT_FOUND.create()}/>}
            {repoId !== current && <Redirect to={routes.TREE.create(repoId)}/>}
            {status === SourceStatus.LOADING && <Loader/>}
            {status === SourceStatus.SUCCESS && (
                <>
                    <Container>
                        <Crumbs/>
                        <Section size="l">
                            <Tabs items={['details']} selected={'details'}/>
                        </Section>
                        <Section size="s">
                            <Title name={name}/>
                        </Section>
                    </Container>
                    <Container full>
                        <Section size="m" mobile="s">
                            <FileContainer name={name}>
                                <Code data={file}/>
                            </FileContainer>
                        </Section>
                    </Container>
                </>
            )}
        </>
    )
};