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
      <!-- begin col-3 -->
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-green">
          <div class="stats-icon">
            12<i class="fas fa-lg fa-fw m-r-10 fa-angle-up"></i>
          </div>
          <div class="stats-info">
            <p>35 Lots</p>
            <p>450 Ton</p>
          </div>
          <div class="stats-link">
            <a href="javascript:;"
              >View Detail <i class="fa fa-arrow-alt-circle-right"></i
            ></a>
          </div>
        </div>
      </div>
      <!-- end col-3 -->
      <!-- begin col-3 -->
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-orange">
          <div class="stats-icon">
            1<i class="fas fa-lg fa-fw m-r-10 fa-angle-down"></i>
          </div>
          <div class="stats-info">
            <p>6 Lots</p>
            <p>23 Ton</p>
          </div>
          <div class="stats-link">
            <a href="javascript:;"
              >View Detail <i class="fa fa-arrow-alt-circle-right"></i
            ></a>
          </div>
        </div>
      </div>
      <!-- end col-3 -->
      <!-- begin col-3 -->
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-red">
          <div class="stats-icon">
            3<i class="fas fa-lg fa-fw m-r-10 fa-angle-down"></i>
          </div>
          <div class="stats-info">
            <p>3 Lots</p>
            <p>12 Ton</p>
          </div>
          <div class="stats-link">
            <a href="javascript:;"
              >View Detail <i class="fa fa-arrow-alt-circle-right"></i
            ></a>
          </div>
        </div>
      </div>
      <!-- end col-3 -->
      <!-- begin col-3 -->
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-black-lighter">
          <div class="stats-info">
            <p>44 Lots</p>
            <p>485 Ton</p>
          </div>
          <div class="stats-link">
            <a href="javascript:;"
              >View Detail <i class="fa fa-arrow-alt-circle-right"></i
            ></a>
          </div>
        </div>
      </div>
      <!-- end col-3 -->
    </div>
    <!-- end row -->
    <panel title="Data Lots">
      <vue-good-table
        :columns="columns"
        :rows="data"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: this.meta.perPage,
          position: 'bottom',
          perPageDropdown: [5, 10, 15],
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
      </vue-good-table>
    </panel>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      data: [],
      columns: [
        {
          label: "OKP",
          field: "BATCH_ID",
        },
        {
          label: "Item",
          field: "ITEM_CODE",
        },
        {
          label: "Item Description",
          field: "DESCRIPTION",
        },
        {
          label: "Primary UOM",
          field: "primary_uom",
        },
        {
          label: "Secondary On hand",
          field: "SECONDARY_TRANSACTION_QUANTITY",
        },
        {
          label: "Lot",
          field: "lot",
        },
        {
          label: "Lot Expire Date",
          field: "EXPIRATION_DATE",
        },
        {
          label: "Origination Date",
          field: "origination_date",
        }
      ],
      meta: {},
    };
  },
  methods: {
    getData() {
      const url = "/dashboard";
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataCount() {
      const url = "/dashboard/group";
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
    this.getDataCount();  
  },
};
</script>