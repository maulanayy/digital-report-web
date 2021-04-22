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
    <div class="row">
      <div class="col-md-3" v-for="cp in data" :key="cp.id">
        <!-- begin widget-card -->
        <a
          :href="'/dashboard/graph/'+cp.ID"
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
              <b>{{cp.txtName}}</b>
            </h5>
            <div
              class="widget-img widget-img-lg rounded bg-inverse pull-left m-r-10 m-b-5"
              style="
                background-image: url(../assets/img/gallery/gallery-22-thumb.jpg);
              "
            ></div>
            <h3
              class="f-lg-12 text-black-transparent-7 pl-10"
              data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7"
              data-dark-class="f-s-12 text-white-transparent-7"
            >
              <b>TOTAL</b>
            </h3>
            <h4 class="f-lg-11 text-black-transparent-7" data-id="widget-elm">
              <b>{{cp.total_parameter}} PARAMETER</b>
            </h4>
          </div>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getData() {
      const url = "/control-point/parameter";
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data.data.data;
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