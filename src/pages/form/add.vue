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
              placeholder="Enter Product Name"
              name="name"
              v-model="okp"
              disabled
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
              name="name"
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
              name="name"
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
              name="birth_date"
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
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Product Name"
              name="name"
              v-model="product_desc"
            />
          </div>

          <label class="col-form-label col-md-1">{{ this.variable_name }}</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Variable Value"
              name="name"
              v-model="variable"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Parameter Name</label>
          <div class="col-md-4">
            <v-select
              :options="parameters"
              name="form_name"
              v-model="parameter_name"
            >
            </v-select>
          </div>

          <label class="col-form-label col-md-1">Parameter Value</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Parameter Value"
              name="name"
              v-model="parameter_value"
            />
          </div>
        </div>
        <vue-good-table :columns="columns" :rows="data" :line-numbers="true">
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
      variable_name : "",
      parameters: [],
      parameter_name: "",
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
      this.getDataParameter()
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
      console.log(this.url);
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
            console.log(x);
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
    getDataForm() {
      console.log("WAW");
      const url = "/form-parameter/"+this.form_name.value;
      this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.data
          this.name = data.txtName;
          this.okp = data.okp;
          this.no_doc = data.txtNoDoc
          this.product_name = data.txtProductName
          this.variable_name = data.txtVariableName
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataParameter(){
      const url = "/form-parameter/"+this.form_name.value+"/parameter";
      this.$axios
        .get(url)
        .then((response) => {
          this.parameters = response.data.data.data.map((x) => {
            return {
              label: x.txtParameterName,
              value: x.intParameterID,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getData();
    this.getFormName();
  },
};
</script>