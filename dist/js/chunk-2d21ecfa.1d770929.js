(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ecfa"],{d6c5:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t._m(0),e("h1",{staticClass:"page-header"},[t._v("Control Point")]),e("panel",{attrs:{title:"Data Control Point"}},[e("b-button",{staticClass:"mb-3",attrs:{variant:"primary",to:"/control_point/add"}},[t._v("Create")]),e("vue-good-table",{attrs:{columns:t.columns,rows:t.data,"pagination-options":{enabled:!0,mode:"records",perPage:this.meta.perPage,position:"bottom",perPageDropdown:[3,7,9],dropdownAllowAll:!1,setCurrentPage:2,nextLabel:"next",prevLabel:"prev",rowsPerPageLabel:"Rows per page",ofLabel:"of",pageLabel:"page",allLabel:"All"}},scopedSlots:t._u([{key:"table-row",fn:function(a){return["btn"==a.column.field?e("span",[e("b-button",{staticClass:"mr-2",attrs:{variant:"primary",to:"/control_point/edit/"+a.row.id}},[t._v("Edit")]),e("b-button",{staticClass:"mr-2",attrs:{variant:"danger"},on:{click:function(e){return t.confirm(a.row.id)}}},[t._v("Delete")])],1):e("span",[t._v(" "+t._s(a.formattedRow[a.column.field])+" ")])]}}])})],1),e("b-overlay",{attrs:{show:t.confirmation,"no-wrap":""},scopedSlots:t._u([{key:"overlay",fn:function(){return[e("div",{ref:"dialog",staticClass:"text-center p-3",attrs:{tabindex:"-1",role:"dialog","aria-modal":"false","aria-labelledby":"form-confirm-label"}},[e("p",[e("strong",{attrs:{id:"form-confirm-label"}},[t._v("Are you sure?")])]),e("div",{staticClass:"d-flex"},[e("b-button",{staticClass:"mr-3",attrs:{variant:"outline-danger"},on:{click:t.onCancel}},[t._v(" Cancel ")]),e("b-button",{attrs:{variant:"outline-success"},on:{click:t.deleteData}},[t._v("OK")])],1)])]},proxy:!0}])})],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ol",{staticClass:"breadcrumb float-xl-right"},[e("li",{staticClass:"breadcrumb-item"},[e("a",{attrs:{href:"javascript:;"}},[t._v("Home")])]),e("li",{staticClass:"breadcrumb-item active"},[t._v("Page with Footer")])])}],r=e("30e0"),i={name:"data-control-point",data:function(){return{cpID:"",confirmation:!1,columns:[{label:"ID",field:"id",type:"number"},{label:"Name",field:"txtName"},{label:"Area",field:"areaTxtName"},{label:"Created At",field:"dtmCreatedAt",type:"date",dateInputFormat:"yyyy-MM-dd'T'17:00:00.000'Z'",dateOutputFormat:"dd-MM-yyyy"},{label:"Action",field:"btn"}],data:[],meta:{}}},created:function(){r["a"].pageWithFooter=!0},beforeRouteLeave:function(t,a,e){r["a"].pageWithFooter=!1,e()},methods:{onCancel:function(){this.confirmation=!1},confirm:function(t){this.cpID=t,this.confirmation=!0},getData:function(){var t=this,a="/control-point";this.$axios.get(a).then((function(a){t.data=a.data.data.data,t.meta=a.data.data.meta,console.log(t.data)})).catch((function(a){t.$notify({title:"Update Data Failed : ".concat(a),text:"Error",type:"error"})}))},deleteData:function(){var t=this,a="/control-point/"+this.cpID;this.$axios.delete(a,{}).then((function(){t.$notify({title:"Delete Data Success",text:"Success",type:"success"}),setTimeout((function(){location.reload()}),1500)})).catch((function(a){t.$notify({title:"Delete Data Failed : ".concat(a),text:"Error",type:"error"})}))}},mounted:function(){this.getData()}},l=i,c=e("2877"),s=Object(c["a"])(l,o,n,!1,null,null,null);a["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d21ecfa.1d770929.js.map