<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Input Form</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Input Form</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Input Form">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Master Form</label>
          <div class="col-md-4">
            <v-select
              :options="masterForm"
              name="form_name"
              v-model="master_form"
              :disabled="editMode == 1"
              placeholder="Select Master Form"
            >
            </v-select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Form Name</label>
          <div class="col-md-4">
            <v-select
              :options="formName"
              name="form_name"
              v-model="form_name"
              placeholder="Select Form Analytic"
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
          <label class="col-form-label col-md-1">Product Name</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Product Name"
              name="product_name"
              v-model="product_name"
              disabled
            />
          </div>

          <label class="col-form-label col-md-1">No Document</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter No Document"
              name="no_doc"
              v-model="no_doc"
              disabled
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Date</label>
          <div class="col-md-4">
            <b-form-datepicker
              id="birth-date"
              v-model="product_date"
              name="product_date"
              class="form-control m-b-5"
              disabled
            />
          </div>

          <label class="col-form-label col-md-1">Expired Date</label>
          <div class="col-md-4">
            <b-form-datepicker
              id="expired-date"
              v-model="expired_date"
              name="birth_date"
              class="form-control m-b-5"
              disabled
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Description</label>
          <div class="col-md-9">
            <b-form-textarea
              rows="5"
              class="form-control m-b-5"
              placeholder="Enter Product Description"
              name="product_desc"
              v-model="product_desc"
              disabled
            />
          </div>
        </div>
      </form>
    </panel>
    <!-- end panel -->

    <panel title="Input Form">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Number Process</label>
          <div class="col-md-4">
            <v-select
              :options="lot_numbers"
              name="parameter_name"
              v-model="lot_number"
            >
            </v-select>
          </div>
        </div>
        <vue-good-table
          class="mb-5"
          :columns="columnsData"
          :rows="data"
          :line-numbers="true"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 20,
            position: 'bottom',
            dropdownAllowAll: false,
            perPageDropdownEnabled: false,
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
            <span
              v-if="
                props.column.field != 'parameter' &&
                  props.column.field != 'standard' &&
                  props.column.field != 'type'
              "
            >
              <input
                type="input"
                class="form-control m-b-5"
                placeholder="Input Parameter"
                name="name"
                v-model="parametersValues[`column_${props.index}`]"
                :disabled="parameters[props.index].values != ''"
              />
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
        <div class="form-group row m-b-15">
          <div class="col-md-12">
            <b-button
              class="ml-1 float-right"
              variant="primary"
              @click="addValue()"
              >Add</b-button
            >
            <b-button class="float-right" variant="primary" @click="create()"
              >Save
            </b-button>
          </div>
        </div>
        <vue-good-table
          class="mb-5"
          :columns="columnParameter"
          :rows="dataParameter"
          :line-numbers="true"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 10,
            position: 'bottom',
            dropdownAllowAll: false,
            perPageDropdownEnabled: false,
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
      </form>
    </panel>
    <notifications position="top right" class="mt-3 ml-3" :speed="500" />
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "add-control-point",
  data() {
    return {
      editMode: 0,
      formData: {},
      name: "",
      cpId: "",
      url: "",
      form_name: "",
      master_form: "",
      okp: "",
      okps: [],
      product_name: "",
      no_doc: "",
      product_date: "",
      expired_date: "",
      product_desc: "",
      parameter_value: "",
      param_type: "",
      min_value: 0,
      max_value: 0,
      formName: [],
      masterForm: [],
      parameters: [],
      newDataParam: [],
      settingParameters: [],
      dataTable: [],
      lot_numbers: [],
      lot_number: "",
      columnsData: [
        {
          label: "Parameter",
          field: "parameter",
          width: "25%",
        },
        {
          label: "Type",
          field: "type",
        },
        {
          label: "Standard",
          field: "standard",
          width: "20%",
        },
        {
          label: "Value",
          field: "input",
          html: true,
        },
      ],
      parameter_values: [
        {
          label: "SESUAI STANDARD",
          value: true,
        },
        {
          label: "TIDAK SESUAI STANDARD",
          value: false,
        },
      ],
      data: [],
      parametersValues: {},
      meta: {},
      dataParameter: [],
      columnParameter: [],
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.cpId = currentUrl[3];
    this.url = currentUrl[2];
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  watch: {
    master_form(value) {
      const formID = value.value;
      this.getNoDoc(formID);
      this.getFormName(formID);
    },

    form_name(value) {
      this.dataTable = []
      this.getDataForm(value.value);
      if (this.url == "edit") {
        console.log("FORM VALUE : ", value.value);
        this.getFormValue(value.value);
      }

    },
    okp(value) {
      const okp = !value.value ? value : value.value;
      this.getDetailOKP(okp);
    },
  },
  methods: {
    addValue() {
      console.log("LOT NUMBER : ", this.lot_number.value);
      if (this.lot_number.value == undefined) {
        this.$notify({
          title: `Lot Number Is Empty`,
          text: `Warning`,
          type: "warning",
        });
      } else {
        const founded = this.dataParameter.find((x) => {
          return x.lot_number == this.lot_number.value;
        });
        if (founded) {
          this.$notify({
            title: `Lot Number Already Insert`,
            text: `Warning`,
            type: "warning",
          });
        } else {
          let values = this.parametersValues;
          values["lot_number"] = this.lot_number.value;
          this.dataParameter.push(values);
          for (let x = 0; x < this.data.length; x++) {
            const element = this.data[x];
            this.dataTable.push({
              parameter: element.parameter,
              value: values[`column_${x}`],
              lot_number: this.lot_number.value,
            });
          }
        }
        this.parametersValues = {};
      }
    },

    create() {
      const formID = !this.form_name.value
        ? this.formName.find((x) => {
            return x.label == this.form_name;
          })
        : this.form_name;
      this.data.pop();
      const body = {
        form_master: this.master_form.value,
        form: formID.value,
        form_name: formID.label,
        okp: this.okp.value,
        product_name: this.product_name,
        no_doc: this.no_doc,
        product_date: this.product_date,
        expired_date: this.expired_date,
        product_desc: this.product_desc,
        parameters: this.dataTable,
      };

      console.log(body);

      if (this.url == "add") {
        this.$axios
          .post("/form-data", body, {
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
              this.$router.push("/form");
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
          .put(`/form-data/${this.cpId}`, body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.$notify({
              title: `Save Data Success`,
              text: `Success`,
              type: "success",
            });

            setTimeout(() => {
              this.$router.push("/form");
            }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Insert Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      }
    },
    getData() {
      if (this.url == "edit") {
        this.editMode = 1;
        const url = "/form-data/" + this.cpId;
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;

            this.master_form = {
              label: data.txtFormName,
              value: data.id,
            };
            console.log(this.master_form);
            this.okp = data.txtOkp;
            this.no_doc = data.txtNoDok;
            this.product_name = data.txtProductName;
            this.product_desc = data.txtProductDesc;
            this.product_date = data.dtmProductionDate;
            this.expired_date = data.dtmDateExpired;
            // for (let x = 0; x < data.parameter.length; x++) {
            //   const element = data.parameter[x];
            //   this.dataParameter.push(element);
            // }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getFormCode() {
      const url = "/master-form/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.masterForm = response.data.data.data.map((x) => {
            return {
              label: x.txtFormName,
              value: x.id,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFormName(formID) {
      console.log("FORM ID : ", formID);
      const url = "/form-parameter/" + formID + "/code";
      this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.data.data;
          console.log(response.data.data);
          this.formName = data.map((x) => {
            return {
              label: x.txtFormName,
              value: x.id,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getNoDoc(formID) {
      const url = "/master-form/" + formID;
      this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.data;
          this.product_name = data.txtProductName;
          this.no_doc = data.txtNoDok;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataForm(value) {
      if (value) {
        const url = "/form-parameter/" + value;
        this.data = [];
        this.columnParameter = []
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;
            this.name = data.txtName;
            this.parameters = data.parameter;
            this.columnParameter.push({
              label: "Lot Number",
              field: "lot_number",
            });
            for (let x = 0; x < this.parameters.length; x++) {
              const element = this.parameters[x];
              this.data.push({
                parameter: element.txtParameterName,
                type: element.txtParameterType,
                standard: element.standard,
              });
              this.parametersValues[`column_${x}`] = element.values;
              this.columnParameter.push({
                label: element.txtParameterName,
                field: `column_${x}`,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getOKP() {
      this.$axios
        .get("/parameter/okp")
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
    getDetailOKP(okp) {
      console.log("OKP : ", okp);
      if (this.form_name == "" && this.url != "edit") {
        this.$notify({
          title: `Please Insert Form`,
          text: `Warning`,
          type: "warn",
        });

        return;
      } else {
        const url = "/parameter/" + okp + "/okp-detail";
        this.$axios
          .get(url)
          .then((response) => {
            const detailOKP = response.data.data.data.data;
            this.product_name = detailOKP[0].ITEM_CODE;
            this.product_desc = detailOKP[0].DESCRIPTION;
            this.product_date = detailOKP[0].ACT_STR_DT;
            this.expired_date = detailOKP[0].EXPIRATION_DATE;
            const spec = response.data.data.data.spec
              ? response.data.data.data.spec
              : [];
            this.lot_numbers = [];
            for (let x = 0; x < this.data.length; x++) {
              const element = this.data[x];

              if (element.type == "oracle") {
                const param = spec.find((x) => {
                  return element.parameter == x.TEST_CODE;
                });

                if (param != null) {
                  if (param.MIN_VALUE == null || param.MAX_VALUE == null) {
                    element.standard = "SESUAI STANDARD";
                  } else {
                    element.standard = param.MIN_VALUE + "-" + param.MAX_VALUE;
                  }
                } else {
                  element.standard = "";
                }
              }
            }

            for (let x = 0; x < detailOKP.length; x++) {
              const element = detailOKP[x];
              this.lot_numbers.push({
                label: element.LOT_NUMBER,
                value: element.LOT_NUMBER,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getFormValue(value) {
      const url = "/form-data/" + value + "/value/" + this.cpId;
      this.dataParameter = [];
      this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.data.data;
          this.dataParameter = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getOKP();
    this.getData();
    this.getFormCode();
  },
};
</script>
