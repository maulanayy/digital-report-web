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
              dd
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
              id="birth-date"
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
              placeholder="Enter Product Name"
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
                >Save</b-button
              >
            </span>
            <span v-else>
              <input
                type="input"
                class="form-control m-b-5"
                placeholder="Enter Parameter Name"
                v-model="props.row[props.column.label].value"
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
      this.getDataForm(value.value);
    },
  },
  methods: {
    create() {
      const body = {
        name: this.name,
      };

      if (this.url == "add") {
        this.$axios
          .post("/form", body, {
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
          .put("/form/" + this.cpId, body, {
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
        const url = "/form-name";
        this.$axios
          .get(url)
          .then((response) => {
            this.name = response.data.data.txtName;
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
        const urlParameter = "/form-parameter/" + value + "/parameter";
        let parameter = {};
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;
            this.name = data.txtName;
            this.okp = data.txtOKP;
            this.no_doc = data.txtNoDok;
            this.product_name = data.txtProductName;

            this.variable_name = data.variable
              ? data.variable.txtVariableName
              : "";

            this.columns.unshift({
              label: this.variable_name,
              field: "input-txt",
              html: true,
            });

            parameter[this.variable_name] = {
              value: "variabel",
              type: "manual",
            };

            this.data.push(parameter);
          })
          .catch((error) => {
            console.log(error);
          });

        this.$axios
          .get(urlParameter)
          .then((response) => {
            const data = response.data.data.data;
            for (let x = 0; x < data.length; x++) {
              const element = data[x];
              this.columns.push({
                label: element.txtParameterName,
                field: "input-txt",
                html: true,
              });

              parameter[element.txtParameterName] = {
                value: "parameter" + (x + 1),
                type: element.txtTipe,
              };
            }

            this.columns.push({
              label: "Action",
              field: "btn",
            });
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
        this.data[index][element]["disable"] = true;

        const typeParameter = this.data[index][element]["type"];

        parameter[element] = {
          value: "variabel",
          type: typeParameter,
        };
      });

      console.log(parameter);
      this.data.push(parameter);
    }
  },
  mounted() {
    this.getData();
    this.getFormName();
  },
};
</script>