import {useContext} from "react";
import { __RouterContext as RouterContext } from 'react-router';

function useRouter() {
    return useContext(RouterContext);
}

export default function useParams() {
    const { match } = useRouter();
    return match.params;
}