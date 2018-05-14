<template>
	<div>
		<header class="header">
			<nav class="primary">
				<a class="toggle" @click="toggleNav()"><i class="material-icons">menu</i></a>
				<div class="left" id="navigation">
					<router-link to="/" active-class="active" exact>
						{{ 'dashboard' | translate }}
					</router-link>
					<router-link to="/configuration" active-class="active">
						{{ 'configuration' | translate }}
					</router-link>
					<router-link to="/user" active-class="active">
						{{ 'users' | translate }}
					</router-link>
					<router-link to="/applications" active-class="active">
						{{ 'applications' | translate }}
					</router-link>
					<router-link to="/appearance" active-class="active">
						{{ 'appearance' | translate }}
					</router-link>
					<router-link to="/test" active-class="active">
						{{ 'other' | translate }}
					</router-link>
				</div>
				<div class="right">
					<a id="dropdown"><img src="/images/avatars/58-446b0bd040e05628ad190369e7ed8317a7d2cfc1.jpg" width="32" height="32"><i class="material-icons">keyboard_arrow_down</i></a>
				</div>
			</nav>
			<div class="page-title">
				<h1>
					{{ $root.$data.title }}
				</h1>
			</div>
			<nav class="secondary">
				<router-link v-for="item in subMenu" :to="`${item.path}`" active-class="active">
					{{ item.selector | translate }}
				</router-link>
			</nav>
		</header>
		<main class="main">
			<router-view></router-view>
		</main>

		<div class="dialog-container closed" id="sio-no-connection">
			<div class="dialog small">
				<div class="dialog-header">
					<span class="uppercase">{{ 'no-connection' | translate }}</span>
				</div>
				<div class="dialog-body">
					{{ 'trying-reconnect' | translate }}
					<div class="center-text" style="margin-top: 14px;">
						<i class="material-icons spin large">refresh</i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { sio } from './main';

	import menus from './menus.json';

	export default {
		data() {
			return {
				user: {
					username: "ilou"
				},
				subMenu: {

				}
			}
		},
		methods: {
			loadSubNavigation() {
				const section = this.$route.path.split("/")[1];

				if(menus[section]) {
					this.subMenu = menus[section];
				} else {
					this.subMenu = {};
				}
			},
			toggleNav() {
				$("#navigation").slideToggle();
			}
		},
		watch: {
			"$route" (to, from) {
				this.loadSubNavigation();
			}
		},
		created() {
			sio().on("disconnect", (reason) => {
				this.$root.openDialog("#sio-no-connection");
				sio().on("reconnect", (attemptNumber) => {
					this.$root.closeDialog("#sio-no-connection");
				});
			});
			this.loadSubNavigation();
		}
	}
</script>