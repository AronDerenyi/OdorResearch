<template>
	<div class="home_settings">
		<FloatingActionButton
				class="home_settings_locale"
				:style="{backgroundImage: huSelected ?
							`url(${require(`res/drawable/hungarian_selected.png`)})` :
							`url(${require('res/drawable/hungarian.png')})`}"
				@click="$emit('selectHU')"/>
		<FloatingActionButton
				class="home_settings_locale"
				:style="{backgroundImage: enSelected ?
							`url(${require('res/drawable/english_selected.png')})` :
							`url(${require('res/drawable/english.png')})`}"
				@click="$emit('selectEN')"/>
		<transition name="fade">
			<FloatingActionButton
					class="light home_settings_options"
					:icon="require('res/drawable/ic_apps_24px.svg')"
					v-if="showOptions"/>
		</transition>
		<transition name="fade">
			<FloatingActionButton
					class="light home_settings_back"
					:icon="require('res/drawable/ic_arrow_back_24px.svg')"
					v-if="showBack"
					@click="$emit('back')"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	@Component({components: {FloatingActionButton}})
	export default class HomeSettings extends Vue {

		@Prop(Boolean) private huSelected: boolean;
		@Prop(Boolean) private enSelected: boolean;

		@Prop(Boolean) private showOptions: boolean;
		@Prop(Boolean) private showBack: boolean;
	};
</script>

<style scoped>
	.home_settings {
		display: flex;

		flex-direction: row;
		align-items: center;
		justify-content: center;

		padding: var(--home_settings_padding);

		pointer-events: none;
	}

	.home_settings > .home_settings_locale:not(:first-child) {
		margin-left: var(--home_settings_spacing);
	}

	.home_settings_locale {
		background-position: center;
		background-size: cover;

		pointer-events: all;
	}

	.home_settings_options {
		position: absolute;
		bottom: var(--home_settings_padding);
		right: var(--home_settings_padding);

		pointer-events: all;
	}

	.home_settings_back {
		position: absolute;
		bottom: var(--home_settings_padding);
		left: var(--home_settings_padding);

		pointer-events: all;
	}
</style>