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
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter OKP Name"
              name="okp"
              v-model="okp"
            />
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
            />
          </div>

          <label class="col-form-label col-md-1">Expired Date</label>
          <div class="col-md-4">
            <b-form-datepicker
              id="expired-date"
              v-model="expired_date"
              name="birth_date"
              class="form-control m-b-5"
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
            />
          </div>
        </div>

        <vue-good-table :columns="columns" :rows="data" :line-numbers="true">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'btn'">
              <b-button
                variant="primary"
                class="mr-2"
                @click="saveParameter(props.row.originalIndex)"
                v-if="
                  props.row['button']['button-' + (props.row.originalIndex + 1)]
                "
                >Save</b-button
              >
            </span>
            <span v-else>
              <input
                type="input"
                class="form-control m-b-5"
                placeholder="Enter Value"
                v-model="
                  data[props.row.originalIndex][props.column.label].value
                "
                :disabled="
                  props.row[props.column.label].type != 'manual' ||
                  props.row[props.column.label].disable == true
                "
              />
            </span>
          </template>
        </vue-good-table>

        <b-button class="float-right mt-3" variant="primary" @click="create()"
          >Create</b-button
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
      parameter_value: "",
      formName: [],
      columns: [],
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
    form_name(value) {
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
    create() {
      const formID = !this.form_name.value
        ? this.formName.find((x) => {
            return x.label == this.form_name;
          })
        : this.form_name;
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
        parameter_value: this.data,
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
          .post("/form-data/", body, {
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
      }
    },
    getData() {
      if (this.url == "edit") {
        const url = "/form-data/" + this.cpId;
        let parameter = {};

        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;
            console.log(data);
            this.form_name = data.txtFormName;
            this.okp = data.txtOkp;
            this.no_doc = data.txtNoDok;
            this.product_name = data.txtNameProduct;
            this.product_desc = data.txtProductDesc;
            this.product_date = data.dtmProductionDate;
            this.expired_date = data.dtmDateExpired;

            const parameters = data.parameter;
            this.variable_name = data.variable
              ? data.variable.txtVariableName
              : "";
            this.columns.unshift({
              label: this.variable_name,
              field: "input-txt",
              html: true,
            });

            parameter[this.variable_name] = {
              value: "",
              type: "manual",
            };

            for (let x = 0; x < parameters.length; x++) {
              const element = parameters[x];
              this.columns.push({
                label: element.txtParameterName,
                field: "input-txt",
                html: true,
              });
              parameter[element.txtParameterName] = {
                value: "",
                type: element.txtTipe,
              };
            }

            this.columns.push({
              label: "Action",
              field: "btn",
            });

            const button = "button-" + (this.data.length + 1);
            parameter["button"] = {
              type: "button",
            };
            parameter["button"][button] = true;

            this.data.push(parameter);
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
        const url = "/form-parameter/" + value;
        let parameter = {};
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;
            this.name = data.txtName;
            this.okp = data.txtOKP;
            this.no_doc = data.txtNoDok;
            this.product_name = data.txtName;
            const parameters = data.parameter;
            this.variable_name = data.variable
              ? data.variable.txtVariableName
              : "";
            this.columns.unshift({
              label: this.variable_name,
              field: "input-txt",
              html: true,
            });

            parameter[this.variable_name] = {
              id : data.variable.id,
              value: "",
              type: "manual",
            };

            for (let x = 0; x < parameters.length; x++) {
              const element = parameters[x];
              this.columns.push({
                label: element.txtParameterName,
                field: "input-txt",
                html: true,
              });
              parameter[element.txtParameterName] = {
                id : element.intParameterID,
                value: "",
                type: element.txtTipe,
              };
            }

            this.columns.push({
              label: "Action",
              field: "btn",
            });

            const button = "button-" + (this.data.length + 1);
            parameter["button"] = {
              type: "button",
            };
            parameter["button"][button] = true;

            this.data.push(parameter);
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