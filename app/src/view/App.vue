<template>
	<div class="container" style="
		position: relative;
		width: 100%;
		height: 100%;">

		<transition name="page">

			<RouterView class="overlay"/>

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

			<ImgSvg src="res/drawable/ic_window_close_24px.svg" @click.native="closeWindow"/>
			<ImgSvg src="res/drawable/ic_window_maximize_24px.svg" @click.native="maximizeWindow" v-if="!isMaximized"/>
			<ImgSvg src="res/drawable/ic_window_unmaximize_24px.svg" @click.native="unmaximizeWindow" v-if="isMaximized"/>
			<ImgSvg src="res/drawable/ic_window_minimize_24px.svg" @click.native="minimizeWindow"/>

		</div>

	</div>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import Electron from "electron";

	import ImgSvg from "src/view/components/ImgSvg.vue";

	import HomeScreen from "src/view/screens/home/HomeScreen.vue";

	import CreativityTestScreen from "src/view/screens/creativitytest/CreativityTestScreen.vue";
	import MemoryTestScreen from "src/view/screens/memorytest/MemoryTestScreen.vue";
	import MoodTestScreen from "src/view/screens/moodtest/MoodTestScreen.vue";

	@Component({components: {ImgSvg}})
	export default class App extends Vue {

		// noinspection TypeScriptUnresolvedVariable
		private platform: string = process.platform;
		private window = Electron.remote.getCurrentWindow();

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
					path: "/creativity_test",
					name: "Creativity Test",
					component: CreativityTestScreen
				},
				{
					path: "/memory_test",
					name: "Memory Test",
					component: MemoryTestScreen
				},
				{
					path: "/mood_test",
					name: "Mood Test",
					component: MoodTestScreen
				}
			]);

			this.isMaximized = this.window.isMaximized();

			this.window.on("maximize", () => this.isMaximized = true);
			this.window.on("unmaximize", () => this.isMaximized = false);
			this.window.on("resize", () => this.isMaximized = false);
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

<style scoped>

</style>