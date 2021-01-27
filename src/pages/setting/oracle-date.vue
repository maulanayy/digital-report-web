<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Oracle Connection</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Setting Oracle Connection</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Oracle Setting">
      <b-button class="float-right mb-3" variant="primary"
        >Create Connection</b-button
      >
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'bottom',
          perPageDropdown: [3, 7, 9],
          dropdownAllowAll: false,
          setCurrentPage: 2,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
        }"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'btn'">
            <b-button variant="primary" class="mr-2">Edit</b-button>
            <b-button variant="danger" class="mr-2">Delete</b-button>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </panel>
    <!-- end panel -->
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "data-role",
  data() {
    return {
      columns: [
        {
          label: "Hostname",
          field: "hostname",
        },
        {
          label: "IP Address",
          field: "ip_address",
        },
        {
          label: "Password",
          field: "password",
        },
        {
          label: "Action",
          field: "btn",
        },
      ],
      rows: [
        {
          id: 1,
          hostname: "m*******c",
          ip_address: "1*******3",
          password: "********",
          btn: "<button class='primary'>Edit</button>",
        },
      ],
    };
  },
  created() {
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
};
</script>