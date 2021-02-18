<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Ewon</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Add Ewon Setting</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add Control Point">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Topic</label>
          <div class="col-md-9">
            <input type="input" class="form-control m-b-5" placeholder="Enter Topic" />
          </div>
        </div>
         <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Type Topic</label>
          <div class="col-md-9">
            <input type="input" class="form-control m-b-5" placeholder="Enter Type Topic" />
          </div>
        </div>
        
        <b-button class="float-right mb-3" variant="primary">Create</b-button>
      </form>
    </panel>
    <!-- end panel -->
  </div>
</template>

<script>
  import PageOptions from "../../config/PageOptions.vue";

  export default {
    name: "add-lab",
    created() {
      PageOptions.pageWithFooter = true;
    },
    beforeRouteLeave(to, from, next) {
      PageOptions.pageWithFooter = false;
      next();
    },
  };
</script>