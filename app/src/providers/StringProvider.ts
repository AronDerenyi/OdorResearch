import {Dictionary, ReadonlyDictionary} from "src/util/Collections";
import {Disposable} from "src/util/Disposable";
import $ from 'jquery'

export class StringProvider {

	static readonly HU = "hu";
	static readonly EN = "en";

	private static listeners: ((language: string) => void)[] = [];
	private static strings: Dictionary<ReadonlyDictionary<string>> = {};
	private static language: string = StringProvider.HU;

	private static initialize = (() => {
		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/strings/hu.json",
			success: (result) => {
				StringProvider.strings[StringProvider.HU] = result;
			}
		});
		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/strings/en.json",
			success: (result) => {
				StringProvider.strings[StringProvider.EN] = result;
			}
		});
	})();

	static getLanguage(): string {
		return this.language;
	}

	static setLanguage(language: string) {
		this.language = language;
		this.listeners.forEach((listener) => listener(this.language));
	}

	static watchLanguage(listener: (language: string) => void): Disposable {
		this.listeners.push(listener);
		return {
			dispose() {
				StringProvider.listeners.splice(StringProvider.listeners.indexOf(listener), 1);
			}
		}
	}

	static getStrings(): Dictionary<string> {
		return this.strings[this.language];
	}

	static get(stringId: string): string {
		return this.strings[this.language][stringId];
	}
}
