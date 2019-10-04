import React, {useEffect} from 'react';
import Container from "shared/components/Container";
import FileContainer from "shared/components/FileContainer";
import Crumbs from "shared/components/Crumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchFile} from "src/store/files/actions";
import useParams from "shared/hooks/useParams";
import Code from "shared/components/Code";
import Title from "shared/components/Title";

export default () => {
    const dispatch = useDispatch();
    const {repoId, path} = useParams();
    useEffect(() => {
        dispatch(fetchFile(repoId, path))
    }, [path]);

    const file = useSelector(state => state.files.item);

    return (
        <>
            <Container>
                <Crumbs/>
                <Title />
            </Container>
            <Container full>
                <FileContainer>
                    <Code data={file} />
                </FileContainer>
            </Container>
        </>
    )
};