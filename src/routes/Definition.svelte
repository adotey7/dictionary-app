<script>
	export let data;

	function isLast(array, item) {
		return array[array.length - 1] === item;
	}
</script>

{#each data.meanings as meaning}
	<div class="mt-8">
		<h2 class="text-xl font-semibold text-yellow-600">{meaning.partOfSpeech}</h2>
		<div class=" mt-2 inline">
			<h4 class=" inline font-normal text-yellow-600">Definition(s):</h4>
			{#each meaning.definitions as definition, index}
				<p class={index === 0 ? 'inline-block' : 'block'}>{definition.definition}</p>
				<p class="mt-1 pl-10 italic text-yellow-600">{definition.example}</p>
			{/each}
		</div>
		{#if meaning.synonyms.length > 0}
			<div class=" mt-2 flex flex-wrap">
				<span class="mr-1"><h4 class=" font-normal text-yellow-600">Synonyms:</h4></span>
				{#each meaning.synonyms as synonym}
					<p class="mr-2">
						{synonym}{#if !isLast(meaning.synonyms, synonym)},
						{:else}.{/if}
					</p>
				{/each}
			</div>
		{/if}
		{#if meaning.antonyms.length > 0}
			<div class=" mt-2 flex flex-wrap">
				<span class="mr-1"><h4 class=" font-normal text-yellow-600">Antonyms:</h4></span>
				{#each meaning.antonyms as antonym}
					<p class="mr-2">
						{antonym}{#if !isLast(meaning.antonyms, antonym)},
						{:else}.{/if}
					</p>
				{/each}
			</div>
		{/if}
	</div>
{/each}
