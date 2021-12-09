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
          <label class="col-form-label col-md-1">Number Process Oracle</label>
          <div class="col-md-4">
            <v-select
              :options="lot_numbers"
              name="parameter_name"
              v-model="lot_number"
            >
            </v-select>
          </div>
          <label class="col-form-label col-md-1">Number Process Custom</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Number Process Custom"
              name="parameter_name_custom"
              v-model="parameter_name_custom"
            />
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
          ref="table_param"
        >
          <template slot="table-row" slot-scope="props">
            <span
              v-if="
                props.column.field != 'parameter' &&
                  props.column.field != 'standard' &&
                  props.column.field != 'type'
              "
            >
              <!-- <span
                v-if="
                  parameters[props.index].values == '' &&
                    !parameters[props.index].formula
                "
              > -->
              <input
                type="number"
                class="form-control m-b-5"
                placeholder="Input Parameter"
                name="name"
                v-model="parametersValues[`columns_${props.index}`]"
                v-if="parameters[props.index].txtParameterValueType == 'NUMBER'"
              />
              <v-select
                placeholder="Input Parameter"
                name="name"
                v-model="parametersValues[`columns_${props.index}`]"
                v-if="parameters[props.index].txtParameterValueType == 'VALUE'"
                :options="parameters[props.index].type_values"
              />
              <!-- </span>
              <span v-else>
                {{ parametersValues[`column_${props.index}`] }}
              </span> -->
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
              @click="create()"
              >Save
            </b-button>
            <b-button
              class="ml-1 float-right"
              variant="primary"
              @click="addValue()"
              >Add</b-button
            >
            <b-button
              class="ml-1 float-right"
              variant="primary"
              @click="editValue()"
              >Edit</b-button
            >
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
      masterFormID: "",
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
      parameter_name_custom: "",
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
          label: "OK",
          value: "OK",
        },
        {
          label: "NOT OK",
          value: "NOT OK",
        },
      ],
      data: [],
      parametersValues: {},
      meta: {},
      dataParameter: [],
      columnParameter: [],
      params: [],
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.masterFormID = currentUrl[3];
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
      if (value) {
        this.getNoDoc(formID);
        this.getFormName(formID);
      }
    },

    form_name(value) {
      this.dataTable = [];
      if (value) {
        this.getDataForm(value.value);
        this.getOKP(value.value);
        if (this.url == "edit") {
          this.getFormValue(value.value);
        }
      }
    },
    okp(value) {
      const okp = !value.value ? value : value.value;
      if (value) {
        this.getDetailOKP(okp);
      }
    },
    lot_number(lot) {
      if (lot) {
        this.getValueParameter(lot.value);
      }
    },
  },
  methods: {
    addValue() {
      if (
        this.lot_number != null &&
        this.parameter_name_custom == ""
      ) {
        this.$notify({
          title: `Lot Number Is Empty`,
          text: `Warning`,
          type: "warning",
        });
      } else {
        const parameterValue =
          this.lot_number != null
            ? this.lot_number.value
            : this.parameter_name_custom;
        const founded = this.dataParameter.find((x) => {
          return x.lot_number == parameterValue;
        });
        if (founded) {
          this.$notify({
            title: `Lot Number Already Insert`,
            text: `Warning`,
            type: "warning",
          });
        } else {
          let values = this.parametersValues;
          const keys = Object.keys(values);

          for (let x = 0; x < keys.length; x++) {
            const element = keys[x];

            const value =
              values[element].label != undefined
                ? values[element].label
                : values[`columns_${x}`];
            values[element] = value;
          }

          values["lot_number"] = parameterValue;
          this.dataParameter.push(values);
          this.parameter_value = parameterValue;
        }
        this.parameter_name_custom = "";
        this.parametersValues = {};
      }
    },
    editValue() {
      if (
        this.lot_number.value == undefined &&
        this.parameter_name_custom == ""
      ) {
        this.$notify({
          title: `Lot Number Is Empty`,
          text: `Warning`,
          type: "warning",
        });
      } else {
        const parameterValue =
          this.lot_number.value != undefined
            ? this.lot_number.value
            : this.parameter_name_custom;
        const founded = this.dataParameter.find((x) => {
          return x.lot_number == parameterValue;
        });
        if (founded) {
          const index = this.dataParameter.findIndex((x) => {
            return x.lot_number == parameterValue;
          });

          console.log("INDEX  : ", index);

          let values = this.parametersValues;
          const keys = Object.keys(values);

          for (let x = 0; x < keys.length; x++) {
            const element = keys[x];

            const value =
              values[element].label != undefined
                ? values[element].label
                : values[`columns_${x}`];
            values[element] = value;
          }

          values["lot_number"] = parameterValue;

          this.dataParameter.splice(index, 1);
          this.dataParameter.push(values);
          // console.log("========================================")
          // console.log(this.dataParameter[index])
          // for (let x = 0; x < this.data.length; x++) {
          //   const element = this.data[x];
          //   this.dataTable.push({
          //     parameter: element.parameter,
          //     value: values[`columns_${x}`],
          //     lot_number: this.lot_number.value,
          //   });
          // }
        } else {
          this.$notify({
            title: `Lot Number Not Found`,
            text: `Warning`,
            type: "warning",
          });
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
  

      for (let z = 0; z < this.dataParameter.length; z++) {
        const elementParam = this.dataParameter[z];
        console.log("ELEMENT PARAM : ", elementParam);
        for (let x = 0; x < this.data.length; x++) {
          const element = this.data[x];
          console.log("ELEMENT : ", element);
          this.dataTable.push({
            parameter: element.parameter,
            value: elementParam[`columns_${x}`],
            lot_number: elementParam.lot_number,
          });
        }
      }
      const body = {
        form_master: this.master_form.value,
        form: formID.value,
        form_name: formID.label,
        okp: this.okp.value,
        lot_numbers_length: this.lot_numbers.length,
        product_name: this.product_name,
        no_doc: this.no_doc,
        product_date: this.product_date,
        expired_date: this.expired_date,
        product_desc: this.product_desc,
        parameters: this.dataTable,
      };

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
          .put(`/form-data/${this.masterFormID}`, body, {
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
        const url = "/form-data/" + this.masterFormID;
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
      const url = "/form-parameter/" + formID + "/code";
      this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.data.data;
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
        this.columnParameter = [];
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;
            this.name = data.txtName;

            let parameters = data.parameter.map((element) => {
              if (
                element.txtParameterValueType == "VALUE" &&
                element.type_values.length > 0
              ) {
                let typeValues = element.type_values.map((x) => {
                  x = {
                    label: x,
                    value: x,
                  };

                  return x;
                });

                element["type_values"] = typeValues;
              } else {
                element["type_values"] = this.parameter_values;
              }

              return element;
            });

            this.parameters = parameters;
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
              // this.parametersValues[`column_s${x}`] = element.values;
              this.columnParameter.push({
                label: element.txtParameterName,
                field: `columns_${x}`,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getOKP(form) {
      console.log("FORM : ", form);
      this.$axios
        .get("/parameter/okp", {
          params: {
            form_id: form,
          },
        })
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
            this.lot_numbers = [];

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
      const url = "/form-data/" + value + "/value/" + this.masterFormID;
      this.dataParameter = [];
      this.$axios
        .get(url)
        .then((response) => {
          this.dataParameter = response.data.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // addValueParam(event, index) {
    //   let operatorIndex = 0;
    //   const paramInput = this.parameters[index];
    //   const dataParamFormula = this.parameters.find((x, ind) => {
    //     console.log("INDEX : ", ind);
    //     if (x.formula) {
    //       console.log("PARAM NAME : ", paramInput.txtParameterName);
    //       console.log("OPERATOR NAME : ", x.formula.txtParameterOperator);

    //       if (paramInput.txtParameterName == x.formula.txtParameterOperator) {
    //         operatorIndex = ind;
    //         return x;
    //       }

    //       return paramInput.txtParameterName == x.formula.txtParameterOperator;
    //     }
    //   });
    //   let value = 0;
    //   console.log("PARAM VALUE : ", parseInt(event.target.value));
    //   console.log(
    //     "OPERATOR VALUE : ",
    //     dataParamFormula.formula.intValueOperator
    //   );
    //   switch (dataParamFormula.formula.txtOperator) {
    //     case "plus":
    //       value =
    //         parseInt(event.target.value) +
    //         dataParamFormula.formula.intValueOperator;
    //       break;
    //     case "minus":
    //       value =
    //         parseInt(event.target.value) -
    //         dataParamFormula.formula.intValueOperator;
    //       break;
    //     case "multiple":
    //       value =
    //         parseInt(event.target.value) *
    //         dataParamFormula.formula.intValueOperator;
    //       break;
    //     case "devide":
    //       value =
    //         parseInt(event.target.value) /
    //         dataParamFormula.formula.intValueOperator;
    //       break;
    //     default:
    //       break;
    //   }

    //   console.log("VALUE : ", value);
    //   console.log("OPERATOR INDEX : ", operatorIndex);
    //   console.log(this.data[operatorIndex]);

    //   this.parametersValues[`column_${operatorIndex}`] = value.toString();

    //   console.log(this.parametersValues);
    // },
    getValueParameter(lot) {
      const url = "/parameter/" + lot + "/lot-number";
      this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.data.data;
          for (let x = 0; x < this.data.length; x++) {
            const element = this.data[x];
            if (element.type == "oracle") {
              const param = data.find((x) => {
                return element.parameter == x.TEST_CODE;
              });

              if (param != null) {
                if (param.MIN_VALUE == null || param.MAX_VALUE == null) {
                  element.standard = "OK";
                } else {
                  element.standard = param.MIN_VALUE + "-" + param.MAX_VALUE;
                }
              } else {
                element.standard = "";
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData();
    this.getFormCode();
  },
};
</script>
