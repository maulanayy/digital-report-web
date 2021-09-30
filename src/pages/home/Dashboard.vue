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
            <i class="fas fa-lg fa-fw m-r-10 fa-angle-up"></i>
          </div>
          <div class="stats-info">
            <p>{{ accept }} Lots</p>
            <p>0 Ton</p>
          </div>
          <div class="stats-link">
            <a href="javascript:;" @click="test"
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
            <i class="fas fa-lg fa-fw m-r-10 fa-angle-down"></i>
          </div>
          <div class="stats-info">
            <p>{{ accept_with_condition }} Lots</p>
            <p>0 Ton</p>
          </div>
          <div class="stats-link">
            <a href="javascript:;" @click="test"
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
            <i class="fas fa-lg fa-fw m-r-10 fa-angle-down"></i>
          </div>
          <div class="stats-info">
            <p>{{ failed }} Lots</p>
            <p>0 Ton</p>
          </div>
          <div class="stats-link">
            <a href="javascript:;" @click="test"
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
            <p>{{ total }} Lots</p>
            <p>0 Ton</p>
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
        :isLoading.sync="isLoading"
        :totalRows="meta.total"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: this.meta.perPage,
          position: 'bottom',
          perPageDropdownEnabled: false,
          dropdownAllowAll: false,
          setCurrentPage: 1,
          perPage: 10,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
        }"
        @on-page-change="onPageChange"
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
      isLoading: false,
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
          field: "UOM",
        },
        {
          label: "Secondary On hand",
          field: "SECONDARY_TRANSACTION_QUANTITY",
        },
        {
          label: "Lot",
          field: "LOT_NUMBER",
        },
        {
          label: "Lot Expire Date",
          field: "EXPIRATION_DATE",
        },
        {
          label: "Origination Date",
          field: "ACT_STR_DT",
        },
      ],
      meta: {},
      total : 0,
      accept : 0,
      failed : 0,
      accept_with_condition : 0,
    };
  },
  methods: {
    test(){
      console.log("WAW")
    },
    onPageChange(params) {
      const query = {
        page: params.currentPage,
        limit: params.currentPerPage,
      };

      this.getData(query);
    },
    getData(query) {
      const url = "/dashboard";
      this.$axios
        .get(url, { params: query })
        .then((response) => {
          this.data = response.data.data.data;
          this.meta = response.data.data.meta;
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
          const data = response.data.data.data;
          this.total = data.all
          this.accept = data.accept
          this.accept_with_condition = data.accept_with_variance
          this.failed = data.fail
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const query = {
      page: 1,
      limit: 20,
    };
    this.getData(query);
    this.getDataCount();
  },
};
</script>
