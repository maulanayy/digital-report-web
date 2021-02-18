<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">User</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Add User</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add User" class="col-md-10">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Username</label>
          <div class="col-md-5">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Username"
              name="username"
              v-model="username"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Password</label>
          <div class="col-md-5">
            <input
              type="password"
              class="form-control m-b-5"
              placeholder="Enter Password"
              name="password"
              v-model="password"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Name</label>
          <div class="col-md-5">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Name"
              name="name"
              v-model="name"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Department</label>
          <div class="col-md-5">
            <v-select
              :options="['Lab Inline', 'Lab Micro']"
              name="department"
              v-model="department"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Relationship</label>
          <div class="col-md-5">
            <v-select
              :options="['Lab Inline', 'Lab Micro']"
              name="relationship"
              v-model="relationship"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Sex</label>
          <div class="col-md-5">
            <v-select :options="['Male', 'Female']" name="sex" v-model="sex">
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Age</label>
          <div class="col-md-5">
            <input
              type="number"
              class="form-control m-b-5"
              placeholder="Enter Age"
              name="age"
              min="0"
              v-model="age"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Birth Date</label>
          <div class="col-md-5">
            <b-form-datepicker
              id="birth-date"
              v-model="birth_date"
              name="birth_date"
              class="form-control m-b-5"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Lab</label>
          <div class="col-md-5">
            <v-select
              :options="['Lab Inline', 'Lab Micro']"
              name="id_lab"
              v-model="lab_id"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Control Point</label>
          <div class="col-md-5">
            <v-select
              :options="[
                'Incoming RM',
                'Incoming PM',
                'Incoming FG',
                'OPRP',
                'PRP',
                'Front Line',
                'COMPOUNDING MIX',
              ]"
              name="id_cp"
              v-model="cp_id"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Role</label>
          <div class="col-md-5">
            <v-select
              :options="['Superadmin', 'Validator', 'Admin', 'Inspector']"
              name="role"
              v-model="role"
            >
            </v-select>
          </div>
        </div>
        <b-button class="float-right mb-3" variant="primary" @click="create()"
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
  name: "add-area",
  data() {
    return {
      name: "",
      areaId: "",
      url: "",
      lab_category: [
        {
          id: 1,
          name: "Lab Inline",
        },
        {
          id: 2,
          name: "Lab Micru",
        },
      ],
      lab_id: 0,
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.areaId = currentUrl[3];
    this.url = currentUrl[2];
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
        lab_id: 1,
      };

      if (this.url == "add") {
        this.$axios
          .post("/area", body, {
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
              this.$router.push("/area");
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
          .put("/area/" + this.areaId, body, {
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
              this.$router.push("/area");
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
        const url = "/area/" + this.labId;
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
  },
  mounted() {
    this.getData();
  },
};
</script>