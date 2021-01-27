<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Users</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Users</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Data Users">
      <b-button class="float-right mb-3" variant="primary"
        >Create User</b-button
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
  name: "data-users",
  data() {
    return {
      columns: [
        {
          label: "ID",
          field: "id",
          type: "number",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Username",
          field: "username",
        },
        {
          label: "Role",
          field: "role",
        },
        {
          label: "Created At",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "dd-MM-yyyy",
        },
        {
          label: "Action",
          field: "btn",
        },
      ],
      rows: [
        {
          id: 1,
          name: "John",
          username: "john",
          role: "superadmin",
          createdAt: "2021-01-31",
        },
        {
          id: 2,
          name: "Jane",
          username: "jane",
          role: "admin",
          createdAt: "2021-01-31",
        },
        {
          id: 3,
          name: "Susan",
          username: "susan",
          role: "admin",
          createdAt: "2021-01-30",
        },
        {
          id: 4,
          name: "Chris",
          username: "chris",
          role: "admin",
          createdAt: "2021-01-11",
        },
        {
          id: 5,
          name: "Dan",
          username: "dan",
          role: "admin",
          createdAt: "2021-01-21",
          score: 0.03343,
        },
        {
          id: 6,
          name: "John",
          username: "john",
          role: "inspector",
          createdAt: "2021-01-31",
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