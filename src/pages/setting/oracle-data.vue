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
      <b-button class="mb-3" variant="primary" :to="'/setting/oracle/add'"
        >Create</b-button
      >
      <vue-good-table
        :columns="columns"
        :rows="data"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: this.meta.perPage,
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
        @on-page-change="onPageChange"
        @on-per-page-change="onPageChange"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'btn'">
            <b-button
              variant="primary"
              class="mr-2"
              :to="'/setting/oracle/edit/' + props.row.id"
              >Edit</b-button
            >
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
  name: "data-role",
  data() {
    return {
      oracleID : "",
        confirmation: false,
      columns: [
        {
          label : "ID",
          field : "id",
        },
        {
          label: "Username",
          field: "txtHost",
        },
        {
          label: "IP Address",
          field: "txtIP",
        },
        {
          label: "Password",
          field: "txtPassword",
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
    onPageChange(params) {
      const query = {
        page: params.currentPage,
        limit: params.currentPerPage,
      };

      this.getData(query);
    },
    onCancel() {
        this.confirmation = false
      },
      confirm(id){
        this.oracleID = id
        this.confirmation =true
      },
    getData(param) {
      const url = "/setting/oracle";
      this.$axios
        .get(url,param)
        .then((response) => {
          this.data = response.data.data.data;
          this.meta = response.data.data.meta;
          // console.log(this.meta)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteData() {
        const url = "/setting/oracle/" + this.oracleID;
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
    const query = {
        page: 1,
        limit: 5,
      };

      this.getData(query);
  },
};
</script>