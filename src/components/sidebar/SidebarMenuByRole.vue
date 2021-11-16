<script>
const sidebarMenuByRole = {
  guest: [{ path: "/home", icon: "fa fa-th", title: "Home" }],
  superadmin: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/lab", icon: "fa fa-flask", title: "Lab" },
    { path: "/area", icon: "fa fa-warehouse", title: "Area" },
    { path: "/control_point", icon: "fa fa-sliders-h", title: "Control Point" },
    { path: "/form", icon: "fa fa-file", title: "Form Analytic" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/ewon", icon: "fa fa-cog",title: "Tag Name" },
        { path: "/setting/oracle", icon: "fa fa-cog",title: "Oracle" },
        { 
          path: "/setting/form" , 
          icon: "fa fa-file",
          title: "Form",
          children : [
            { path: "/setting/form/qc", icon: "fa fa-cog",title: "Form QC" },
            { path: "/setting/form/master", icon: "fa fa-cog",title: "Master Form" },
            { path: "/setting/form/okp", icon: "fa fa-cog",title: "Type OKP" },
            { path: "/setting/form/parameter", icon: "fa fa-cog",title: "Parameter" },
            { path: "/setting/form/parameter-value", icon: "fa fa-cog",title: "Custom Parameter Value" },
          ]
        },
        { 
          path: "/setting/user", 
          title: "User",
          icon: "fa fa-user",
          children : [
            { path: "/setting/user/shift", title: "Shift" },
            { path: "/setting/user/password", title: "Password" },
          ]
        },
      ],
    },
  ],
  supervisor: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/area", icon: "fa fa-warehouse", title: "Area" },
    { path: "/control_point", icon: "fa fa-sliders-h", title: "Control Point" },
    { path: "/form", icon: "fa fa-file", title: "Form Analytic" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/parameter", title: "Parameter" },
        { path: "/setting/form", title: "Form QC" },
        { path: "/setting/master-form", title: "Master Form" },
        { path: "/setting/type-okp", title: "Type OKP" },
        { path: "/setting/form/parameter-value", icon: "fa fa-cog",title: "Parameter Value" },
      ],
    },
  ],
  admin: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
  ],
  leader: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/form", icon: "fa fa-file", title: "Form Analytic" },
    { path: "/master-form", icon: "fa fa-file", title: "Master Form" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/form", title: "Form QC" },
        { path: "/setting/master-form", title: "Master Form" },
      ],
    },
  ],
  inspector: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
  ],
};

export default sidebarMenuByRole;
</script>
