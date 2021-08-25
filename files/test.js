$(document).ready(function () {
  var formData = new FormData();
  gtag_progress("initial page landed");

  $(document).on("click", "#test_start", function () {
    gtag_progress("test start");
    $("#start_inner").remove();
    next_set(1);
  });

  $(document).on("click", ".next_question", function () {
    var current_count = $(this).closest(".question_inner").attr("count");
    var qid = $(this).closest(".question_inner").attr("qid");
    var aid = $(this).attr("aid");
    var next_count = parseInt(current_count) + 1;
    gtag_progress("question #" + current_count + " click");

    $(".question_inner[count=" + current_count + "]").remove();
    formData.append(`${qid}`, `${aid}`);
    if ($(".question_inner[count=" + next_count + "]").length) {
      next_set(next_count);
    } else {
      $("#progress_inner").remove();
      $("#loading_inner").css("display", "flex");
      anime
        .timeline({
          loop: true,
        })
        .add({
          targets: "#loading_inner .fade_anime",
          opacity: 1,
          duration: 500,
          delay: function (el, i) {
            return i * 500;
          },
        })
        .add({
          targets: "#loading_inner .fades",
          opacity: 0,
          duration: 500,
          easing: "easeOutExpo",
          delay: 0,
        });

      money_anime(1);
      money_anime(2);
      money_anime(3);

      window.setTimeout(function () {
        var rand_1_8 = Math.floor(Math.random() * 7) + 1;
        console.log("random number = " + rand_1_8);

        var file_name = "./result/type" + rand_1_8 + ".html";
        location.href = file_name;
      }, 2000);
    }
  });

  function next_set(i) {
    var next_elements = $(".question_inner[count=" + i + "]");

    //광고 링크 attr 재설정
    $(".ad_href").attr("page", "question #" + i);
    next_elements.css("display", "flex");
    question_page_animation(i);
  }
});

function money_anime(i) {
  if (i == 1) {
    duration_t = 1000;
    delay_t = 500;
  } else if (i == 2) {
    duration_t = 800;
    delay_t = 0;
  } else {
    duration_t = 900;
    delay_t = 900;
  }
  window.setTimeout(function () {
    anime({
      targets: "#loading_inner #loading_image" + i,
      translateY: -20,
      direction: "alternate",
      loop: true,
      duration: duration_t,
      easing: "easeInOutSine",
    });
  }, delay_t);
}

function question_page_animation(i) {
  anime.timeline().add({
    targets: ".question_inner[count='" + i + "'] .next_question",
    translateX: ["120%", 0],
    duration: 1000,
    easing: "easeOutCirc",
    delay: function (el, i) {
      return i * 100;
    },
  });
}