import React, { useEffect, useRef, useState } from 'react';
import useCommand from '@core/hooks/useCommand';
import useForm from '@core/hooks/useForm';

const CommandLine = () => {
	const [focus, setFocus] = useState(false);
	const cli = useRef(null);

	const { form, mutateForm, resetForm } = useForm({
		command: '',
	});

	const commander = useCommand(form.command, resetForm);

	useEffect(() => {
		if (cli) cli.current.focus();
	}, []);

	useEffect(() => {
		const keyPressed = (e) => {
			if (!focus && e.key === '/') {
				e.preventDefault();
				cli.current.focus();
				setFocus(true);
			}
			if (focus && e.keyCode === 27) {
				cli.current.blur();
				setFocus(false);
			}
		};
		document.addEventListener('keypress', keyPressed);
		return () => document.removeEventListener('keypress', keyPressed);
	}, [focus]);

	return (
		<form
			autoComplete="off"
			onSubmit={commander}
			className="flex-sc w-[340px] bg-black bg-opacity-40 rounded-md border"
		>
			<p className="mr-3 ml-4 text-2xl font-bold">{'>'}</p>
			<input
				autoFocus
				ref={cli}
				autoComplete="false"
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				type="text"
				value={form.command}
				onChange={mutateForm}
				name="command"
				className="py-2 pr-3 w-full bg-white bg-opacity-0"
				id="size"
				placeholder={
					focus ? '/start  /new [board] [player]  or  [x], [y]' : 'press / to focus'
				}
			/>
		</form>
	);
};

export default CommandLine;
