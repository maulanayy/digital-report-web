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
              :disabled="url == 'edit' ? true : false"
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
              :disabled="url == 'edit' ? true : false"
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
          <label class="col-form-label col-md-2">Gender</label>
          <div class="col-md-5">
            <v-select :options="['Male', 'Female']" name="gender" v-model="gender">
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
              :options="labs"
              name="lab"
              v-model="lab"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Control Point</label>
          <div class="col-md-5">
            <v-select
              :options="contorlPoint"
              name="control_point"
              v-model="control_point"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Role</label>
          <div class="col-md-5">
            <v-select
              :options="roles"
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
      userID: "",
      url: "",
      labs: [],
      contorlPoint : [],
      roles : [],
      role: "",
      lab : "",
      password : "",
      username : "",
      department : "",
      gender : "",
      age : 0,
      birth_date : "",
      control_point : ""
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.userID = currentUrl[3];
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
        username : this.name,
        password : this.password,
        department : this.department,
        gender : this.gender,
        age : this.age,
        birth_date : this.birth_date,
        role : this.role.value,
        lab : this.lab.value,
        control_point : this.control_point.value,
      };
      if (this.url == "add") {
        this.$axios
          .post("/user", body, {
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
              this.$router.push("/user");
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
          .put("/user/" + this.userID, body, {
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
              this.$router.push("/user");
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
        const url = "/user/" + this.userID;
        this.$axios
          .get(url)
          .then((response) => {
            console.log(response.data.data)
            this.name = response.data.data.txtName;
            this.username = response.data.data.txtUsername;
            this.age = response.data.data.intAge;
            this.birth_date = response.data.data.dtmBirtDate;
            this.gender = response.data.data.txtSex;
            this.department = response.data.data.txtDepartment;
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
    getLab() {
      const url = "/lab/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.labs = response.data.data.data.map(x => {
            return {
              label : x.txtName,
              value : x.id
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRole() {
      const url = "/role/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.roles = response.data.data.data.map(x => {
            return {
              label : x.txtName,
              value : x.id
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getData();
    this.getCP();
    this.getLab();
    this.getRole();
  },
};
</script>