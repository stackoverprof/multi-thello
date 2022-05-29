import React from 'react';
import useCommand from '@core/hooks/useCommand';
import useForm from '@core/hooks/useForm';

const CommandLine = () => {
	const { form, mutateForm, resetForm } = useForm({
		command: '',
	});

	const commander = useCommand(form.command, resetForm);

	return (
		<form
			autoComplete="off"
			onSubmit={commander}
			className="flex-sc bg-black bg-opacity-40 rounded-md border w-54"
		>
			<p className="mr-3 ml-4 text-2xl font-bold">{'>'}</p>
			<input
				autoFocus
				autoComplete="false"
				type="text"
				value={form.command}
				onChange={mutateForm}
				name="command"
				className="py-2 pr-3 bg-white bg-opacity-0"
				id="size"
				placeholder=""
			/>
		</form>
	);
};

export default CommandLine;
