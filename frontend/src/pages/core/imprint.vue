<template>
	<div>
		<h3>Impressum</h3>
		<h5>Angaben gemäß §5 TMG</h5>

		<div v-html="imprint.address"></div>
		<br/>
		<div>{{ imprint.email }}</div>
		<div>{{ imprint.phone }}</div>
	</div>
</template>

<script>
	import {sio} from "../../main";

	export default {
		data() {
			return {
				imprint: {}
			};
		},
		created() {
			sio().emit("imprint", {});

			sio().on("imprint", (data) => {
				console.log("received " + data);
				this.$root.rendered = true;
				this.imprint = data;
			});
		},
		beforeDestroy() {
			// Unregister socket-Listener
			sio().off("imprint");
		}
	};
</script>