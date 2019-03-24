import {Dictionary} from "src/util/Collections"
import Vue, {PluginFunction, VueConstructor} from "vue";
import RequireContext = __WebpackModuleApi.RequireContext;

declare module "vue/types/vue" {

	interface Vue {
		readonly $resources: VueWebpackResources.ResourcesInstanceProperty;
		readonly $strings: Dictionary<string>;
	}
}

export module VueWebpackResources {

	export type Options = {
		preRequire?: RegExp | RegExp[]
	}

	export interface ResourcesInstanceProperty {
		require(path: string): any;
		requireAll(regex: RegExp): Dictionary<any>;
		updateLocale(locale: string): void;
	}

	export const install: PluginFunction<Options> = function (vue: VueConstructor<Vue>, options: Options) {
		const context = require.context("res", true);

		const resources = new Resources(vue, context, "res");
		const stringResources = new StringResources(vue, resources, "res/values", "strings", "strings.");

		vue.prototype.$resources = {
			require: (path: string) => resources.require(path),
			requireAll: (regex: RegExp) => resources.requireAll(regex),
			updateLocale: (locale: string) => {
				stringResources.updateLocale(locale);
			}
		};

		vue.prototype.$strings = stringResources.strings;

		vue.mixin({
			beforeCreate() {
				const preRequire = options.preRequire;

				if (preRequire) {
					if (preRequire instanceof Array) {
						preRequire.forEach(this.$resources.requireAll);
					} else {
						this.$resources.requireAll(preRequire);
					}
				}

				// @ts-ignore
				vue.util.defineReactive(this, "$strings");
			}
		});
	}
}

class Resources {

	private readonly vue: VueConstructor<Vue>;
	private readonly context: RequireContext;
	private readonly resourcesPath: string;

	constructor(vue: VueConstructor<Vue>, context: RequireContext, resourcesPath: string) {
		this.vue = vue;
		this.context = context;
		this.resourcesPath = resourcesPath;
	}

	private pathToContextPath(path: string): string {
		if (path.indexOf(this.resourcesPath + "/") == 0) {
			return "." + path.substr(this.resourcesPath.length);
		} else {
			return path;
		}
	};

	private contextPathToPath(contextPath: string): string {
		if (contextPath.indexOf("./") == 0) {
			return this.resourcesPath + contextPath.substr(1);
		} else {
			return contextPath;
		}
	};

	requireAll(regex: RegExp): Dictionary<any> {
		const required: Dictionary<any> = {};
		this.context.keys().forEach(contextPath => {
			const path = this.contextPathToPath(contextPath);
			if (!regex || regex.test(path)) required[path] = this.context(contextPath);
		});
		return required;
	};

	require(path: string): any {
		const contextPath = this.pathToContextPath(path);
		return this.context(contextPath);
	};
}

class StringResources {

	private readonly vue: VueConstructor<Vue>;
	private readonly resources: Resources;
	private readonly stringsPath: string;
	private readonly defaultName: string;
	private readonly localePrefix: string;

	readonly strings: Dictionary<string> = {};

	constructor(vue: VueConstructor<Vue>, resources: Resources, stringsPath: string, defaultName: string, localePrefix: string) {
		this.vue = vue;
		this.resources = resources;
		this.stringsPath = stringsPath;
		this.defaultName = defaultName;
		this.localePrefix = localePrefix;
		this.loadStrings();
	}

	private clearStrings() {
		for (const key in this.strings) {
			if (this.strings.hasOwnProperty(key)) {
				this.vue.delete(this.strings, key);
			}
		}
	};

	private loadStrings(locale?: string) {
		try {
			const resource = locale ?
				this.resources.require(`${this.stringsPath}/${this.localePrefix}${locale}.json`) :
				this.resources.require(`${this.stringsPath}/${this.defaultName}.json`);

			for (const key in resource) {
				if (resource.hasOwnProperty(key)) {
					this.vue.set(this.strings, key, resource[key]);
				}
			}
		} catch (e) {
			console.warn(locale ?
				`String resource is missing for locale: ${locale}` :
				`String resource is missing.`);
		}
	};

	updateLocale(locale: string) {
		this.clearStrings();
		this.loadStrings();
		this.loadStrings(locale);
	};
}