// @ts-ignore
import {cookie} from 'browser-cookie-lite';
import {RichText} from 'components/editable';
import {Container} from 'components/layout';
import {getModifiers} from 'components/libs';

import {CloseButton} from 'components/ui';
import React from 'react';
import {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import './PreHeader.scss';
import './Transition.scss';

import * as Types from 'components/types';

export type PreHeaderProps = {
	content: string;
	expirationDays?: number;
	lastUpdated?: string;

	isDismissable?: boolean;
	href?: Types.Url;
	align?: Types.Align;
	theme?: Types.Theme;
	name?: string;
};

const COOKIE_NAME: string = 'pres';

export const PreHeader = (props: PreHeaderProps) => {
	const base: string = 'pre-header';

	const {
		content,
		href,
		align,
		isDismissable = true,
		theme = 'primary',
		name = COOKIE_NAME,
		expirationDays = 1,
		lastUpdated = 'never',
	} = props;

	const [showComponent, setShowComponent] = useState(!(cookie(name) === lastUpdated));

	const atts: object = {
		className: getModifiers(base, {align}),
		'data-theme': theme,
	};

	const onDismiss = (ev: React.MouseEvent): void => {
		ev.preventDefault();

		cookie(name, lastUpdated, 60 * 60 * 24 * expirationDays, '/');

		setShowComponent(false);
	};

	return (
		<CSSTransition in={showComponent} timeout={300} classNames="display" unmountOnExit>
			<div {...atts}>
				<Container>
					<div className={`${base}__main`}>
						<div className={`${base}__message`}>
							{href ? (
								<a href={href}>
									<RichText content={content} />
								</a>
							) : (
								<RichText content={content} />
							)}
						</div>
						{isDismissable && !href && <CloseButton onClick={onDismiss} />}
					</div>
				</Container>
			</div>
		</CSSTransition>
	);
};
