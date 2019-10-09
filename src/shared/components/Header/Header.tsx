import {cn} from '@bem-react/classname';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from 'src/shared/components/Dropdown';
import Logo from 'src/shared/components/Logo';
import {fetchFiles} from 'src/store/files/actions';
import {setRepo} from 'src/store/repos/actions';
import './Header.scss';

const header = cn('Header');
const headerItem = cn('Header', 'item');

export default () => {
    const repos = useSelector((state) => state.repos.items);
    const current = useSelector((state) => state.repos.item);
    const dispatch = useDispatch();
    const handleCheckRepo = useCallback((key) => {
        dispatch(fetchFiles(key));
        dispatch(setRepo(key));
    }, []);

    const options = (repos || []).map((item) => ({
        content: <div className={header('option')}>{item}</div>,
        key: item,
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
    );
};
