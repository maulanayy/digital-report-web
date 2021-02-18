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
      <b-button class="mb-3" variant="primary" :to="'/user/add'">Create</b-button>
      <vue-good-table :columns="columns" :rows="data" :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: this.meta.perPage,
          position: 'bottom',
          perPageDropdown: [3, 7, 9],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
        }">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'btn'">
            <b-button variant="primary" class="mr-2" :to="'/user/edit/' + props.row.id">Edit</b-button>
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
        columns: [{
            label: "ID",
            field: "id",
            type: "number",
          },
          {
            label: "Name",
            field: "txtName",
          },
          {
            label: "Username",
            field: "txtUsername",
          },
          {
            label: "Department",
            field: "txtDepartment",
          },
          {
            label: "Role",
            field: "txtRoleName",
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
        data: [],
        meta: {},
      };
    },
    created() {
      PageOptions.pageWithFooter = true;
    },
    beforeRouteLeave(to, from, next) {
      PageOptions.pageWithFooter = false;
      next();
    },
    methods: {
      getData() {
        const url = "/user";
        this.$axios
          .get(url)
          .then((response) => {
            this.data = response.data.data.data;
            this.meta = response.data.data.meta;
            // console.log(this.meta)
            console.log(this.data);
          })
          .catch((error) => {
            this.err.push(error);
          });
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>