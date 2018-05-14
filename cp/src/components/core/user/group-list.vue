<template>
	<div>
		<router-link to="/user/group/add" class="floating-button"><i class="material-icons">add</i><span class="text">{{ 'add-group' | translate }}</span></router-link>
		<div class="table-container">
			<table>
				<thead class="uppercase">
					<tr>
						<td class="row-group-1"></td>
						<td class="hidden-tiny row-group-2"></td>
						<td class="hidden-tiny row-group-3">{{ 'member-count' | translate }}</td>
						<td class="row-group-4"></td>
					</tr>
				</thead>
				<tbody>
				<tr v-for="group in groups">
					<td @click="$router.push(`/user/group/edit/${group.groupID}`)" class="pointer">
						<div class="inliner">
							<span class="primary-text">{{ group.groupName }}</span>
							<span class="hidden-tiny" id="description">{{ group.groupDescription }}</span>
						</div>
					</td>
					<td style="text-align: center;" class="hidden-tiny">
						<span class="badge" v-bind:style="{ 'background-color': group.displayColor, color: group.fontColor }" style="padding: 6px 10px; border-radius: 3px;">{{ group.displayName }}</span>
					</td>
					<td class="hidden-tiny">{{ getUserCount(group.groupID) }}</td>
					<td><i class="material-icons">more_horiz</i></td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style>
	.row-group-3 {
		width: 48px;
	}
	@media all and (min-width: 1081px) {
		.row-group-1 {
			width: calc(100% - 498px);
		}
		.row-group-2 {
			width: 300px;
		}
		.row-group-3 {
			width: 150px;
		}
		#description {
			height: 20px;
			overflow-y: hidden;
		}
	}
	@media all and (max-width: 1081px) {
		.row-group-1 {
			width: calc(100% - 48px);
		}
		.row-group-2, .row-group-3 {
			display: none;
		}
	}
</style>

<script>
	import { sio } from '../../../main';

	export default {
		data() {
			return {
				counts: [],
				groups: {}
			}
		},
		methods: {
			getUserCount(groupID) {
				return this.counts[groupID].count;
			}
		},
		created() {
			this.$root.$data.title = this.$options.filters.translate('users-management');
			sio().emit('cp-group-list', {});

			sio().on('cp-group-list', data => {
				if(data.groups === undefined) {
					return;
				}
				this.counts = data.counts;
				this.groups = data.groups;
			});
		}
	}
</script>