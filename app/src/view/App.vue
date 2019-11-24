<template>
	<div class="app">
		<transition name="page">
			<RouterView class="app_screen"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";

	import ImgSvg from "src/view/components/ImgSvg.vue";

	import HomeScreen from "src/view/home/HomeScreen.vue";
	import DashboardScreen from "src/view/dashboard/DashboardScreen.vue";
	import CreativityTestScreen from "src/view/tests/CreativityTestScreen.vue";
	import MemoryTestScreen from "src/view/tests/MemoryTestScreen.vue";
	import MoodTestScreen from "src/view/tests/MoodTestScreen.vue";

	@Component({components: {ImgSvg}})
	export default class App extends Vue {

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
					path: "/dashboard",
					name: "Dashboard",
					component: DashboardScreen
				},
				{
					path: "/creativity_test",
					name: "Creativity Test",
					component: CreativityTestScreen,
					props: true
				},
				{
					path: "/memory_test",
					name: "Memory Test",
					component: MemoryTestScreen,
					props: true
				},
				{
					path: "/mood_test",
					name: "Mood Test",
					component: MoodTestScreen,
					props: true
				}
			]);
		}
	};
</script>

<style scoped>
	.app {
		position: relative;
		width: 100%;
		height: 100%;

		overflow: hidden;
	}

	.app_screen {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>