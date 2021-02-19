<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Parameter</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Setting Parameter</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Data Parameterf">
      <b-button class="mb-3" variant="primary" :to="'/setting/parameter/add'"
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
              :to="'/setting/parameter/edit/' + props.row.id"
              >Edit</b-button
            >
            <b-button
              variant="danger"
              class="mr-2"
              :to="'/setting/parameter/edit/' + props.row.id"
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
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "data-parameter",
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
          label: "Topic",
          field: "txtTopic",
        },
        {
          label: "Control Point",
          field: "ControlPoint.txtName",
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
    getData() {
      const url = "/setting/parameter";
      this.$axios
        .get(url)
        .then((response) => {
        //   this.data = response.data.data.data;
        //   this.meta = response.data.data.meta;
          // console.log(this.meta)
          console.log(response.data.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>