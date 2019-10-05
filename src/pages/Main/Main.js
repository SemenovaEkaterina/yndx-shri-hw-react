import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
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
    const {repoId, path} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFiles(repoId, path))
    }, [path, repoId]);

    const status = useSelector(state => state.files.status);

    return (
        <>
            {status === SourceStatus.NOT_FOUND && <Redirect to={routes.NOT_FOUND}/>}
            {status === SourceStatus.LOADING && <Loader/>}
            {status === SourceStatus.SUCCESS && (
                <>
                    <Container>
                        <Crumbs/>
                        <FilesTitle/>
                        <Section size="l">
                            <Tabs/>
                        </Section>
                        <FilesTable/>
                    </Container>
                </>
            )}
        </>
    );
};