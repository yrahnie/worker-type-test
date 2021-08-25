$(document).ready(function () {
  $(document).on("click", "#back_button", function () {
    if (window.location.pathname !== "/") {
      console.log("BACK");
      history.back();
    }
  });
  $(document).on("click", "#back_home", function () {
    console.log("HOME");
    document.location.href = "/";
  });
});
