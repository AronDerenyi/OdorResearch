<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {PreferencesViewModel} from "src/viewmodel/PreferencesViewModel";

	@Component
	export default class HomeScreen extends Vue {

		preferencesViewModel = PreferencesViewModel.requireInstance();

		destroyed() {
			PreferencesViewModel.releaseInstance();
		}
	};
</script>

<template>
	<div class="container" style="
		align-items: center;
		justify-content: center;
		background: var(--color_background);">

		<h1 @click="preferencesViewModel.setLocale(preferencesViewModel.locale === 'en' ? 'hu' : 'en')" style="
			text-align: center;">

			T:{{$strings.test}}  {{preferencesViewModel.locale}}

		</h1>

		<RouterLink to="/test/mood">Go to test</RouterLink>

	</div>
</template>