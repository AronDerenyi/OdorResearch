<template>
	<div class="dashboard_screen">

	</div>
</template>

<script lang="ts">
	import {Vue, Component, Watch} from "vue-property-decorator";

	import ImgSvg from "src/view/components/ImgSvg.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import HomeCard from "src/view/home/HomeCard.vue";
	import HomeModal from "src/view/home/HomeModal.vue";
	import HomeSettings from "src/view/home/HomeSettings.vue";

	import {HomeModel} from "src/viewmodel/home/HomeModel";
	import {Event} from "src/viewmodel/ViewModel";

	@Component({components: {ImgSvg, FloatingActionButton}})
	export default class DashboardScreen extends Vue {

		private viewModel = new HomeModel();

		destroyed() {
			this.viewModel.dispose();
			this.viewModel = null;
		}
	};
</script>

<style scoped>
	.home_screen {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
		padding-bottom: var(--home_settings_height);

		background: var(--color_surface);
	}

	.home_cards {
		display: flex;

		justify-content: center;
		padding: var(--home_cards_padding);
	}

	.home_cards > *:not(:first-child) {
		margin-left: var(--home_cards_spacing);
	}

	.home_card {
		width: var(--home_card_width);
	}

	.home_modal {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.home_settings {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>