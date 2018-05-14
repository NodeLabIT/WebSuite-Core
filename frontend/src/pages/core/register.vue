<template>
	<div class="highlighted">
		<h3>Registrieren</h3>
		<div class="grid" v-if="!$root.loggedIn">
			<div class="row">
				<div class="col col2">
					<div class="maintext">
						Fülle das Formular aus, um Dir einen Nutzeraccount zu erstellen. Mit einem Klick auf
						"Registrieren" bestätigst du, dass Du die Nutzungsbedienungen gelesen hast und diesen zustimmst.
					</div>
					<div class="alert error" v-if="err !== undefined"><b>Beim Registrieren ist ein Fehler
						aufgetreten:</b><br/>
						<span>
                            {{ err.err | translate }}
                        </span>
					</div>
					<br/>
					<form class="relative">
						<div>
							<input type="email" v-model="email" placeholder="E-Mail-Adresse">
							<span></span>
						</div>
						<br/>
						<div>
							<input type="text" v-model="username" placeholder="Nutzername">
							<span></span>
						</div>
						<br/>
						<div>
							<input type="password" v-model="password" placeholder="Passwort">
							<span></span>
						</div>
						<br/>
						<div style="text-align: center;">
							<button @click="executeRecaptcha" class="mainbutton">Registrieren</button>
						</div>
						<recaptcha ref="recaptcha" @verify="register"></recaptcha>
					</form>
				</div>
				<div class="col col2" style="text-align: center">
					<div class="maintext">
						Du hast bereits einen Account? Dann melde dich hier an:
					</div>
					<router-link to="/login" class="mainbutton">Hier Anmelden</router-link>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="alert error">
				Du kannst nicht auf diese Seite zugreifen, wenn du angemeldet bist.
			</div>
		</div>
	</div>
</template>

<script>
	import {sio} from "../../main";
	import Recaptcha from "../../Recaptcha.vue";

	export default {
		data() {
			return {
				email: "ch@nge.me",
				username: "ilou",
				password: "foobar",
				err: undefined,
				registering: ""
			};
		},
		components: {Recaptcha},
		methods: {
			executeRecaptcha() {
				event.preventDefault();
				this.$refs.recaptcha.execute();
			},
			register(response) {
				if (this.registering === "") {
					this.registering = response;
					sio().emit("register", {
						email: this.email,
						username: this.username,
						password: this.password,
						captcha: response
					});
				}
			}
		},
		created() {
			this.$root.rendered = true;
			sio().once("register", (data) => {
				this.registering = "";
				if (data.err) {
					this.err = {
						err: data.err,
						id: data.id
					};
				} else {
					this.err = undefined;
					this.$root.loggedIn = true;
					this.$root.user = {
						userID: data.userID,
						username: data.username
					};
					this.$cookies.set("userID", data.userID, 8 * 60 * 60);
					this.$cookies.set("sessionID", data.sessionID, 8 * 60 * 60);

					this.$router.push("/member/user/" + data.userID + "-" + data.username);
				}
			});
		}
	};
</script>