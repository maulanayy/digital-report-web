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
          <label class="col-form-label col-md-1">Form Name</label>
          <div class="col-md-4">
            <v-select :options="formName" name="form_name" v-model="form_name">
            </v-select>
          </div>

          <label class="col-form-label col-md-1">OKP</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter OKP Name" name="okp" v-model="okp"
              disabled />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Name</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Product Name" name="product_name"
              v-model="product_name" disabled />
          </div>

          <label class="col-form-label col-md-1">No Document</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter No Document" name="no_doc"
              v-model="no_doc" disabled />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Date</label>
          <div class="col-md-4">
            <b-form-datepicker id="birth-date" v-model="product_date" name="product_date" class="form-control m-b-5" />
          </div>

          <label class="col-form-label col-md-1">Expired Date</label>
          <div class="col-md-4">
            <b-form-datepicker id="expired-date" v-model="expired_date" name="birth_date" class="form-control m-b-5" />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Description</label>
          <div class="col-md-9">
            <b-form-textarea rows="5" class="form-control m-b-5" placeholder="Enter Product Description"
              name="product_desc" v-model="product_desc" />
          </div>
        </div>
      </form>
    </panel>
    <!-- end panel -->

    <panel title="Input Form">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Parameter Name</label>
          <div class="col-md-4">
            <v-select :options="parameters" name="parameter_name" v-model="parameter_name">
            </v-select>
          </div>

          <label class="col-form-label col-md-1">Parameter Value</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Parameter Value" name="parameter_value"
              v-model="parameter_value" v-if="min_value != 0 && max_value != 0" :disabled="param_type != 'manual'" />
            <v-select :options="parameter_values" name="parameter_value" v-model="parameter_value"
              v-if="min_value == 0 && max_value == 0">
            </v-select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Variable Name</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Product Name" name="variable_name"
              v-model="variable_name" disabled />
          </div>

          <label class="col-form-label col-md-1">Variable Value</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Variable Value" name="variable_value"
              v-model="variable_value" />
          </div>
        </div>

        <vue-good-table :columns="columns" :rows="dataTable" :line-numbers="true" :pagination-options="{
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
          }">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'btn'">
              <b-button variant="danger" class="mr-2" @click="deleteData(props.row.originalIndex)">Delete</b-button>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>

        <b-button class="float-right mt-3" variant="primary" @click="create()" v-if="url == 'add'">Create</b-button>
        <b-button class="float-right mt-3" variant="primary" @click="save()" v-if="url == 'edit'">Save</b-button>
        <b-button class="float-right mt-3 mr-1" variant="primary" @click="addValue()">Add</b-button>
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
        formData: {},
        name: "",
        cpId: "",
        url: "",
        form_name: "",
        okp: "",
        product_name: "",
        no_doc: "",
        product_date: "",
        expired_date: "",
        product_desc: "",
        variable: "",
        variable_name: "",
        variable_value: "",
        parameter_name: "",
        parameter_value: "",
        param_type: "",
        min_value: 0,
        max_value: 0,
        formName: [],
        parameters: [],
        newDataParam: [],
        settingParameters: [],
        dataTable: [],
        columns: [{
            label: "Variable",
            field: "variable",
          },
          {
            label: "Value Variable",
            field: "value_variable",
          },
          {
            label: "Parameter",
            field: "parameter",
          },
          {
            label: "Value Parameter",
            field: "value_parameter",
          },
        ],
        parameter_values: [{
            label: "SESUAI STANDARD",
            value: true,
          },
          {
            label: "TIDAK SESUAI STANDARD",
            value: false,
          },
        ],
        data: [],
        meta: {},
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
      parameter_name(value) {
        const param = this.settingParameters.find(x => {
          return x.intParameterID == value.value
        })
        this.parameter_value = ""
        this.min_value = param.intMaxValue
        this.max_value = param.intMaxValue
        this.param_type = param.txtTipe
        if (param.txtTipe != "manual") {
          const url = "/parameter/" + param.intParameterID + "/value";

          this.$axios.get(url).then((response) => {
            const data = response.data.data;
            this.parameter_value = data.data.value
          }).catch((error) => {
            console.log(error);
          });

        }
      },
      form_name(value) {
        console.log("FORM NAME : ", value)
        if (value) {
          this.getDataForm(value.value);
        } else {
          this.name = "";
          this.okp = "";
          this.no_doc = "";
          this.product_name = "";
          this.data = [];
          this.columns = [];
        }
      },
    },
    methods: {
      addValue() {
        if (
          this.variable_value == "" ||
          this.parameter_value == "" ||
          this.parameter_name.label == ""
        ) {
          this.$notify({
            title: `Variable or Parameter is Empty`,
            text: `Error`,
            type: "error",
          });
        } else {
          const value = this.parameter_value.value != null ? this.parameter_value.value : this.parameter_value
          this.dataTable.push({
            variable: this.variable_name,
            value_variable: this.variable_value,
            parameter: this.parameter_name.label,
            value_parameter: value,
          });
          if (this.url != 'add') {
            this.newDataParam.push({
              variable: this.variable_name,
              value_variable: this.variable_value,
              parameter: this.parameter_name.label,
              value_parameter: value,
            })
          }
        }
      },
      save() {
        const formID = !this.form_name.value ?
          this.formName.find((x) => {
            return x.label == this.form_name;
          }) :
          this.form_name;

        const body = {
          form: formID.value,
          parameters: this.newDataParam,
        };
        const url = "/form-data/" + this.cpId
        this.$axios
          .post(url, body, {
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
              this.$router.push("/form");
            }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Update Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      },
      create() {
        const formID = !this.form_name.value ?
          this.formName.find((x) => {
            return x.label == this.form_name;
          }) :
          this.form_name;
        this.data.pop();

        const body = {
          form: formID.value,
          form_name: formID.label,
          okp: this.okp,
          product_name: this.product_name,
          no_doc: this.no_doc,
          product_date: this.product_date,
          expired_date: this.expired_date,
          product_desc: this.product_desc,
          parameters: this.dataTable,
        };

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

            // setTimeout(() => {
            //   this.$router.push("/form");
            // }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Insert Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      },
      getData() {
        if (this.url == "edit") {
          const url = "/form-data/" + this.cpId;
          this.$axios
            .get(url)
            .then((response) => {
              const data = response.data.data;
              const form = this.formName.find((x) => {
                return x.label == data.txtFormName;
              })
              this.form_name = form;
              this.okp = data.txtOkp;
              this.no_doc = data.txtNoDok;
              this.product_name = data.txtNameProduct;
              this.product_desc = data.txtProductDesc;
              this.product_date = data.dtmProductionDate;
              this.expired_date = data.dtmDateExpired;

              for (let index = 0; index < data.parameter.length; index++) {
                const elementParam = data.parameter[index];
                const elementVariable = data.variable[index];

                this.dataTable.push({
                  variable: elementVariable.txtParameterVariableName,
                  value_variable: elementVariable.txtVariableValue,
                  parameter: elementParam.txtParameterName,
                  value_parameter: elementParam.txtParameterValue,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      getFormName() {
        const url = "/form-parameter/code";
        this.$axios
          .get(url)
          .then((response) => {
            this.formName = response.data.data.data.map((x) => {
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
      getDataForm(value) {
        if (value) {
          console.log("FORM ID : ", value)
          const url = "/form-parameter/" + value;
          // let parameter = {};
          this.$axios
            .get(url)
            .then((response) => {
              const data = response.data.data;
              this.name = data.txtName;
              this.okp = data.txtOKP;
              this.no_doc = data.txtNoDok;
              this.product_name = data.txtProductName;
              this.variable_name = data.variable.txtVariableName;
              const parameter = data.parameter;
              this.settingParameters = data.parameter;

              for (let x = 0; x < parameter.length; x++) {
                const element = parameter[x];
                this.parameters.push({
                  label: element.txtParameterName,
                  value: element.intParameterID,
                });
              }


            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      saveParameter(index) {
        const keys = Object.keys(this.data[index]);
        let parameter = {};
        keys.forEach((element) => {
          const button = "button-";
          this.data[index][element]["disable"] = true;
          this.data[index][element][button + this.data.length] = false;
          const typeParameter = this.data[index][element]["type"];
          if (element != "button") {
            parameter[element] = {
              value: "",
              type: typeParameter,
            };
          } else {
            parameter["button"] = {
              type: "button",
            };
            parameter["button"][button + (this.data.length + 1)] = true;
          }
        });

        this.data.push(parameter);
      },
    },
    mounted() {
      this.getData();
      this.getFormName();
    },
  };
</script>