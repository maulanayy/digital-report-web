<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Setting</li>
      <li class="breadcrumb-item active">Form</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Create New Form Setting</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Create New Form">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Form Name</label>
          <div class="col-md-5">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Form Name"
              v-model="name"
            />
          </div>
          <label class="col-form-label col-md-1">Control Point</label>
          <div class="col-md-4">
            <v-select
              :options="contorlPoint"
              name="cp_id"
              placeholder="Enter Control Point"
              v-model="cp_id"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">LOT Number</label>
          <div class="col-md-5">
            <v-select
              :options="documents"
              name="no_doc"
              placeholder="Enter LOT Number"
              v-model="no_doc"
            >
            </v-select>
          </div>
          <label class="col-form-label col-md-1">OKP</label>
          <div class="col-md-4">
            <v-select
              :options="okps"
              v-model="okp"
              placeholder="Enter Name OKP"
            >
            </v-select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">No Document</label>
          <div class="col-md-5">
            <input
              type="input"
              class="form-control m-b-5"
              name="no_document"
              placeholder="Enter Document Name"
              v-model="no_document"
            />
          </div>
          <label class="col-form-label col-sm-1">Variable Name</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Variable Name"
              name="variable"
              v-model="variable"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Name</label>
          <div class="col-md-5">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Product Name"
              v-model="product_name"
              disabled
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Remark</label>
          <div class="col-md-11">
            <b-form-textarea
              rows="5"
              class="form-control m-b-5"
              placeholder="Remark"
              name="remark"
              v-model="remark"
            />
          </div>
        </div>

        <div class="form-group row mb-1">
          <label class="col-form-label col-md-1">Custom Parameter Name</label>
          <div class="col-md-3">
            <input
              type="input"
              class="form-control mb-1"
              placeholder="Enter Parameter Name"
              v-model="custom_parameter_name"
            />
          </div>

          <label class="col-form-label col-md-1">Parameter MIN Value</label>
          <div class="col-md-3">
            <input
              type="input"
              class="form-control mb-1"
              placeholder="Enter Minimum Value"
              v-model="custom_parameter_min_value"
            />
          </div>

          <label class="col-form-label col-md-1">Parameter MAX Value</label>
          <div class="col-md-3">
            <input
              type="input"
              class="form-control mb-1"
              placeholder="Enter Maximum Value"
              v-model="custom_parameter_max_value"
            />
          </div>
        </div>

        <vue-good-table
          :columns="columns"
          :rows="dataTable"
          :line-numbers="true"
          :select-options="{
            enabled: true,
            disableSelectInfo: true,
          }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 5,
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
          @on-selected-rows-change="selectionChanged"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'btn'">
              <b-button
                variant="danger"
                class="mr-2"
                @click="deleteData(props.row.originalIndex)"
                >Delete</b-button
              >
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>

        <b-button
          class="float-right mt-3 ml-2"
          variant="primary"
          @click="create()"
          >Create</b-button
        >

        <b-button
          class="float-right mt-3 mr-1"
          variant="primary"
          @click="addParameter()"
          >Add Parameter</b-button
        >
      </form>
    </panel>
    <!-- end panel -->
    <notifications position="top right" class="mt-3 ml-3" :speed="500" />
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "add-control-point",
  data() {
    return {
      no_doc: "",
      no_document: "",
      documents: [],
      formID: "",
      name: "",
      remark: "",
      variable: "",
      cp_id: "",
      url: "",
      parameter: "",
      effective_date: "",
      product_name: "",
      okp: "",
      okps: [],
      custom_parameter_name: "",
      custom_parameter_min_value: "",
      custom_parameter_max_value: "",
      columns: [
        {
          label: "PARAMETER CODE",
          field: "TEST_CODE",
        },
        {
          label: "PARAMETER NAME",
          field: "TEST_DESC",
        },
        {
          label: "MIN VALUE",
          field: "MIN_VALUE",
        },
        {
          label: "MAX VALUE",
          field: "MAX_VALUE",
        },
      ],
      products: [],
      dataTable: [],
      options: [],
      contorlPoint: [],
      parameters: [],
      meta: {},
      index: 1,
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.formID = currentUrl[4];
    this.url = currentUrl[3];
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  watch: {
    okp(value) {
      this.getLOTByOKP(value.value);
    },
    no_doc(doc) {
      this.getDetailLOT(doc.value);
      this.addValueByOKP(doc.value);
    },
  },
  methods: {
    selectionChanged(params) {
      this.parameters = params.selectedRows;
    },
    create() {
      const body = {
        name: this.name,
        cp_id: this.cp_id.value,
        no_doc: this.no_document,
        lot_number : this.no_doc.value,
        okp: this.okp.value,
        product: this.product_name,
        variable: this.variable,
        remark: this.remark,
        dataParameter: this.parameters,
      };

      console.log(body);
      if (this.url == "add") {
        this.$axios
          .post("/form-parameter", body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.$notify({
              title: `Insert Data Success`,
              text: `Success`,
              type: "success",
            });

            setTimeout(() => {
              this.$router.push("/setting/form-parameter");
            }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Insert Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      } else {
        this.$axios
          .put("/form-parameter/" + this.formID, body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.$notify({
              title: `Update Data Success`,
              text: `Success`,
              type: "success",
            });

            setTimeout(() => {
              this.$router.push("/setting/form-parameter");
            }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Update Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      }
    },
    getData() {
      if (this.url == "edit") {
        const url = "/form-parameter/" + this.formID;
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;
            this.name = data.txtFormName;
            this.no_document = data.txtNoDok;
            this.variable = data.variable.txtVariableName;
            this.remark = data.txtRemark;
            this.product_name = data.txtProductName;
            this.cp_id = data.intControlPointID;
            this.okp = data.txtOKP;
            this.getLOTByOKP(this.okp);
            data.parameter.forEach((element) => {
              this.dataTable.push({
                TEST_CODE: element.txtParameterName,
                TEST_DESC: element.txtParameterName,
                MIN_VALUE: 0,
                MAX_VALUE: 1,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getCP() {
      const url = "/control-point/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.contorlPoint = response.data.data.data.map((x) => {
            return {
              label: x.txtName,
              value: x.id,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOKP() {
      const url = "/parameter/okp";
      this.$axios
        .get(url)
        .then((response) => {
          this.okps = response.data.data.data.map((x) => {
            return {
              label: x.BATCH_NUMBER,
              value: x.BATCH_NUMBER,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailLOT(lot) {
      const url = "/parameter/" + lot + "/lot-detail";
      this.dataTable = [];
      this.$axios
        .get(url)
        .then((response) => {
          const parameter = response.data.data.data;
          this.product_name = parameter[0].DESCRIPTION;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLOTByOKP(okp) {
      const url = "/parameter/" + okp + "/okp-lot";
      this.$axios
        .get(url)
        .then((response) => {
          this.documents = response.data.data.data.map((x) => {
            return {
              label: x.LOT_NUMBER,
              value: x.LOT_NUMBER,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addValueByOKP(lot) {
      const url = "/parameter/" + lot + "/okp-parameter";
      console.log(url);
      this.dataTable = [];
      this.$axios
        .get(url)
        .then((response) => {
          const parameter = response.data.data.data;
          parameter.forEach((element) => {
            this.dataTable.push({
              TEST_CODE: element.TEST_CODE,
              TEST_DESC: element.TEST_DESC,
              MIN_VALUE: element.MIN_VALUE,
              MAX_VALUE: element.MAX_VALUE,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addParameter() {
      if (this.custom_parameter_name != "") {
        this.dataTable.push({
          TEST_CODE: this.custom_parameter_name,
          TEST_DESC: this.custom_parameter_name,
          MIN_VALUE: this.custom_parameter_min_value,
          MAX_VALUE: this.custom_parameter_max_value,
        });
      }
    },
  },
  mounted() {
    this.getData();
    this.getCP();
    this.getOKP();
  },
};
</script>
