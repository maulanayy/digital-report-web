<template>
  <div>
    <!-- begin breadcrumb -->
    <!-- <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
            <li class="breadcrumb-item"><a href="javascript:;">Dashboard</a></li>
        </ol> -->
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">
      PT Kalbe Morinaga Indonesia ||
      <small>Digital Quality Management System</small>
    </h1>
    <!-- end page-header -->
    <!-- begin row -->
    <div class="row">
      <!-- begin col-8 -->
      <div class="col-xl-12">
        <div class="widget-chart with-sidebar">
          <div id="chart" height="350" class="widget-chart-content bg-white">
            <apexchart
              type="line"
              :options="chartDosingKadarAir"
              :series="seriesDosingKadarAir"
            >
            </apexchart>
          </div>
        </div>
      </div>
      <!-- end col-8 -->
    </div>
    <div class="row">
      <div class="col-xl-12">
        <panel title="Data Area">
          <b-button class="mb-3" variant="primary" :to="'/area/add'"
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
              setCurrentPage: 1,
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
                  :to="'/area/edit/' + props.row.id"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard-graph",
  data() {
    return {
      chartDosingKadarAir: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: true,
            type: "x",
            zoomedArea: {
              fill: {
                color: "#90CAF9",
                opacity: 0.4,
              },
              stroke: {
                color: "#0D47A1",
                opacity: 0.4,
                width: 1,
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Grafik Dosing Kadar Air VS TOC",
          align: "left",
          style: {
            fontSize: "12px",
          },
        },

        xaxis: {
          type: "int",
          title: {
            text: "dosing",
          },
        },
        yaxis: [
          {
            opposite: true,
            title: {
              text: "Kadar Air",
            },
            min: 2.0,
            max: 3.4,
          },
          {
            seriesName: "TOC",
            opposite: true,
            title: {
              text: "TOC",
            },
            min: 92.0,
            max: 97.5,
          },
        ],
        legend: {
          show: true,
          horizontalAlign: "left",
        },
      },
      seriesDosingKadarAir: [
        {
          name: "Kadar Air",
          type: "line",
          data: [
            2.77,
            2.91,
            2.94,
            2.77,
            2.9,
            3.03,
            2.93,
            2.89,
            2.88,
            2.84,
            2.7,
            2.9,
          ],
        },
        {
          name: "TOC",
          type: "line",
          data: [95.6, 95.6, 95.6, 94.6, 94.7, 95.1, 94.4, 95.3, 96.3, 95.1],
        },
      ],
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
          label: "Lab",
          field: "labTxtName",
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
      cpID: "",
    };
  },
  created: function () {
    this.cpID = 1;
  },
  methods: {
    getData() {
      const url = "/area";
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