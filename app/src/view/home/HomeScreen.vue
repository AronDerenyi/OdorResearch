<template>
	<div class="home_screen">
		<div class="home_cards">
			<HomeCard
					class="home_card"
					:title="viewModel.creativityTestTitle"
					:icon="require('res/drawable/ic_creativity_24px.svg')"
					:select="viewModel.select"
					@select="viewModel.selectCreativityTest()"/>
			<HomeCard
					class="home_card"
					:title="viewModel.memoryTestTitle"
					:icon="require('res/drawable/ic_memory_24px.svg')"
					:select="viewModel.select"
					@select="viewModel.selectMemoryTest()"/>
			<HomeCard
					class="home_card"
					:title="viewModel.moodTestTitle"
					:icon="require('res/drawable/ic_mood_24px.svg')"
					:select="viewModel.select"
					@select="viewModel.selectMoodTest()"/>
		</div>

		<transition name="pop_up">
			<HomeModal
					class="home_modal"
					v-if="viewModel.showModal"
					:viewModel="viewModel.modalModel"/>
		</transition>

		<HomeSettings
				class="home_settings"
				:huSelected="viewModel.huSelected"
				:enSelected="viewModel.enSelected"
				:showOptions="!viewModel.showModal"
				:showBack="viewModel.showModal"
				@selectHU="viewModel.setLanguageHU()"
				@selectEN="viewModel.setLanguageEN()"
				@back="viewModel.back()"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Watch} from "vue-property-decorator";

	import ImgSvg from "src/view/components/ImgSvg.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import HomeCard from "src/view/screens/home/HomeCard.vue";
	import HomeModal from "src/view/screens/home/HomeModal.vue";
	import HomeSettings from "src/view/screens/home/HomeSettings.vue";

	import {HomeModel} from "src/viewmodel/home/HomeModel";

	@Component({components: {ImgSvg, FloatingActionButton, HomeCard, HomeModal, HomeSettings}})
	export default class HomeScreen extends Vue {

		private viewModel = new HomeModel();

		destroyed() {
			this.viewModel.dispose();
			this.viewModel = null;
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
		justify-content: center;
		padding-bottom: var(--home_settings_height);

		background: var(--color_surface);
	}

	.home_cards {
		display: flex;

		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		padding: var(--home_cards_padding);
	}

	.home_cards > *:not(:first-child) {
		margin-left: var(--home_cards_spacing);
	}

	.home_card {
		width: var(--home_card_width);
		flex-shrink: 1;
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