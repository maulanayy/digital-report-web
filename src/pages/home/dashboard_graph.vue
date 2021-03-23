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
            <apexchart
              type="area"
              height="350"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
      <!-- end col-8 -->
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-md-3" v-for="param in data" :key="param.id">
        <!-- begin widget-card -->
        <a
          href="#"
          class="widget-card widget-card-rounded m-b-20"
          data-id="widget"
        >
          <div class="widget-card-cover"></div>
          <div class="widget-card-content">
            <h5
              class="f-s-12 text-black-transparent-7"
              data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7"
              data-dark-class="f-s-12 text-white-transparent-7"
            >
              <b>{{ param.parameter_name }}</b>
            </h5>
            <div
              class="widget-icon widget-icon-lg rounded bg-primary pull-left m-r-10 m-b-5 text-white"
            >
              <i class="fab fa-twitter"></i>
            </div>

            <h3
              class="f-lg-12 text-black-transparent-7 pl-10"
              data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7"
              data-dark-class="f-s-12 text-white-transparent-7"
            >
              <b>Value</b>
            </h3>
            <h4 class="f-lg-11 text-black-transparent-7" data-id="widget-elm">
              <b>{{ param.value }}</b>
            </h4>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard-graph",
  data() {
    return {
      series: [
        {
          name: "STOCK ABC",
          data: [30, 20, 10, 50, 230, 42, 34, 61],
        },
      ],
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
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "parameter_update Parameter Graphic",
          align: "left",
        },
        subtitle: {
          text: "fluid 100/mg movement",
          align: "left",
        },
        labels: [
          "2021-03-10",
          "2021-03-11",
          "2021-03-12",
          "2021-03-13",
          "2021-03-14",
          "2021-03-15",
          "2021-03-16",
          "2021-03-17",
        ],
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: true,
        },
        legend: {
          horizontalAlign: "left",
        },
      },

      cpID: "",
      data: [],
    };
  },
  created: function () {
    var currentUrl = this.$route.path.split("/");
    this.cpID = currentUrl[3];
  },
  methods: {
    getData() {
      const url = "/setting/parameter/" + this.cpID + "/control-point";
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data.data.data;
          console.log(this.data);
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