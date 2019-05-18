<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {PreferencesViewModel} from "src/viewmodel/PreferencesViewModel";

	import ImgSvg from "src/app/components/ImgSvg.vue";

	@Component({components: {ImgSvg}})
	export default class CreativityTestOptions extends Vue {

		preferencesViewModel = PreferencesViewModel.requireInstance();

		destroyed() {
			PreferencesViewModel.releaseInstance();
		}
	};
</script>

<template>
	<div class="container" style="
		padding: var(--home_padding);
		background: var(--color_surface_variant);">

	</div>
</template>