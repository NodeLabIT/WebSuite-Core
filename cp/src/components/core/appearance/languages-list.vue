<template>
	<div>

	</div>
</template>

<script>
	import { sio } from '../../../main';
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		created() {
			this.$root.$data.title = this.$options.filters.translate('appearance');
		}
	}
</script>