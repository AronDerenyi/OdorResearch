<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {PreferencesViewModel} from "src/viewmodel/PreferencesViewModel";

	import MoodTestInit from "src/app/screens/home/MoodTestInit.vue";
	import MoodTestOptions from "src/app/screens/home/MoodTestOptions.vue";
	import CreativityTestInit from "src/app/screens/home/CreativityTestInit.vue";
	import CreativityTestOptions from "src/app/screens/home/CreativityTestOptions.vue";

	@Component({components: {MoodTestInit, MoodTestOptions, CreativityTestInit, CreativityTestOptions}})
	export default class HomeScreen extends Vue {

		private selectedTab: number = 0;

		preferencesViewModel = PreferencesViewModel.requireInstance();

		destroyed() {
			PreferencesViewModel.releaseInstance();
		}

		selectMoodTest() {
			this.selectedTab = 0;
		}

		selectCreativityTest() {
			this.selectedTab = 1;
		}

		get isMoodTestSelected(): boolean {
			return this.selectedTab == 0;
		}

		get isCreativityTestSelected(): boolean {
			return this.selectedTab == 1;
		}
	};
</script>

<template>
	<div class="container" style="
		background: var(--color_surface);">

		<div class="toolbar" style="
			height: 120px;
			flex-grow: 0;
			flex-shrink: 0;
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			justify-content: center;">

			<div :selected="isMoodTestSelected" @click="selectMoodTest" class="tab">

				<div :selected="isMoodTestSelected" @click="selectMoodTest" class="tab_text">

					{{$strings.mood_test}}

				</div>

			</div>

			<div :selected="isCreativityTestSelected" @click="selectCreativityTest" class="tab">

				<div :selected="isMoodTestSelected" @click="selectMoodTest" class="tab_text">

					{{$strings.creativity_test}}

				</div>

			</div>

		</div>

		<div style="
			flex-grow: 1;
			flex-basis: 0;
			display: flex;
			flex-direction: row;">

			<div style="
				position: relative;
				flex-grow: 1;
				flex-basis: 0;
				overflow: hidden;">

				<transition name="fade">

					<MoodTestInit v-if="isMoodTestSelected" class="overlay"/>
					<CreativityTestInit v-if="isCreativityTestSelected" class="overlay"/>

				</transition>

			</div>

			<div style="
				position: relative;
				width: var(--home_options_width);
				flex-grow: 0;
				flex-shrink: 0;
				overflow: hidden;">

				<transition name="fade">

					<MoodTestOptions v-if="isMoodTestSelected" class="overlay"/>
					<CreativityTestOptions v-if="isCreativityTestSelected" class="overlay"/>

				</transition>

			</div>

		</div>

	</div>
</template>