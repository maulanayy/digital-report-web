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
    <h1 class="page-header">{{ label_form }}</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Create New Form">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Form Name</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Form Name"
              v-model="name"
            />
          </div>
          <label class="col-form-label col-md-2">Control Point</label>
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

        <div class="form-group row mb-2">
          <label class="col-form-label col-md-2">Search Parameter</label>
          <div class="col-md-4">
            <v-select
              :options="params"
              name="param"
              v-model="param"
              placeholder="Select Parameter"
            >
            </v-select>
          </div>

          <label class="col-form-label col-md-2">Custom Parameter Name</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control mb-1"
              placeholder="Enter Parameter Name"
              v-model="custom_parameter_name"
            />
          </div>
        </div>

        <div class="form-group row mb-1">
          <label class="col-form-label col-md-1">Type Parameter</label>
          <div class="col-md-3">
            <v-select
              :options="types"
              name="type_parameters"
              v-model="type_parameters"
              placeholder="Select Type Parameter"
            >
            </v-select>
          </div>
          <label class="col-form-label col-md-1">Parameter MIN Value</label>
          <div class="col-md-3">
            <input
              type="input"
              class="form-control mb-1"
              placeholder="Enter Minimum Value"
              v-model="min_value"
            />
          </div>

          <label class="col-form-label col-md-1">Parameter MAX Value</label>
          <div class="col-md-3">
            <input
              type="input"
              class="form-control mb-1"
              placeholder="Enter Maximum Value"
              v-model="max_value"
            />
          </div>
        </div>
        <b-button class="mb-1" variant="primary" @click="addParameter()"
          >Add Parameter</b-button
        >

        <vue-good-table
          class="mt-3"
          :columns="columns"
          :rows="data"
          :line-numbers="true"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 10,
            perPageDropdownEnabled: false,
            position: 'bottom',
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
                @click="confirm(props)"
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
          :disabled="isLoading"
          >{{ label_button }}</b-button
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
      label_form: "Create Form QC",
      label_button: "Create",
      types : [
        {
          label: "VALUE",
          value: "VALUE",
        },
        {
          label: "NUMBER",
          value: "NUMBER",
        },
      ],
      type_parameters : "",
      params: [],
      param: "",
      no_doc: "",
      no_document: "",
      documents: [],
      data: [],
      formID: "",
      name: "",
      remark: "",
      cp_id: "",
      url: "",
      custom_parameter_name: "",
      min_value: "",
      max_value: "",
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
          label: "TYPE PARAMETER",
          field: "TYPE_PARAMETER",
        },
        {
          label: "TYPE VALUE",
          field: "TYPE_VALUE",
        },
        {
          label: "MIN VALUE",
          field: "MIN_VALUE",
        },
        {
          label: "MAX VALUE",
          field: "MAX_VALUE",
        },
        {
          label: "Action",
          field: "btn",
        },
      ],
      dataTable: [],
      options: [],
      contorlPoint: [],
      parameters: [],
      meta: {},
      index: 1,
      batchs: [],
      batch_id: "",
      isLoading: false,
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.formID = currentUrl[5];
    this.url = currentUrl[4];
    this.label_form = this.url == "edit" ? "Edit Form QC" : this.label_form;
    this.label_button = this.url == "edit" ? "Edit" : this.label_button;
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    create() {
      const body = {
        name: this.name,
        cp_id: this.cp_id.value,
        batch_type: this.batch_id.value,
        no_doc: this.no_document,
        remark: this.remark,
        dataParameter: this.data,
      };

      if (this.url == "add") {
        this.isLoading = true;
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
            this.isLoading = false;
            setTimeout(() => {
              this.$router.push("/setting/form/qc");
            }, 1500);
          })
          .catch((err) => {
            this.isLoading = false;
            this.$notify({
              title: `Insert Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      } else {
        this.isLoading = true;
        this.$axios
          .put("/form-parameter/" + this.formID, body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.isLoading = false;
            this.$notify({
              title: `Update Data Success`,
              text: `Success`,
              type: "success",
            });

            setTimeout(() => {
              this.$router.push("/setting/form/qc");
            }, 1500);
          })
          .catch((err) => {
            this.isLoading = false;
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
            this.remark = data.txtRemark;
            const CP = this.contorlPoint.find(x => {
              if (x.value == data.intControlPointID){
                return x
              }
            });

            this.cp_id = CP
            data.parameter.forEach((element) => {
              const minValue =
                element.intMinValue == 0 ? "not defined" : element.intMinValue;
              const maxValue =
                element.intMaxValue == 0 ? "not defined" : element.intMaxValue;

              this.data.push({
                TEST_CODE: element.txtParameterName,
                TEST_DESC: element.txtParameterName,
                TYPE_VALUE: element.txtParameterValueType,
                TYPE_PARAMETER: element.txtParameterType,
                MIN_VALUE: minValue,
                MAX_VALUE: maxValue,
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
    getParameter() {
      const url = "/parameter/oracle-code";
      this.$axios
        .get(url)
        .then((response) => {
          this.params = response.data.data.data.map((x) => {
            return {
              label: x.TEST_CODE,
              value: x.TEST_CODE,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addParameter() {
      console.log(this.param.value);
      let typeValue = this.type_parameters.value;
      if (!this.type_parameters.value) {
        this.$notify({
          title: `Warning`,
          text: `Parameter Type Is Empty`,
          type: "warning",
        });
      }
      if (!this.param.value && this.custom_parameter_name == "") {
        this.$notify({
          title: `Warning`,
          text: `Parameter Is Empty`,
          type: "warning",
        });
      } else {
        console.log("PARAM : ",this.param.value)
        // if (this.param.value) {
        //   const url = "/parameter/" + this.param.value + "/oracle";
        //   const type = await this.$axios.get(url);

        //   // if (!type.data.data.MIN_VALUE || !type.data.data.MAX_VALUE) {
        //   //   typeValue = "VALUE";
        //   // } else {
        //   //   typeValue = "NUMBER";
        //   // }
        // }

        const parameter =
          this.custom_parameter_name != ""
            ? this.custom_parameter_name
            : this.param.value;
        const minValue =
          this.custom_parameter_name != "" ? this.min_value : "not defined";
        const maxValue =
          this.custom_parameter_name != "" ? this.max_value : "not defined";
        const typeParameter =
          this.custom_parameter_name != "" ? "custom" : "oracle";

          // if (minValue == "" || maxValue == "") {
          //   typeValue = "VALUE";
          // }else{
          //   typeValue = "NUMBER";
          // }

        if (this.custom_parameter_name != "" || this.param.value != "") {
          this.data.push({
            TEST_CODE: parameter,
            TEST_DESC: parameter,
            TYPE_PARAMETER: typeParameter,
            TYPE_VALUE: typeValue,
            MIN_VALUE: minValue,
            MAX_VALUE: maxValue,
          });
        }

        this.custom_parameter_name = "";
        this.min_value = "";
        this.max_value = "";
        this.param = "";
        this.type_parameters = "";
      }
    },
    confirm(props) {
      const testCode = props.row.TEST_CODE
      const index = this.data.findIndex(x => {
        return x.TEST_CODE == testCode 
      })

      this.data.splice(index, 1);
    },
  },
  beforeMount(){
    this.getCP();
    this.getParameter();
  },
  mounted() {
    this.getData();
  },
};
</script>
