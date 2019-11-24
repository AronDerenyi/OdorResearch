<template>
	<div class="memory_test">
		<transition name="fade" mode="out-in">
			<CodeGenerator
					class="memory_sub_test"
					v-if="codeGeneratorModel"
					:view-model="codeGeneratorModel"/>
			<Description
					class="memory_sub_test"
					v-if="descriptionModel"
					:view-model="descriptionModel"/>
			<Questions1
					class="memory_sub_test"
					v-if="questions1Model"
					:view-model="questions1Model"/>
			<Questions2
					class="memory_sub_test"
					v-if="questions2Model"
					:view-model="questions2Model"/>
			<Questions3
					class="memory_sub_test"
					v-if="questions3Model"
					:view-model="questions3Model"/>
			<STMCapacity
					class="memory_sub_test"
					v-if="stmCapacityModel"
					:view-model="stmCapacityModel"/>
			<NonWordRepetition
					class="memory_sub_test"
					v-if="nonWordRepetitionModel"
					:view-model="nonWordRepetitionModel"/>
			<NonWordRecalling
					class="memory_sub_test"
					v-if="nonWordRecallingModel"
					:view-model="nonWordRecallingModel"/>
			<Gottschalk
					class="memory_sub_test"
					v-if="gottschalkModel"
					:view-model="gottschalkModel"/>
			<Association
					class="memory_sub_test"
					v-if="associationModel"
					:view-model="associationModel"/>
			<Ending
					class="memory_sub_test"
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
	import STMCapacity from "src/view/tests/subtests/STMCapacity.vue";
	import NonWordRepetition from "src/view/tests/subtests/NonWordRepetition.vue";
	import NonWordRecalling from "src/view/tests/subtests/NonWordRecalling.vue";
	import Gottschalk from "src/view/tests/subtests/Gottschalk.vue";
	import Association from "src/view/tests/subtests/Association.vue";
	import Ending from "src/view/tests/subtests/Ending.vue";

	import {MemoryTestModel} from "src/viewmodel/tests/MemoryTestModel";
	import {CodeGeneratorModel} from "src/viewmodel/tests/subtests/CodeGeneratorModel";
	import {DescriptionModel} from "src/viewmodel/tests/subtests/DescriptionModel";
	import {Questions1Model} from "src/viewmodel/tests/subtests/Questions1Model";
	import {Questions2Model} from "src/viewmodel/tests/subtests/Questions2Model";
	import {Questions3Model} from "src/viewmodel/tests/subtests/Questions3Model";
	import {STMCapacityModel} from "src/viewmodel/tests/subtests/STMCapacityModel";
	import {NonWordRepetitionModel} from "src/viewmodel/tests/subtests/NonWordRepetitionModel";
	import {NonWordRecallingModel} from "src/viewmodel/tests/subtests/NonWordRecallingModel";
	import {GottschalkModel} from "src/viewmodel/tests/subtests/GottschalkModel";
	import {AssociationModel} from "src/viewmodel/tests/subtests/AssociationModel";
	import {EndingModel} from "src/viewmodel/tests/subtests/EndingModel";

	@Component({
		components: {
			CodeGenerator,
			Description,
			Questions1,
			Questions2,
			Questions3,
			STMCapacity,
			NonWordRepetition,
			NonWordRecalling,
			Gottschalk,
			Association,
			Ending
		}
	})
	export default class MemoryTestScreen extends Vue {

		@Prop(String) private readonly groupCode: string;

		private viewModel = new MemoryTestModel(this.groupCode);

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

		get stmCapacityModel(): STMCapacityModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof STMCapacityModel ? subTest as STMCapacityModel : null;
		}

		get nonWordRepetitionModel(): NonWordRepetitionModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof NonWordRepetitionModel ? subTest as NonWordRepetitionModel : null;
		}

		get nonWordRecallingModel(): NonWordRecallingModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof NonWordRecallingModel ? subTest as NonWordRecallingModel : null;
		}

		get gottschalkModel(): GottschalkModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof GottschalkModel ? subTest as GottschalkModel : null;
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
	.memory_test {
		background: var(--color_surface);
	}

	.memory_sub_test {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>