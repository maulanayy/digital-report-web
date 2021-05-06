<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Page with Footer</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Form</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Data Form">
      <b-button class="mb-3" variant="primary" :to="'/form/add'"
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
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'btn'">
            <b-button
              variant="primary"
              class="mr-2"
              @click="confirmApproval(props.row.id)"
              >Approve</b-button
            >
            <b-button
              variant="primary"
              class="mr-2"
              :to="'/form/edit/' + props.row.id"
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

    <b-overlay :show="confirmation_approval" no-wrap>
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
  name: "data-control-point",
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
          field: "txtFormName",
        },
        {
          label: "Product",
          field: "txtNameProduct",
        },
        {
          label: "No Document",
          field: "txtNoDok",
        },
        {
          label: "Production Date",
          field: "dtmProductionDate",
          type: "date",
          dateInputFormat: "yyyy-MM-dd'T'17:00:00.000'Z'",
          dateOutputFormat: "dd-MM-yyyy",
        },
        {
          label: "Created At",
          field: "dtmCreatedAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd'T'17:00:00.000'Z'",
          dateOutputFormat: "dd-MM-yyyy",
        },
        {
          label: "Approval",
          field: "txtApprovedBy",
        },
        {
          label: "Action",
          field: "btn",
        },
      ],
      confirmation: false,
      confirmation_approval: false,
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
      this.confirmation = false;
      this.confirmation_approval = false;
    },
    confirm(id) {
      this.formID = id;
      this.confirmation = true;
    },
    confirmApproval(id) {
      this.formID = id;
      this.confirmation_approval = true;
    },
    deleteData() {
      const url = "/form-data/" + this.areaID;
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
    approve() {
      const url = "/form-data/" + this.areaID + "/approve";
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
    getData() {
      const url = "/form-data";
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data.data.data;
          this.meta = response.data.data.meta;
          // console.log(this.meta)
          console.log(this.data);
        })
        .catch((error) => {
          this.$notify({
            title: `Update Data Failed : ${error}`,
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