export const getWord = async (word) => {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

		if (!response.ok) {
			throw new Error("Sorry pal, we couldn't find definitions for the word you were looking for.");
		}

		const data = await response.json();
		const wordData = data[0];
		const wordName = wordData.word;
		const phonetic = wordData.phonetic ?? '';
		const meanings = wordData.meanings.map((meaning) => {
			return {
				partOfSpeech: meaning.partOfSpeech,
				definitions: meaning.definitions.map((definition) => {
					return {
						definition: definition.definition,
						example: definition.example ?? ''
					};
				}),
				synonyms: meaning.synonyms,
				antonyms: meaning.antonyms
			};
		});
		return { wordName, phonetic, meanings };
	} catch (error) {
		throw error;
	}
};
