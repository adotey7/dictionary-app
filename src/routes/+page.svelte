<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { schema } from '$lib/schemas/schema.js';
	import { Loader } from 'lucide-svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { getWord } from '$lib/services/api.js';
	import { toast } from 'svelte-sonner';

	import Definition from './Definition.svelte';

	export let data;
	let wordData = null;

	let isLoading = false;

	const { form, errors, validateForm } = superForm(data.form, {
		validators: zodClient(schema),
		validationMethod: 'auto',
		customValidity: false
	});

	const handleSubmit = async () => {
		const result = await validateForm({ updates: true, focusOnError: true });

		if (result.valid) {
			isLoading = true;

			try {
				wordData = await getWord($form.search);
				$form.search = '';
			} catch (error) {
				toast.error(error.message);
			} finally {
				isLoading = false;
			}
		} else {
			$errors.search = result.errors.search;
		}
	};
</script>

<h1 class="mb-9 mt-4 text-center text-4xl font-bold tracking-tight text-gray-700 lg:text-5xl">
	Dictionary app
</h1>
<p class="mb-7 text-center font-medium text-gray-700 lg:text-2xl">
	We can help you in finding the meaning of a word 🌐
</p>

<div class="flex justify-center">
	<form
		on:submit|preventDefault={handleSubmit}
		class="flex w-full max-w-sm items-center justify-center space-x-2"
	>
		<Input
			bind:value={$form.search}
			aria-invalid={$errors.search ? 'true' : undefined}
			type="text"
			name="search"
			disabled={isLoading}
			placeholder="Search word..."
		/>

		{#if isLoading}
			<Button disabled>
				<Loader class="h-4 w-4 animate-spin" />
			</Button>
		{:else}
			<Button type="submit" class="bg-gray-700">Search</Button>
		{/if}
	</form>
</div>

{#if $errors.search}<span class="invalid mt-3 block text-red-600"
		><p class="pr-24 text-center">{$errors.search}</p></span
	>{/if}

{#if wordData}
	<div class="mt-14">
		<h2 class="text-3xl font-bold text-gray-700">{wordData.wordName}</h2>
		<h3 class="mt-2 pl-14 text-xl font-semibold text-yellow-600">{wordData.phonetic}</h3>
	</div>

	<!-- Word and phonetics -->
	<Definition data={wordData} />
{/if}
