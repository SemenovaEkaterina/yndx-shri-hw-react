import { Context, useContext } from 'react';
import {
    __RouterContext as RouterContext,
    RouteComponentProps,
} from 'react-router';

type ParamsI<T> = {
    [P in keyof T]?: string;
};

function useRouter<T>(): RouteComponentProps<ParamsI<T>> {
    return useContext<RouteComponentProps<ParamsI<T>>>(RouterContext as Context<RouteComponentProps<ParamsI<T>>>);
}

export default function useParams<T>(): ParamsI<T> {
    const { match } = useRouter<T>();
    return match.params;
}
