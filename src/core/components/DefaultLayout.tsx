import * as React from 'react';
import { LayoutProps } from 'types/index';

export default function DefaultLayout(props: LayoutProps) {
    const { Pages, NavLinks } = props;
    return (
        <main>
            <NavLinks />
            <Pages />
        </main>
    );
}
