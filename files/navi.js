$(document).ready(function () {
  $(document).on("click", "#back_button", function () {
    if (history.href !== "/") {
      console.log("BACK");
      history.back();
    }
  });
  $(document).on("click", "#back_home", function () {
    console.log("HOME");
    document.location.href = "/";
  });
});
