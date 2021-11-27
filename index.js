$(document).ready(function () {
  $("#btn").attr("disabled", true);
  $("#username").keyup(function () {
    if ($("#username").val().length != 0) {
      $("#btn").attr("disabled", false);
    } else $("#btn").attr("disabled", true);
  });

  $("button").click(function () {
    let username = $("#username").val();

    if (!username) {
      ({
        type: "GET",
        url: `https://api.github.com/users/${username}/repos`,
        data: { get_param: "name" },
        dataType: "json",
        success: function (data) {
          $.each(data, function (index, element) {
            $("body").append(
              $("<div>", {
                text: element.name,
              })
            );
          });
        },
      });
      window.alert("Enter a username");
    } else {
      $.ajax({
        type: "GET",
        url: `https://api.github.com/users/${username}/repos`,
        data: { get_param: "name" },
        dataType: "json",
        success: function (data) {
          console.log(data);
          $("tbody").empty();
          $.each(data, function (index, element) {
            let $tr = $("<tr>").append(
              $("<td>").text(element.name),
              $("<td>").text(
                element.description ? element.description : "No description"
              ),
              $("<td>").text(element.stargazers_count)
            );
            $("tbody").append($tr);
          });
        },
        error: function (xhr, ajaxOptions, thrownError) {
          window.alert("Username not found");
        },
      });
    }
  });
});
