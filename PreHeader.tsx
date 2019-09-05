import * as React from 'react';

import {Container} from 'components/layout';

import './PreHeader.scss';

// type Props = {};

export const PreHeader = (/*props: Props*/) => {
	const base: string = 'pre-header';
	return (
		<div className={base}>
			<Container>
				<p>preheader</p>
			</Container>
		</div>
	);
};
