<template>
	<div class="creativity_test">
		<transition name="fade" mode="out-in">
			<CodeGenerator
					class="creativity_sub_test"
					v-if="codeGeneratorModel"
					:view-model="codeGeneratorModel"/>
			<Description
					class="creativity_sub_test"
					v-if="descriptionModel"
					:view-model="descriptionModel"/>
			<Questions1
					class="creativity_sub_test"
					v-if="questions1Model"
					:view-model="questions1Model"/>
			<Questions2
					class="creativity_sub_test"
					v-if="questions2Model"
					:view-model="questions2Model"/>
			<Questions3
					class="creativity_sub_test"
					v-if="questions3Model"
					:view-model="questions3Model"/>
			<Tellegen
					class="creativity_sub_test"
					v-if="tellegenModel"
					:view-model="tellegenModel"/>
			<UnusualUse
					class="creativity_sub_test"
					v-if="unusualUseModel"
					:view-model="unusualUseModel"/>
			<Valence
					class="creativity_sub_test"
					v-if="valenceModel"
					:view-model="valenceModel"/>
			<Association
					class="creativity_sub_test"
					v-if="associationModel"
					:view-model="associationModel"/>
			<Ending
					class="creativity_sub_test"
					v-if="endingModel"
					:view-model="endingModel"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from "vue-property-decorator";

	import CodeGenerator from "src/view/tests/subtests/CodeGenerator.vue";
	import Description from "src/view/tests/subtests/Description.vue";
	import Questions1 from "src/view/tests/subtests/Questions1.vue";
	import Questions2 from "src/view/tests/subtests/Questions2.vue";
	import Questions3 from "src/view/tests/subtests/Questions3.vue";
	import Tellegen from "src/view/tests/subtests/Tellegen.vue";
	import UnusualUse from "src/view/tests/subtests/UnusualUse.vue";
	import Valence from "src/view/tests/subtests/Valence.vue";
	import Association from "src/view/tests/subtests/Association.vue";
	import Ending from "src/view/tests/subtests/Ending.vue";

	import {CreativityTestModel} from "src/viewmodel/tests/CreativityTestModel";
	import {CodeGeneratorModel} from "src/viewmodel/tests/subtests/CodeGeneratorModel";
	import {DescriptionModel} from "src/viewmodel/tests/subtests/DescriptionModel";
	import {Questions1Model} from "src/viewmodel/tests/subtests/Questions1Model";
	import {Questions2Model} from "src/viewmodel/tests/subtests/Questions2Model";
	import {Questions3Model} from "src/viewmodel/tests/subtests/Questions3Model";
	import {TellegenModel} from "src/viewmodel/tests/subtests/TellegenModel";
	import {UnusualUseModel} from "src/viewmodel/tests/subtests/UnusualUseModel";
	import {ValenceModel} from "src/viewmodel/tests/subtests/ValenceModel";
	import {AssociationModel} from "src/viewmodel/tests/subtests/AssociationModel";
	import {EndingModel} from "src/viewmodel/tests/subtests/EndingModel";

	@Component({
		components: {
			CodeGenerator,
			Description,
			Questions1,
			Questions2,
			Questions3,
			Tellegen,
			UnusualUse,
			Valence,
			Association,
			Ending
		}
	})
	export default class CreativityTestScreen extends Vue {

		@Prop(String) private readonly groupCode: string;

		private viewModel = new CreativityTestModel(this.groupCode);

		mounted() {
			this.viewModel.start();
		}

		destroyed() {
			this.viewModel.dispose();
			this.viewModel = null;
		}

		get codeGeneratorModel(): CodeGeneratorModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof CodeGeneratorModel ? subTest as CodeGeneratorModel : null;
		}

		get descriptionModel(): DescriptionModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof DescriptionModel ? subTest as DescriptionModel : null;
		}

		get questions1Model(): Questions1Model {
			const subTest = this.viewModel.subTest;
			return subTest instanceof Questions1Model ? subTest as Questions1Model : null;
		}

		get questions2Model(): Questions2Model {
			const subTest = this.viewModel.subTest;
			return subTest instanceof Questions2Model ? subTest as Questions2Model : null;
		}

		get questions3Model(): Questions3Model {
			const subTest = this.viewModel.subTest;
			return subTest instanceof Questions3Model ? subTest as Questions3Model : null;
		}

		get tellegenModel(): TellegenModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof TellegenModel ? subTest as TellegenModel : null;
		}

		get unusualUseModel(): UnusualUseModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof UnusualUseModel ? subTest as UnusualUseModel : null;
		}

		get valenceModel(): ValenceModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof ValenceModel ? subTest as ValenceModel : null;
		}

		get associationModel(): AssociationModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof AssociationModel ? subTest as AssociationModel : null;
		}

		get endingModel(): EndingModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof EndingModel ? subTest as EndingModel : null;
		}

		@Watch("viewModel.navigateToHome", {immediate: true})
		onNavigateToHome(event: Event) {
			if (event) this.$router.push({name: "Home"});
		}
	};
</script>


<style scoped>
	.creativity_test {
		background: var(--color_surface);
	}

	.creativity_sub_test {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>