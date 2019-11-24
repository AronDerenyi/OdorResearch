export class Word {

	readonly word: string;
	readonly meaningStringId: string;

	constructor(word: string, meaningStringId: string) {
		this.word = word;
		this.meaningStringId = meaningStringId;
	}
}