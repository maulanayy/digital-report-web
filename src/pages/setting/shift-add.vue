<template>
    <div>
        <!-- begin breadcrumb -->
        <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
            <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
            <li class="breadcrumb-item active">Jadwal Shift</li>
        </ol>
        <!-- end breadcrumb -->
        <!-- begin page-header -->
        <h1 class="page-header">{{label}}</h1>
        <!-- end page-header -->

        <!-- begin panel -->
        <panel :title=label>
            <form>
                <div class="form-group row m-b-15">
                    <label class="col-form-label col-md-3">Name</label>
                    <div class="col-md-9">
                        <input type="input" class="form-control m-b-5" placeholder="Enter Name Shift" name="name"
                            v-model="name" />
                    </div>
                </div>
                <div class="form-group row m-b-15">
                    <label class="col-form-label col-md-3">Shift Start</label>
                    <div class="col-md-9">
                        <b-form-timepicker id="shift-start" v-model="shift_start" name="shift_start"
                            class="form-control m-b-5" />
                    </div>
                </div>
                <div class="form-group row m-b-15">
                    <label class="col-form-label col-md-3">Shift Start</label>
                    <div class="col-md-9">
                        <b-form-timepicker id="shift-end" v-model="shift_end" name="shift_end"
                            class="form-control m-b-5" />
                    </div>
                </div>
                <b-button class="float-right mb-3" variant="primary" @click="create()" v-if="url == 'add'">Create
                </b-button>
                <b-button class="float-right mb-3" variant="primary" @click="create()" v-else>Edit</b-button>
            </form>
        </panel>
        <!-- end panel -->

        <notifications position="top right" class="mt-3 ml-3" :speed="500" />
    </div>
</template>

<script>
    import PageOptions from "../../config/PageOptions.vue";

    export default {
        name: "add-shift",
        data() {
            return {
                name: "",
                shiftId: "",
                url: "",
                shift_start: "",
                shift_end: "",
                label: "",
            };
        },
        created: function () {
            var currentUrl = this.$route.path.split("/");
            this.shiftId = currentUrl[4];
            this.url = currentUrl[3];
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
                    shift_start : this.shift_start,
                    shift_end : this.shift_end
                };
                if (this.url == "add") {
                    this.$axios
                        .post("/shift", body, {
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
                                this.$router.push("/setting/shift");
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
                        .put("/shift/" + this.shiftId, body, {
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
                                this.$router.push("/setting/shift");
                            }, 1500);
                        })
                        .catch((err) => {
                            console.log(err)
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
                    this.label = "Edit Jadwal Shift"
                    const url = "/shift/" + this.shiftId;
                    this.$axios
                        .get(url)
                        .then((response) => {
                            this.name = response.data.data.txtName;
                            this.shift_start = response.data.data.dtmTimeStart;
                            this.shift_end = response.data.data.dtmTimeEnd;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    this.label = "Create Jadwal Shift";
                }
            },
        },
        mounted() {
            this.getData();
        },
    };
</script>