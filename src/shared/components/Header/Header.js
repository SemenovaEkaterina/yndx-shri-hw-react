import React, {useCallback} from 'react';
import {cn} from '@bem-react/classname';
import './Header.scss';
import Logo from "shared/components/Logo";
import Dropdown from "shared/components/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {setRepo} from "src/store/repos/actions";
import {fetchFiles} from "src/store/files/actions";

const header = cn('Header');
const headerItem = cn('Header', 'item');

export default () => {
    const repos = useSelector(state => state.repos.items);
    const current = useSelector(state => state.repos.item);
    const dispatch = useDispatch();
    const handleCheckRepo = useCallback((key) => {
        dispatch(fetchFiles(key));
        dispatch(setRepo(key));
    }, []);

    const options = (repos || []).map(item => ({
        key: item,
        content: <div className={header('option')}>{item}</div>
    }));

    return (
        <div className={header()}>
            <div className={header('content')}>
                <div className={header('table')}>
                    <a className={headerItem({type: 'logo'})}>
                        <Logo/>
                    </a>
                    {!!repos.length && (
                        <div className={headerItem({type: 'text', active: true})}>
                            <Dropdown items={options} onCheck={handleCheckRepo}>
                                <span className={header('dropdown')}>{current || 'Select...'}</span>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};