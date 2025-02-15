import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	styleValues: ArticleStateType;
	changeStyleValues: (style: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	styleValues,
	changeStyleValues,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const defaultStyleValues = useRef<ArticleStateType>(styleValues);
	const rootRef = useRef<HTMLDivElement>(null);

	const [formState, setFormState] = useState<ArticleStateType>(styleValues);
	function changeFormState(key: keyof ArticleStateType, value: OptionType) {
		setFormState((prevState) => ({ ...prevState, [key]: value }));
	}

	useEffect(() => {
		setFormState(styleValues);
	}, [styleValues]);

	function handleSubmitForm(e: FormEvent) {
		e.preventDefault();
		changeStyleValues(formState);
	}

	function handleResetForm(e: FormEvent) {
		e.preventDefault();
		changeStyleValues(defaultStyleValues.current);
	}

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onChange={(state) => {
					setIsMenuOpen(!state);
				}}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text weight={800} size={31} uppercase={true} as='h2'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) => {
							changeFormState('fontFamilyOption', selected);
						}}
					/>
					<RadioGroup
						name='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selected) => {
							changeFormState('fontSizeOption', selected);
						}}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => {
							changeFormState('fontColor', selected);
						}}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) => {
							changeFormState('backgroundColor', selected);
						}}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) => {
							changeFormState('contentWidth', selected);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
