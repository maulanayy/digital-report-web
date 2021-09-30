<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Lab</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Lab</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Data Lab">
      <b-button class="mb-3" variant="primary" :to="'/lab/add'"
        >Create</b-button
      >
      <vue-good-table
        :columns="columns"
        :rows="data"
        :totalRows="meta.total"
        :isLoading.sync="isLoading"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: this.meta.perPage,
          position: 'bottom',
          dropdownAllowAll: false,
          perPageDropdownEnabled: false,
          setCurrentPage: 1,
          perPage : 10,
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
              :to="'/lab/edit/' + props.row.id"
              >Edit</b-button
            >
            <b-button
              variant="danger"
              class="mr-2"
              @click="confirm(props.row.id)"
              >Delete</b-button
            >
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
        <div
          ref="dialog"
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3"
        >
          <p><strong id="form-confirm-label">Are you sure?</strong></p>
          <div class="d-flex">
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              Cancel
            </b-button>
            <b-button variant="outline-success" @click="deleteData"
              >OK</b-button
            >
          </div>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "data-lab",
  data() {
    return {
      labID: "",
      isLoading: false,
      confirmation: false,
      columns: [
        {
          label: "ID",
          field: "id",
          type: "number",
        },
        {
          label: "Name",
          field: "txtName",
        },
        {
          label: "Created At",
          field: "dtmCreatedAt",
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
      this.confirmation = false;
    },
    confirm(id) {
      this.labID = id;
      this.confirmation = true;
    },
    getData(query) {
      const url = "/lab";

      this.$axios
        .get(url, { params: query })
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
      const url = "/lab/" + this.labID;
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