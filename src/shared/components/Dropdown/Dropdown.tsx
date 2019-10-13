import {cn} from '@bem-react/classname';
import React, {
  FunctionComponent,
  useCallback,
  useState,
} from 'react';
import './Dropdown.scss';

const dropdown = cn('Dropdown');

interface Props {
  items: Array<{
    key: string;
    content: React.ReactNode;
  }>;
  onCheck: (key: string) => void;
}

const Dropdown: FunctionComponent<Props> = ({children, items= [], onCheck}) => {
    const [opened, setOpened] = useState(false);

    const handleCheck = useCallback(
        (e) => {
            const key = e.currentTarget.getAttribute('data-id');
            onCheck(key);
            setOpened(false);
        },
        [],
    );
    // TODO blurable wrapper
    return (
        <div className={dropdown({opened})}>
            {children}
            <div className={dropdown('arrow')} onClick={() => setOpened(true)}/>
            <div className={dropdown('bg')}/>
            <div className={dropdown('options', {wide: true})}>
                <div className={dropdown('list')}>
                    {items.map(({key, content}) => (
                        <div key={key} data-id={key} className={dropdown('item')} onClick={handleCheck}>
                            {content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
