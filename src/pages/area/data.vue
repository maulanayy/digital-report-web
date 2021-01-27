<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Area</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Area</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Data Area">
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
  name: "data-area",
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
          label: "Lab",
          field: "lab",
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
          name: "Area-1",
          lab: "Lab Micro",
          createdAt: "2021-01-31",
        },
        {
          id: 2,
          name: "Area-2",
          lab: "Lab Micro",
          createdAt: "2021-01-31",
        },
        {
          id: 3,
          name: "Area-3",
          lab: "Lab Inline",
          createdAt: "2021-01-30",
        },
        {
          id: 4,
          name: "Area-4",
          lab: "Lab Micro",
          createdAt: "2021-01-11",
        },
        {
          id: 5,
          name: "Area-5",
          lab: "Lab Micro",
          createdAt: "2021-01-21",
        },
        {
          id: 6,
          name: "Area-6",
          lab: "Lab Inline",
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