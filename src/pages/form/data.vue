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

    <!-- filter panel -->
    <panel title="Filter Form">
      <b-form @submit="filter" @reset="reset">
        <div class="form-group row m-b-12">
          <label class="col-form-label col-md-1">Date Start</label>
          <div class="col-md-4">
            <b-form-datepicker id="date-start" v-model="date_start" name="date_start" class="form-control m-b-5" />
          </div>

          <label class="col-form-label col-md-1">Date End</label>
          <div class="col-md-4">
            <b-form-datepicker id="date-end" v-model="date_end" name="date_end" class="form-control m-b-5" />
          </div>
        </div>
        <div class="form-group row m-b-12">
          <label class="col-form-label col-md-1">Product Name</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Product name" name="product_name"
              v-model="product_name" />
          </div>

          <label class="col-form-label col-md-1">No Document</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="No Document" name="no_document"
              v-model="no_document" />
          </div>
        </div>
        <b-button type="submit" variant="primary">Filter</b-button>
        <b-button type="reset" class="ml-2" variant="danger">Reset</b-button>
      </b-form>
    </panel>
    <!-- end panel -->

    <!-- begin panel -->
    <panel title="Data Form">
      <b-button class="mb-3" variant="primary" :to="'/form/add'">Create</b-button>
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
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'btn'">
            <b-button variant="primary" class="mr-2" @click="confirmApproval(props.row.id)" v-if="
                !props.row.txtApprove &&
                  userData.role != 4 &&
                  userData.role != 2 &&
                  userData.role != 5
              ">Approve</b-button>
            <b-button variant="primary" class="mr-2" :to="'/form/edit/' + props.row.id"
              v-if="!props.row.txtClosed && userData.role != 5">Continue</b-button>
            <b-button variant="danger" class="mr-2" @click="closed(props.row.id)" v-if="
                !props.row.txtClosed &&
                  userData.role != 4 &&
                  userData.role != 2 &&
                  userData.role != 5
              ">Closed</b-button>  
            <b-button variant="primary" class="mr-2" @click="print(props.row.id)">Print</b-button>
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
        <div ref="dialog" tabindex="-1" role="dialog" aria-modal="false" aria-labelledby="form-confirm-label"
          class="text-center p-3">
          <p><strong id="form-confirm-label">Are you sure?</strong></p>
          <div class="d-flex">
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              Cancel
            </b-button>
            <b-button variant="outline-success" @click="closedData">OK</b-button>
          </div>
        </div>
      </template>
    </b-overlay>

    <b-overlay :show="confirmation_approval" no-wrap>
      <template #overlay>
        <div ref="dialog" tabindex="-1" role="dialog" aria-modal="false" aria-labelledby="form-confirm-label"
          class="text-center p-3">
          <p><strong id="form-confirm-label">Are you sure?</strong></p>
          <div class="d-flex">
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              Cancel
            </b-button>
            <b-button variant="outline-success" @click="approveData">OK</b-button>
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
        userData: {},
        columns: [{
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
        date_start: "",
        date_end: "",
        product_name: "",
        no_document: ""
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
      filter(event) {
        event.preventDefault();
        let params = {
          params: {}
        }
        if (this.date_start != "") {
          params.params['date_start'] = this.date_start;
        }

        if (this.date_end != "") {
          params.params['date_end'] = this.date_end;
        }

        if (this.product_name != "") {
          params.params['product_name'] = this.product_name;
        }

        if (this.no_document != "") {
          params.params['no_document'] = this.no_document;
        }

        this.getData(params);
      },
      reset(event) {
        event.preventDefault();
        this.date_start = "";
        this.date_end = "";
        this.no_document = "";
        this.product_name = "";
      },
      onCancel() {
        this.confirmation = false;
        this.confirmation_approval = false;
      },
      confirmApproval(id) {
        this.formID = id;
        this.confirmation_approval = true;
      },
      closed(id) {
        this.formID = id;
        this.confirmation = true;
      },
      approveData() {
        const url = "/form-data/" + this.formID + "/approve";
        this.$axios
          .put(url, {})
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
              title: `Approve Form Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      },
      closedData() {
        const url = "/form-data/" + this.formID + "/close";
        this.$axios
          .put(url, {})
          .then(() => {
            this.$notify({
              title: `Close Form Success`,
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
      getData(params) {
        this.userData = this.$store.state.userdata;

        const url = "/form-data";
        this.$axios
          .get(url, params)
          .then((response) => {
            this.data = response.data.data.data;
            this.meta = response.data.data.meta;
          })
          .catch((error) => {
            this.$notify({
              title: `Update Data Failed : ${error}`,
              text: `Error`,
              type: "error",
            });
          });
      },
      print(id){
        const url = "/form-data/print/"+id;
        this.$axios.get(url).then((response) => {
          console.log(response);
          
        let blob = new Blob([response.data], { type: 'application/vnd.ms-excel;charset=utf-8' }),
          url = window.URL.createObjectURL(blob)

        window.open(url)
        }).catch((error) => {
          this.$notify({
              title: `Update Data Failed : ${error}`,
              text: `Error`,
              type: "error",
            });
        })
      }
    },
    mounted() {
      this.getData({});
    },
  };
</script>