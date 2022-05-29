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

	const keyPressed = (e) => {
		if (e.key === '/') cli.current.focus();
	};

	useEffect(() => {
		document.addEventListener('keypress', keyPressed);
		return () => document.removeEventListener('keypress', keyPressed);
	}, []);

	return (
		<form
			autoComplete="off"
			onSubmit={commander}
			className="flex-sc bg-black bg-opacity-40 rounded-md border w-54"
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
				className="py-2 pr-3 bg-white bg-opacity-0"
				id="size"
				placeholder={focus ? '/start  /new  or  x,y ' : 'press / to focus'}
			/>
		</form>
	);
};

export default CommandLine;
