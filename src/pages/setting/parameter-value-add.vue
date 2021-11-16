<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Parameter Value</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">{{ label }} Parameter Value Setting</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel :title="label + ' Parameter'" class="col-md-8">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Parameter</label>
          <div class="col-md-10">
            <v-select
              :options="parameters"
              name="parameter_id"
              v-model="parameter_id"
              placeholder="Select Parameter"
              :multiple="true"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Custom Value</label>
          <div class="col-md-8">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Custom Value"
              name="custom_value"
              v-model="custom_value"
            />
          </div>
          <div class="col-md-2">
            <b-button
              v-if="url == 'add'"
              class="float-right mb-3"
              variant="primary"
              @click="addValue()"
              >Add Value</b-button
            >
          </div>
        </div>

        <vue-good-table
          v-if="url == 'add'"
          class="mt-3"
          :columns="columns"
          :rows="data_custom_value"
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
                @click="confirm(props.index)"
                >Delete</b-button
              >
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>

        <b-button
          class="float-right mb-3"
          variant="primary"
          @click="create()"
          >{{ label }}</b-button
        >
      </form>
    </panel>
    <!-- end panel -->
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "add-parameter",
  data() {
    return {
      parameters: [],
      columns: [
        {
          label: "PARAMETER NAME",
          field: "TEST_CODE",
        },
        {
          label: "CUSTOM VALUE",
          field: "CUSTOM_VALUE",
        },
        {
          label: "Action",
          field: "btn",
        },
      ],
      data_custom_value: [],
      custom_value: "",
      parameter_id: "",
      url: "",
      parameterID: "",
      label: "Create",
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.parameterID = currentUrl[5];
    this.url = currentUrl[4];
    this.label = this.url == "add" ? this.label : "Edit";
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    create() {
      if (this.url == "add") {
        this.$axios
          .post("/parameter-value", this.data_custom_value, {
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
              this.$router.push("/setting/form/parameter-value");
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
        let param = this.parameter_id;

        param = param.map((x) => {
          return x.label;
        });
        const body = {
          parameter: param.toString(),
          custom_value: this.custom_value,
        };
        this.$axios
          .put("/parameter-value/" + this.parameterID, body, {
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
              this.$router.push("/setting/form/parameter-value");
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
        const url = "/parameter-value/" + this.parameterID;
        this.$axios
          .get(url)
          .then((response) => {
            console.log(response);
            const data = response.data.data;
            let param = data.txtParameter.split(",");

            param = param.map((x) => {
              return {
                label: x,
                value: x,
              };
            });

            this.parameter_id = param;
            this.custom_value = data.txtCustomValue;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getOracleParameter() {
      const url = "/parameter/oracle-code";
      this.$axios
        .get(url)
        .then((response) => {
          this.parameters = response.data.data.data.map((x) => {
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
    addValue() {
      if (!this.parameter_id.value == "" && this.custom_value == "") {
        this.$notify({
          title: `Warning`,
          text: `Parameter & Custom Value Is Empty`,
          type: "warning",
        });
      } else {
        let param = this.parameter_id;

        param = param.map((x) => {
          return x.label;
        });
        this.data_custom_value.push({
          TEST_CODE: param.toString(),
          CUSTOM_VALUE: this.custom_value,
        });
      }
      this.custom_value = "";
    },
    confirm(index) {
      console.log(index);
      this.data.splice(index, 1);
    },
  },
  mounted() {
    this.getData();
    this.getOracleParameter();
  },
};
</script>
