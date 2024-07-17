import { CSSProperties, useState } from 'react';

import styles from '../styles/index.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from './article-params-form';
import { Article } from './article';

export const App = () => {
	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);
	function changeStyle(style: ArticleStateType) {
		setStyleState((prevState) => ({ ...prevState, ...style }));
	}

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': styleState.fontFamilyOption.value,
					'--font-size': styleState.fontSizeOption.value,
					'--font-color': styleState.fontColor.value,
					'--container-width': styleState.contentWidth.value,
					'--bg-color': styleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				styleValues={styleState}
				changeStyleValues={changeStyle}
			/>
			<Article />
		</main>
	);
};
