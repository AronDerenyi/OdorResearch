<template>
	<div class="home_modal">
		<transition :name="viewModel.showTerms ? 'swipe_left' : 'swipe_right'">
			<div class="home_modal_code_content" v-if="!viewModel.showTerms" key="code">
				<p class="home_modal_title">{{viewModel.title}}</p>
				<p class="home_modal_hint">{{viewModel.groupCodeHint}}</p>
				<div class="home_modal_input_holder">
					<EditText
							class="home_modal_input"
							:placeholder="viewModel.groupCodePlaceholder"
							v-model="viewModel.groupCode"/>

					<transition name="fade">
						<FloatingActionButton
								class="flat light home_modal_next"
								v-if="viewModel.showNext"
								:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
								@click="viewModel.next()"/>
					</transition>
				</div>
			</div>
			<div class="home_modal_terms_content" v-if="viewModel.showTerms" key="terms">
				<p class="home_modal_title">{{viewModel.title}}</p>
				<p class="home_modal_terms" v-html="viewModel.terms"></p>
				<ExtendedFloatingActionButton
						class="flat home_modal_accept"
						:text="viewModel.acceptTerms"
						@click="viewModel.accept()"/>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	import {HomeModalModel} from "src/viewmodel/home/HomeModalModel";
	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";

	@Component({components: {ExtendedFloatingActionButton, FloatingActionButton, EditText}})
	export default class TestModal extends Vue {

		@Prop() private viewModel: HomeModalModel;
	};
</script>

<style scoped>
	.home_modal {
		background: var(--color_surface);
		box-shadow: 0 0 32px var(--color_shadow);
	}

	.home_modal_code_content,
	.home_modal_terms_content {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;

		padding:
				var(--home_modal_padding)
				var(--home_modal_padding)
				calc(var(--home_settings_height) + var(--home_modal_padding));

		flex-direction: column;
		align-items: center;
	}

	.home_modal_code_content {
		overflow: hidden;
		justify-content: center;
	}

	.home_modal_terms_content {
		overflow-x: hidden;
		overflow-y: auto;
		justify-content: flex-start;
	}

	.home_modal_title {
		flex-shrink: 0;

		text-align: center;
		font-size: var(--home_modal_title_size);
	}

	.home_modal_hint {
		margin-top: var(--home_modal_hint_space);
		flex-shrink: 0;

		color: var(--color_on_surface_variant);
		text-align: center;
		font-size: var(--home_modal_hint_size);
	}

	.home_modal_input_holder {
		position: relative;
		margin-top: var(--home_modal_input_space);
		flex-shrink: 0;
		width: var(--home_modal_input_width);

		display: flex;
		flex-direction: column;
	}

	.home_modal_input {
		flex-grow: 1;
	}

	.home_modal_next {
		position: absolute;
		top: 0;
		bottom: 0;
		left: calc(100% + var(--home_modal_next_space));
	}

	.home_modal_terms {
		flex-shrink: 0;

		margin-top: var(--home_modal_terms_space);
		width: var(--home_modal_terms_width);

		text-align: justify;
		font-size: var(--home_modal_terms_size);
	}

	.home_modal_accept {
		flex-shrink: 0;
		margin-top: var(--home_modal_accept_space);
	}
</style>