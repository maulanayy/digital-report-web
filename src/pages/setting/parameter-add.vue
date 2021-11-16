<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Parameter</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">{{label}} Parameter Setting</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel :title="label+' Parameter'" class="col-md-8">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Parameter</label>
          <div class="col-md-10">
            <v-select
              :options="oracles"
              name="oracle_id"
              v-model="oracle_id"
              placeholder="Select Parameter"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Tipe</label>
          <div class="col-md-10">
            <v-select
              :options="types"
              v-model="tipe"
              placeholder="Select Type Parameter"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15" v-if="tipe == 'mesin'">
          <label class="col-form-label col-md-2">Topic</label>
          <div class="col-md-10">
            <v-select
              :options="topics"
              name="topic_id"
              v-model="topic_id"
              placeholder="Select Topic Ewon"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15" v-if="tipe == 'formula'">
          <label class="col-form-label col-md-2">Parameter Formula</label>
          <div class="col-md-10">
            <v-select
              :options="oracles"
              name="operator_parameter"
              v-model="operator_parameter"
              placeholder="Select Parameter Operator"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15" v-if="tipe == 'formula'">
          <label class="col-form-label col-md-2">Operator</label>
          <div class="col-md-10">
            <v-select
              :options="operators"
              name="operator"
              v-model="operator"
              placeholder="Select Operator"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15" v-if="tipe == 'formula'">
          <label class="col-form-label col-md-2">Value</label>
          <div class="col-md-10">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Value Formula"
              name="value_formula"
              v-model="value_formula"
            />
          </div>
        </div>
        
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
      parameter: {},
      name: "",
      topic_id: "",
      types: ["mesin", "oracle", "formula"],
      tipe: "",
      topics: [],
      params: [],
      oracles: [],
      oracle_id: "",
      operators: ["plus", "minus", "multiple", "devide"],
      operator: "",
      value_formula: "",
      url: "",
      parameterID: "",
      operator_parameter : "",
      label: "Create",
    };
  },
  watch: {
    tipe(value) {
      if (value == "mesin") {
        this.getTopics();
      }
    },
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
      const topicID = this.topic_id.value ? this.topic_id.value : 0;

      const body = {
        oracle_id: this.oracle_id.label,
        tipe: this.tipe,
        test_oracle_id: "01",
        topic_id: topicID,
        operator: this.operator,
        operator_value: this.value_formula,
        operator_parameter : this.operator_parameter.label
      };
      if (this.url == "add") {
        this.$axios
          .post("/parameter", body, {
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
              this.$router.push("/setting/form/parameter");
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
          .put("/parameter/" + this.parameterID, body, {
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
              this.$router.push("/setting/form/parameter");
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
        const url = "/parameter/" + this.parameterID;
        this.$axios
          .get(url)
          .then((response) => {
            console.log(response)
            const data = response.data.data;
            this.oracle_id = data.txtName;
            this.tipe = data.txtTipe;
            this.topic_id = data.intEwonSubsSettingID;
            this.operator = data.formula.txtOperator
            this.operator_parameter = data.formula.txtParameterOperator
            this.value_formula = data.formula.intValueOperator
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getTopics() {
      const url = "/setting/ewon/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.topics = response.data.data.data.map((x) => {
            return {
              label: x.txtTopic,
              value: x.id,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOracleParameter() {
      const url = "/parameter/oracle-code";
      this.$axios
        .get(url)
        .then((response) => {
          this.oracles = response.data.data.data.map((x) => {
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
  },
  mounted() {
    this.getData();
    this.getOracleParameter();
  },
};
</script>
