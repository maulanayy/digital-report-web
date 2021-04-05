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
            <b-button variant="danger" class="mr-2" @click="confirm(props.row.id)">Delete</b-button>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </panel>
    <!-- end panel -->
    <b-overlay :show="confirmation" no-wrap>
      <template #overlay>
        <div ref="dialog" tabindex="-1" role="dialog" aria-modal="false" aria-labelledby="form-confirm-label"
          class="text-center p-3">
          <p><strong id="form-confirm-label">Are you sure?</strong></p>
          <div class="d-flex">
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              Cancel
            </b-button>
            <b-button variant="outline-success" @click="deleteData">OK</b-button>
          </div>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
  import PageOptions from "../../config/PageOptions.vue";

  export default {
    name: "data-users",
    data() {
      return {
        userID : "",
        confirmation : false,
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
            field: "TxtDepartment",
          },
          {
            label: "Role",
            field: "txtRoles",
          },
          {
            label: "Created At",
            field: "dtmCreatedAt",
            type: "date",
            dateInputFormat: "yyyy-MM-dd'T'17:00:00.000'Z'",
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
      onCancel() {
        this.confirmation = false
      },
      confirm(id){
        this.userID = id
        this.confirmation =true
      },
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
            console.log(error)
          });
      },
      deleteData() {
        const url = "/user/" + this.userID;
        this.$axios
          .delete(url, {})
          .then(() => {
            this.$notify({
              title: `Delete Data Success`,
              text: `Success`,
              type: "success",
            });

            setTimeout(() => {
              location.reload();
            }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Delete Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>