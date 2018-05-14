<template>
	<div class="extra-margin">
		<a class="floating-button extra-margin" @click="save()">
			<i class="material-icons">save</i>
			<span class="text">{{ 'save-changes' | translate }}</span>
		</a>
		<form>
			<div>
				<input type="text" id="title" v-model="access.maintenanceReason" class="large" v-bind:class="{ valid: $root.isValid(access.maintenanceReason) }" />
				<label for="title" class="floating-label">{{ 'maintenance' | translate }}</label>
				<span class="helper">
					{{ 'maintenance-helper' | translate }}
				</span>
			</div>
		</form>
	</div>
</template>

<script>
	import { sio } from '../../../main';
	export default {
		data() {
			return {
				access: {}
			}
		},
		methods: {
			save() {
				sio().emit('cp-save-access-configuration', this.access);
			}
		},
		created() {
			this.$root.$data.title = this.$options.filters.translate('configuration');

			sio().emit('cp-access-configuration', {});
			sio().on('cp-access-configuration', (data) => {
				this.access = data;
			});
		}
	}
</script>