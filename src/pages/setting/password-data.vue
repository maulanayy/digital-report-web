<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Password</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Password</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Data Roles">
      <b-button to="#" v-b-modal.CreateDialog class="mb-3" variant="primary"
        ><b>Create</b>
      </b-button>
      <vue-good-table
        :columns="columns"
        :rows="data"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: this.meta.perPage,
          position: 'bottom',
          perPageDropdown: [3, 7, 9],
          dropdownAllowAll: false,
          setCurrentPage: 2,
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
              variant="primary"
              class="mr-2"
              :to="'/setting/shift/edit/' + props.row.id"
              >Edit</b-button
            >
            <b-button
              variant="danger"
              class="mr-2"
              @click="confirm(props.row.id)"
              >Delete</b-button
            >
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </panel>
    <!-- end panel -->
    <b-modal
      id="CreateDialog"
      hide-footer
      cancel-variant="default"
      title="Create Setting Password"
      :to="'#'"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form @submit.stop.prevent="create" method="POST" class="margin-bottom-0">
        <div class="form-group m-b-20">
          <input
            type="number"
            class="form-control form-control-lg inverse-mode"
            placeholder="Setting Hour"
            v-model="hoursSetting"
            required
          />
        </div>
        <div class="login-buttons">
          <button
            type="submit"
            class="btn btn-success btn-block btn-lg"
            @click="handleOk"
          >
            Create
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "data-role",
  data() {
    return {
      roleID: "",
      confirmation: false,
      columns: [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "Name",
          field: "txtName",
        },
        {
          label: "Created At",
          field: "dtmCreatedAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd'T'17:00:00.000'Z'",
          dateOutputFormat: "dd-MM-yyyy",
        },
        {
          label: "Action",
          field: "btn",
        },
      ],
      hoursSetting: 0,
      data: [],
      meta: {},
    };
  },
  created() {
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    closeDialog() {
      this.$bvModal.hide("CreateDialog");
    },
    resetModal() {
      this.hoursSetting = 0;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.create();
    },
    create() {
      const body = {
        hour_setting: this.hoursSetting,
      };

      this.$axios
        .post("/setting/password", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.$bvModal.hide("loginDialog");
        })
        .catch((err) => {
          console.log(err);
        });
      this.$nextTick(() => {
        this.$bvModal.hide("loginDialog");
      });
    },
    getData() {
      const url = "/setting/password";
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data.data.data;
          this.meta = response.data.data.meta;
          // console.log(this.meta)
        })
        .catch((error) => {
          this.$notify({
            title: `Update Data Failed : ${error}`,
            text: `Error`,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
