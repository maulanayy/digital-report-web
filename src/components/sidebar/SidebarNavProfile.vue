<template>
	<ul class="nav">
		<li class="nav-profile">
			<a href="javascript:;" v-on:click="expand()">
				<div class="cover with-shadow"></div>
				<div class="image">
					<img src="@/assets/img/user/user-13.jpg" alt="">
				</div>
				<div class="info" v-if="this.$store.state.userdata != null">
					{{this.$store.state.userdata.txtUsername}}
					<small>{{this.$store.state.userdata.role}}</small>
				</div>
				<div class="info" v-else>
					<b class="caret pull-right"></b>
					Login
					<small></small>
				</div>
			</a>
		</li>
	</ul>
</template>

<script>
import PageOptions from '../../config/PageOptions.vue'

export default {
	name: 'SidebarNavProfile',
	data() {
		return {
			stat: '',
			pageOptions: PageOptions
		}
	},
	methods: {
		expand: function() {
			this.stat = (this.stat == 'expand') ? 'collapse' : 'expand'
		}
  }
}
</script>
