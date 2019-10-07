import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from 'react';
import Container from "shared/components/Container";
import Crumbs from "shared/components/Crumbs";
import Tabs from "shared/components/Tabs";
import {fetchFiles} from "../../store/files/actions";
import useParams from "shared/hooks/useParams";
import Section from "shared/components/Section";
import FilesTable from "./FilesTable";
import FilesTitle from "./FilesTitle";
import {SourceStatus} from "src/store/types";
import routes from "src/routes";
import {Redirect} from 'react-router-dom'
import Loader from "shared/components/Loader";

export default () => {
    // TODO часть с вызовом loadData для текущего рута частично дублируется на страницах -> сделать универсально
    const dispatch = useDispatch();
    const {repoId, path} = useParams();
    const state = useSelector(state => state);
    useEffect(() => {
        if (state.files.status === SourceStatus.INITIAL) {
            console.log("GET1");
            routes.TREE.loadData(dispatch, () => state, {repoId, path});
        }
    }, []);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            dispatch(fetchFiles(repoId, path))
        }
    }, [path, repoId]);

    const status = useSelector(state => state.files.status);
    const current = useSelector(state => state.repos.item);

    return (
        <>
            {status === SourceStatus.NOT_FOUND && <Redirect to={routes.NOT_FOUND.create()}/>}
            {status === SourceStatus.LOADING && <Loader/>}
            {status === SourceStatus.SUCCESS && (
                <>
                    {current !== repoId && <Redirect to={routes.TREE.create(current)}/>}
                    <div className="Main">
                        <Container>
                            <Crumbs/>
                            <FilesTitle/>
                            <Section size="l">
                                <Tabs items={['files']} selected={'files'}/>
                            </Section>
                            <FilesTable/>
                        </Container>
                    </div>
                </>
            )}
        </>
    );
};