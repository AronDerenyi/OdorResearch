import {Dictionary} from "src/util/Collections";
import {Disposable} from "src/util/Disposable";
import * as ElectronSettings from "electron-settings";

export class Locale {

	private static readonly LOCALE_SETTING = "locale";

	static readonly HU_LOCALE = "hu";
	static readonly EN_LOCALE = "en";

	private static listeners: ((locale: string) => void)[] = [];
	private static strings: Dictionary<Dictionary<string>> = {};

	private static initialize = (() => {
		if (!ElectronSettings.has(Locale.LOCALE_SETTING)) {
			ElectronSettings.set(Locale.LOCALE_SETTING, Locale.HU_LOCALE);
		}

		Locale.strings[Locale.HU_LOCALE] = require("assets/strings/hu.json");
		Locale.strings[Locale.EN_LOCALE] = require("assets/strings/en.json");

		ElectronSettings.watch(Locale.LOCALE_SETTING, () => {
			const locale = Locale.getLocale();

			if (
				locale != Locale.HU_LOCALE &&
				locale != Locale.EN_LOCALE) {
				throw new Error(`Illegal locale: ${locale}`);
			}

			Locale.listeners.forEach((listener) => listener(locale))
		});
	})();

	static getLocale(): string {
		return ElectronSettings.get(Locale.LOCALE_SETTING) as string;
	}

	static setLocale(locale: string) {
		ElectronSettings.set(Locale.LOCALE_SETTING, locale);
	}

	static watchLocale(listener: (locale: string) => void): Disposable {
		Locale.listeners.push(listener);
		return {dispose: () => {
			Locale.listeners.splice(Locale.listeners.indexOf(listener), 1);
		}}
	}

	static getString(name: string, locale: string = Locale.getLocale()): string {
		return Locale.strings[locale][name];
	}
}
