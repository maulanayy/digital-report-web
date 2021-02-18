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
      </vue-good-table>
    </panel>
    <!-- end panel -->
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
          field: "txtName",
        },
        {
          label : "Product",
          field : "txtProductName"
        },
        {
          label: "No Document",
          field: "txtNoDok",
        },
        {
          label : "Production Date",
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
          label : "Approval",
          field : "txtApprovedBy"
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
      const url = "/form";
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