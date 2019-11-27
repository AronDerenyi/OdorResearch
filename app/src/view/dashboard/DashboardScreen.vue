<template>
	<div class="dashboard_screen">
		<p class="dashboard_title">{{viewModel.title}}</p>
		<div
				v-for="session in viewModel.sessionList"
				:key="session.group + session.user"
				class="card dashboard_session">

			<p class="dashboard_session_group">{{session.group}}</p>
			<p class="dashboard_session_user">{{session.user}}</p>

			<div
					class="dashboard_session_button selectable"
					@click="viewModel.saveSession(session.group, session.user)">

				<ImgSvg
						class="dashboard_session_button_icon"
						:src="require('res/drawable/ic_save_24px.svg')"/>

			</div>

		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import ImgSvg from "src/view/components/ImgSvg.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import {DashboardModel} from "src/viewmodel/dashboard/DashboardModel";

	@Component({components: {ImgSvg, FloatingActionButton}})
	export default class DashboardScreen extends Vue {

		private viewModel = new DashboardModel();

		destroyed() {
			this.viewModel.dispose();
			this.viewModel = null;
		}
	};
</script>

<style scoped>
	.dashboard_screen {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
		align-items: center;
		padding: var(--dashboard_padding);

		background: var(--color_surface);
	}

	.dashboard_screen > *:not(:first-child) {
		margin-top: var(--dashboard_spacing);
	}

	.dashboard_title {
		font-size: var(--dashboard_title_size);
	}

	.dashboard_session {
		display: flex;
		max-width: 100%;
		width: var(--dashboard_session_width);
		height: var(--dashboard_session_height);

		padding-left: var(--dashboard_session_padding);
		padding-right: var(--dashboard_session_padding);
		align-items: center;
	}

	.dashboard_session > *:not(:first-child) {
		margin-left: var(--dashboard_session_spacing);
	}

	.dashboard_session_group {
		color: var(--color_primary);
		font-size: var(--dashboard_session_name_size);
	}

	.dashboard_session_user {
		flex-grow: 1;
		font-size: var(--dashboard_session_name_size);
	}

	.dashboard_session_button {
		display: flex;
		padding: var(--dashboard_session_button_padding);
		border-radius: 100%;
	}

	.dashboard_session_button_icon {
		width: var(--dashboard_session_icon_size);
		height: var(--dashboard_session_icon_size);
		fill: var(--color_primary);
	}
</style>