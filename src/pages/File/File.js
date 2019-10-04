import React, {useEffect} from 'react';
import Container from "shared/components/Container";
import FileContainer from "shared/components/FileContainer";
import Crumbs from "shared/components/Crumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchFile} from "src/store/files/actions";
import useParams from "shared/hooks/useParams";
import Code from "shared/components/Code";
import Title from "shared/components/Title";
import {FilesStatus} from "src/store/files/types";
import routes from "src/routes";
import {Redirect} from "react-router-dom";
import Loader from "shared/components/Loader/Loader";

export default () => {
    const dispatch = useDispatch();
    const {repoId, path} = useParams();
    useEffect(() => {
        dispatch(fetchFile(repoId, path))
    }, [path]);

    const file = useSelector(state => state.files.item);
    const status = useSelector(state => state.file.status);

    return (
        <>
            {status === FilesStatus.NOT_FOUND && <Redirect to={routes.NOT_FOUND}/>}
            {status === FilesStatus.LOADING && <Loader/>}
            {status === FilesStatus.SUCCESS && (
                <>
                    <Container>
                        <Crumbs/>
                        <Title/>
                    </Container>
                    <Container full>
                        <FileContainer>
                            <Code data={file}/>
                        </FileContainer>
                    </Container>
                </>
            )}
        </>
    )
};