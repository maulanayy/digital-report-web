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
    <h1 class="page-header">Add Parameter Setting</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add Parameter" class="col-md-8">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Name</label>
          <div class="col-md-10">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Parameter"
              v-model="name"
            />
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
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Tipe Data</label>
          <div class="col-md-10">
            <v-select
              :options="data_types"
              v-model="tipe_data"
              placeholder="Select Type Data Parameter"
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
        <div class="form-group row m-b-15" v-if="tipe == 'oracle'">
          <label class="col-form-label col-md-2">Oracle Parameter</label>
          <div class="col-md-10">
            <v-select
              :options="oracles"
              name="topic_id"
              v-model="oracle_id"
              placeholder="Select Oracle Parameter"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Control Point</label>
          <div class="col-md-10">
            <v-select
              :options="contorlPoint"
              name="cp_id"
              placeholder="Enter Control Point"
              v-model="cp_id"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15" v-if="tipe_data == 'text'">
          <label class="col-form-label col-md-2">Standard</label>
          <div class="col-md-10">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Standard"
              v-model="txtStandard"
            />
          </div>
        </div>
        <div class="form-group row m-b-15" v-if="tipe_data == 'number'">
          <label class="col-form-label col-md-2">Standar Minimum</label>
          <div class="col-md-10">
            <input
              type="number"
              class="form-control m-b-5"
              placeholder="Enter Standard Minimum"
              v-model="numStandarMin"
              min="0"
            />
          </div>
        </div>
        <div class="form-group row m-b-15" v-if="tipe_data == 'number'">
          <label class="col-form-label col-md-2">Standar Maximum</label>
          <div class="col-md-10">
            <input
              type="number"
              class="form-control m-b-5"
              placeholder="Enter Standard Maximum"
              v-model="numStandarMax"
              min="0"
            />
          </div>
        </div>
        <!-- <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Upload Image</label>
          <div class="col-md-10">
            <input type="file" class="form-control m-b-5" placeholder="Input File Images" name="file" />
          </div>
        </div> -->
        <b-button
          class="float-right mb-3"
          variant="primary"
          @click="create()"
          v-if="url == 'add'"
          >Create</b-button
        >
        <b-button
          class="float-right mb-3"
          variant="primary"
          @click="create()"
          v-else
          >Edit</b-button
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
      parameter : {},
      name: "",
      topic_id: "",
      types: ["mesin", "oracle", "formula"],
      tipe: "",
      topics: [],
      contorlPoint: [],
      parameters: [],
      params: [],
      oracles : [],
      oracle_id : "",
      list_operator: ["plus", "minus", "multiple", "devide"],
      data_types: ["text", "number"],
      operator: "",
      cp_id: "",
      url: "",
      parameterID: "",
      tipe_data: "",
      pr_1: "",
      txtStandard: "",
      numStandarMin: 0,
      numStandarMax: 0,
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.parameterID = currentUrl[4];
    this.url = currentUrl[3];
    console.log(this.url)
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
        name: this.name,
        tipe: this.tipe,
        cp_id: this.cp_id.value,
        topic_id: topicID,
        tipe_data: this.tipe_data,
        txtStandard: this.txtStandard,
        numStandarMin: this.numStandarMin,
        numStandarMax: this.numStandarMax,
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
              this.$router.push("/setting/parameter");
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
              this.$router.push("/setting/parameter");
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
            const data = response.data.data
            console.log(response.data.data)
            this.name = data.txtName;
            this.tipe = data.txtTipe
            this.tipe_data = data.txtTipeData
            // this.topic_id = data.intEwonSubsSettingID
            this.numStandarMin = data.IntStandarMin
            this.numStandarMax = data.IntStandarMax
            this.txtStandard = data.txtStandardText
            // this.cp_id = data.intControlPointID
            console.log(this.parameter)
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
      const url = "/parameter";
      this.$axios
        .get(url)
        .then((response) => {
          this.parameters = response.data.data.data.map((x) => {
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
      this.params.push({
        parameter: "",
        operator: "",
      });
    },
    deleteParameter(counter) {
      this.params.splice(counter, 1);
    },
  },
  mounted() {
    this.getData();
    this.getCP();
    this.getTopics();
    this.getParameter();
  },
};
</script>