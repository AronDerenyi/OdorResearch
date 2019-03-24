<script lang="ts">
	import {Vue, Component, Watch} from "vue-property-decorator";
	import Electron from "electron";
	import {PreferencesViewModel} from "src/viewmodel/PreferencesViewModel";

	import ImgSvg from "src/app/components/ImgSvg.vue";
	import HomeScreen from "src/app/screens/home/HomeScreen.vue";
	import MoodTestScreen from "src/app/screens/moodtest/MoodTestScreen.vue";
	import CreativityTestScreen from "src/app/screens/creativitytest/CreativityTestScreen.vue";

	@Component({components: {ImgSvg}})
	export default class App extends Vue {

		// noinspection TypeScriptUnresolvedVariable
		private platform: string = process.platform;
		private window = Electron.remote.getCurrentWindow();

		preferencesViewModel = PreferencesViewModel.requireInstance();

		showWindowControls = this.platform != "darwin";
		showResizeRegion = this.platform == "win32";
		isMaximized = false;

		created() {
			this.$router.addRoutes([
				{
					path: "/",
					redirect: "/home"
				},
				{
					path: "/home",
					name: "Home",
					component: HomeScreen
				},
				{
					path: "/test/mood",
					name: "Mood Test",
					component: MoodTestScreen
				},
				{
					path: "/test/creativity",
					name: "Creativity Test",
					component: CreativityTestScreen
				}
			]);

			this.isMaximized = this.window.isMaximized();

			this.window.on("maximize", () => this.isMaximized = true);
			this.window.on("unmaximize", () => this.isMaximized = false);
			this.window.on("resize", () => this.isMaximized = false);

			this.$resources.updateLocale(this.preferencesViewModel.locale);
		}

		destroyed() {
			PreferencesViewModel.releaseInstance();
		}

		@Watch("preferencesViewModel.locale")
		onLocaleChanged(locale: string) {
			this.$resources.updateLocale(locale);
		}

		closeWindow() {
			this.window.close();
		}

		maximizeWindow() {
			this.window.maximize();
		}

		unmaximizeWindow() {
			this.window.unmaximize();
		}

		minimizeWindow() {
			this.window.minimize();
		}
	};
</script>

<template>
	<div class="container" style="
		width: 100%;
		height: 100%;">

		<transition name="page">

			<RouterView style="
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;"/>

		</transition>

		<div v-if="showResizeRegion" class="window_resize_region"
		     style="position: absolute; top: 0; left: 0; right: 0;"></div>
		<div v-if="showResizeRegion" class="window_resize_region"
		     style="position: absolute; bottom: 0; left: 0; right: 0;"></div>
		<div v-if="showResizeRegion" class="window_resize_region"
		     style="position: absolute; top: 0; bottom: 0; left: 0;"></div>
		<div v-if="showResizeRegion" class="window_resize_region"
		     style="position: absolute; top: 0; bottom: 0; right: 0;"></div>

		<div v-if="showWindowControls" class="window_control" style="
			position: absolute;
			top: 0;
			right: 0;">

			<ImgSvg src="res/drawable/window_close_24px.svg" @click.native="closeWindow"/>
			<ImgSvg src="res/drawable/window_maximize_24px.svg" @click.native="maximizeWindow" v-if="!isMaximized"/>
			<ImgSvg src="res/drawable/window_unmaximize_24px.svg" @click.native="unmaximizeWindow" v-if="isMaximized"/>
			<ImgSvg src="res/drawable/window_minimize_24px.svg" @click.native="minimizeWindow"/>

		</div>

	</div>
</template>