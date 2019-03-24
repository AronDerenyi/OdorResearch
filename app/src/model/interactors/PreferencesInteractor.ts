import * as ElectronSettings from "electron-settings";

export class PreferencesInteractor {

	static get(name: string, defaultValue: string = null): string {
		if (ElectronSettings.has(name)) {
			return ElectronSettings.get(name) as string;
		} else {
			return defaultValue;
		}
	}

	static set(name: string, value: string) {
		ElectronSettings.set(name, value);
	}

	static remove(name: string) {
		ElectronSettings.delete(name);
	}
}