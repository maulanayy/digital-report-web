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
    <h1 class="page-header">Create New Form</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Create New Form">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Form Name</label>
          <div class="col-md-4">
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
          <label class="col-form-label col-md-1">No Document</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter No Document"
              v-model="no_doc"
            />
          </div>
          <label class="col-form-label col-md-1">OKP</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Name OKP"
              v-model="okp"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Name</label>
          <div class="col-md-4">
            <v-select
              :options="products"
              v-model="product_name"
              placeholder="Select Product"
            >
            </v-select>
          </div>
          <label class="col-form-label col-md-1">Variable Name</label>
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
          <label class="col-form-label col-md-1">Remark</label>
          <div class="col-md-9">
            <b-form-textarea
              rows="5"
              class="form-control m-b-5"
              placeholder="Remark"
              name="remark"
              v-model="remark"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Parameter Name</label>
          <div class="col-md-4">
            <v-select
              :options="parameters"
              v-model="parameter"
              placeholder="Select Parameter"
            >
            </v-select>
          </div>
          <div class="col-md-2">
            <b-button
              class="float-left"
              variant="primary"
              @click="addParameter()"
              >Add Parameter</b-button
            >
          </div>
        </div>
        <vue-good-table
          :columns="columns"
          :rows="dataTable"
          :line-numbers="true"
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
      no_doc: "",
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
      columns: [
        {
          label: "Parameter ID",
          field: "parameterID",
        },
        {
          label: "Paramater Name",
          field: "parameter",
        },
        {
          label: "Action",
          field: "btn",
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
    cp_id(value) {
      this.getParameter(value.value);
    },
  },
  methods: {
    create() {
      const body = {
        name: this.name,
        cp_id: this.cp_id.value,
        no_doc: this.no_doc,
        okp: this.okp,
        product: this.product_name.value,
        variable: this.variable,
        remark: this.remark,
        dataParameter: this.dataTable,
      };

      console.log(body);
      console.log(this.url)
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
        const url = "/form/" + this.cpId;
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
    getParameter() {
      console.log("CONTROL POINT : ", this.cp_id);
      const url = "/parameter/" + this.cp_id.value + "/control-point";
      this.$axios
        .get(url)
        .then((response) => {
          this.parameters = response.data.data.data.map((x) => {
            return {
              label: x.parameter_name,
              value: x.ID,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProduct() {
      const url = "/product/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.products = response.data.data.data.map((x) => {
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
    addParameter() {
      if (this.parameter.value) {
        this.dataTable.push({
          parameterID: this.parameter.value,
          parameter: this.parameter.label,
        });
      } else {
        this.$notify({
          title: `Add Data Failed : Parameter is Empty`,
          text: `Error`,
          type: "error",
        });
      }
    },
    deleteData(index) {
      this.data.splice(index, 1);
    },
  },
  mounted() {
    this.getData();
    this.getCP();
    this.getProduct();
  },
};
</script>