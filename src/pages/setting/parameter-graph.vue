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
          <div id="chart" class="widget-chart-content bg-white">
            <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
      </div>
      <!-- end col-8 -->
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-xl-12">
        <!-- begin panel -->
        <panel title="Data Parameter">
          <vue-good-table :columns="columns" :rows="data" :pagination-options="{
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
        }">
          </vue-good-table>
        </panel>
        <!-- end panel -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dashboard-graph",
    data() {
      return {
        series: [],
        chartOptions: {
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
            enabled: true,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Data Ewon",
            align: "left",
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: "left",
          },
          noData: {
            text: 'Loading...'
          }
        },
        columns: [{
            label: "Name",
            field: "txtName",
          },
          {
            label: "Topic",
            field: "txtTopic",
          },
          {
            label: "Value",
            field: "intValue"
          },
          {
            label: "Created At",
            field: "dtmCreatedAt",
            type: "date",
            dateInputFormat: "yyyy-MM-dd'T'17:00:00.000'Z'",
            dateOutputFormat: "dd-MM-yyyy",
          },
        ],
        data: [],
        meta: {},
        parameter: {},
        paramID: ""
      };
    },
    created() {
      var currentUrl = this.$route.path.split("/");
      this.paramID = currentUrl[3];
      console.log(this.paramID)
    },
    methods: {
      getData() {
        const url = "/parameter/" + this.paramID;
        this.$axios
          .get(url)
          .then((response) => {
            this.data = response.data.data.data;
            this.meta = response.data.data.meta;
            const dataSeries = this.data.map(value => {
              const res = {
                x : value.dtmCreatedAt,
                y : value.intValue
              }
              return res
            }) 
            console.log(dataSeries)
            this.series = [{
              name: response.data.data.parameter.txtName,
              data: dataSeries,
            }]
            
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    beforeMount() {
      this.getData();
    },
  };
</script>