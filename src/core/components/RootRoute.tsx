import * as React from 'react';
import { noop } from 'utils/index';
import BokeContext from 'components/Context';
import { History, Location } from 'history';
import { OnRouteChange } from 'types/index';

interface RootRouteProps {
    history: History;
    location: Location;
    children: React.ReactNode;
    onRouteChange?: OnRouteChange;
}

export default function RootRoute({ history, location, onRouteChange, children }: RootRouteProps) {
    const { getConfig } = React.useContext(BokeContext);

    console.log(getConfig!());
    React.useEffect(() => {
        console.log('ccc');
        let unlisten: () => void = noop;
        if (typeof onRouteChange === 'function') {
            unlisten = history.listen(onRouteChange);
        }
    }, [history, onRouteChange]);

    React.useEffect(() => {
        const { homepage } = getConfig!();
        if (homepage && homepage !== '/' && location.pathname === '/') {
            history.replace(homepage);
        }
    }, [getConfig, history, location]);

    return <>{children}</>;
}
