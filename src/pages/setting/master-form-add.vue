<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Setting</li>
      <li class="breadcrumb-item active">{{ breadcumb }} Master Form</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">{{ header }} Form Master</h1>
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

          <label class="col-form-label col-md-2">No Document</label>
          <div class="col-md-4">
            <input
              type="input"
              class="form-control m-b-5"
              name="no_document"
              placeholder="Enter Document Name"
              v-model="no_document"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Lab</label>
          <div class="col-md-4">
            <v-select
              :options="labs"
              name="lab"
              v-model="lab"
              placeholder="Select Lab"
            >
            </v-select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Remark</label>
          <div class="col-md-10">
            <b-form-textarea
              rows="5"
              class="form-control m-b-5"
              placeholder="Remark"
              name="remark"
              v-model="remark"
            />
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-form-label col-md-2">Form Quality Control</label>
          <div class="col-md-4">
            <v-select
              :options="forms"
              name="form"
              v-model="form"
              placeholder="Select Form"
            >
            </v-select>
          </div>

          <b-button class="mb-1" variant="primary" @click="addParameter()"
            >Add Form</b-button
          >
        </div>

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
          class="float-right mt-3 ml-2"
          variant="primary"
          @click="create()"
          :disabled="isLoading"
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
      breadcumb: "Create",
      header: "Create",
      forms: [],
      form: "",
      data: [],
      formID: "",
      name: "",
      remark: "",
      url: "",
      no_document: "",
      columns: [
        {
          label : "FORM ID",
          field : "form_id",
        },
        {
          label: "FORM NAME",
          field: "form_name",
        },
        {
          label: "Action",
          field: "btn",
        },
      ],
      labs: [],
      lab: "",
      index: 1,
      isLoading : false
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.formID = currentUrl[4];
    this.url = currentUrl[3];
    this.breadcumb = this.url == "edit" ? "Update" : this.breadcumb;
    this.header = this.url == "edit" ? "Update" : this.header;
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
        lab_id: this.lab.value,
        no_doc: this.no_document,
        remark: this.remark,
        forms: this.data,
      };

      if (this.url == "add") {
        this.isLoading = true
        this.$axios
          .post("/master-form", body, {
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
            this.isLoading = false
            setTimeout(() => {
              this.$router.push("/setting/master-form");
            }, 1500);
          })
          .catch((err) => {
            this.isLoading = false
            this.$notify({
              title: `Insert Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      } else {
        this.isLoading = true
        this.$axios
          .put("/master-form/" + this.formID, body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.isLoading = false
            this.$notify({
              title: `Update Data Success`,
              text: `Success`,
              type: "success",
            });

            setTimeout(() => {
              this.$router.push("/setting/master-form");
            }, 1500);
          })
          .catch((err) => {
            this.isLoading = false
            this.$notify({
              title: `Update Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      }
    },
    getLabCode() {
      const url = "/lab/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.labs = response.data.data.data.map((x) => {
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
    getForm() {
      const url = "/form-parameter/code/list";
      this.$axios
        .get(url)
        .then((response) => {
          this.forms = response.data.data.data.map((x) => {
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
    getData() {
      if (this.url == "edit") {
        const url = "/master-form/" + this.formID;
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data;
            console.log(data)
            this.name = data.txtFormName;
            this.no_document = data.txtNoDok;
            this.remark = data.txtRemark;
            const lab = this.labs.find((x) => {
              return (x.value = data.intLabID);
            });

            this.lab = lab;
            data.form_list.forEach((element) => {
              this.data.push({
                form_id : element.id,
                form_name : element.txtFormName
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addParameter() {
      this.data.push({
        form_id : this.form.value,
        form_name: this.form.label,
      });
    },
    confirm(index) {
      console.log(index);
      this.data.splice(index, 1);
    },
  },
  mounted() {
    this.getLabCode();
    this.getData();
    this.getForm();
  },
};
</script>
