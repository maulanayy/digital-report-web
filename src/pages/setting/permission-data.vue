<template>
	<div>
		<!-- begin breadcrumb -->
		<ol class="breadcrumb float-xl-right">
			<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
            <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
			<li class="breadcrumb-item active">Role</li>
		</ol>
		<!-- end breadcrumb -->
		<!-- begin page-header -->
		<h1 class="page-header">Setting Role</h1>
		<!-- end page-header -->
		
		<!-- begin panel -->
		<panel title="Panel Title here">
			Panel Content Here
		</panel>
		<!-- end panel -->
	</div>
</template>

<script>
import PageOptions from '../../config/PageOptions.vue'

export default {
	created() {
		PageOptions.pageWithFooter = true;
	},
	beforeRouteLeave (to, from, next) {
		PageOptions.pageWithFooter = false;
		next();
	}
}
</script>