<template>
	<div class="home_screen">
		<div class="home_cards">
			<TestCard
					class="selectable home_card"
					:title="viewModel.creativityTestTitle"
					:description="viewModel.creativityTestDescription"
					@click="viewModel.selectCreativityTest()"/>
			<TestCard
					class="selectable home_card"
					:title="viewModel.memoryTestTitle"
					:description="viewModel.memoryTestDescription"
					@click="viewModel.selectMemoryTest()"/>
			<TestCard
					class="selectable home_card"
					:title="viewModel.moodTestTitle"
					:description="viewModel.moodTestDescription"
					@click="viewModel.selectMoodTest()"/>
		</div>

		<transition name="modal">
			<div class="home_terms_modal" v-if="viewModel.showTerms">
				<TestTerms
						class="home_terms"
						:title="viewModel.termsTitle"
						:content="viewModel.termsContent"
						:accept="viewModel.acceptAndStart"
						@accept="viewModel.startTest()"/>
			</div>
		</transition>

		<HomeSettings
				class="home_settings"
				:huSelected="viewModel.huSelected"
				:enSelected="viewModel.enSelected"
				:showOptions="!viewModel.showTerms"
				:showBack="viewModel.showTerms"
				@selectHU="viewModel.setLanguageHU()"
				@selectEN="viewModel.setLanguageEN()"
				@back="viewModel.unselectTest()"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Watch} from "vue-property-decorator";

	import ImgSvg from "src/view/components/ImgSvg.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import TestCard from "src/view/screens/home/TestCard.vue";
	import TestTerms from "src/view/screens/home/TestTerms.vue";
	import HomeSettings from "src/view/screens/home/HomeSettings.vue";

	import HomeModel from "src/viewmodel/HomeModel";

	@Component({components: {HomeSettings, ImgSvg, FloatingActionButton, TestCard, TestTerms}})
	export default class HomeScreen extends Vue {

		private viewModel = new HomeModel();

		destroyed() {
			this.viewModel.dispose();
		}

		@Watch("viewModel.navigateToCreativityTest")
		onNavigateToCreativityTest() {
			// TODO: Implement
		}

		@Watch("viewModel.navigateToMemoryTest")
		onNavigateToMemoryTest() {
			this.$router.push("/memory_test");
		}

		@Watch("viewModel.navigateToMoodTest")
		onNavigateToMoodTest() {
			// TODO: Implement
		}
	};
</script>

<style scoped>
	.home_screen {
		display: flex;

		flex-direction: column;
		padding-bottom: var(--home_settings_height);

		background: var(--color_surface);
	}

	.home_cards {
		flex-grow: 1;

		display: flex;

		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: var(--home_cards_padding);
	}

	.home_cards > *:not(:first-child) {
		margin-left: var(--home_cards_spacing);
	}

	.home_card {
		width: var(--home_card_width);
		height: var(--home_card_height);
		flex-shrink: 1;
	}

	.home_terms_modal {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		overflow-x: hidden;
		overflow-y: auto;

		background: var(--color_surface);

		box-shadow: 0 0 32px var(--color_shadow);
	}

	.home_terms {
		margin-bottom: calc(var(--home_settings_height));
	}

	.home_settings {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>