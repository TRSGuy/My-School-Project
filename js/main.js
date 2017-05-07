function time() {
    var now = new Date();
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };
    var week_number = (new Date()).getWeek();
    var day_number = now.getDay();
    var day_array = [1, 1, 2, 4, 8, 16];
    var array_day = day_array[day_number];
    return [week_number, array_day, day_number];
}

window.onload = main();
window.onresize = function(event) {
  if (document.cookie !== "") {
    get_schedule();
  }
};
function main() {
  if (document.cookie !== "") {
    $('.id').hide(0, get_schedule());
  }
  else {
    $('.grid').hide();
  }
}

function get_schedule() {
  var time_array = time();
  var w = Math.trunc($('.schedule').width());
  var h = Math.trunc($('.schedule').height());
  var id = document.cookie.split('=')[1]
  var url = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=58700/sv-se&type=-1&id=' + id + '&period=&week=' + time_array[0] + '&mode=0&printer=0&colors=32&head=1&clock=1&foot=1&day=' + time_array[1] + '&width=' + w + '&height=' + h + '&maxwidth=' + w + '&maxheight=' + h + '';
  $('#schedule').attr('src', url);
}

function initialize() {
  var id = $('#class_id').val();
  document.cookie = "id=" + id;
  $('.id').slideUp("100");
  $('.grid').slideDown("100");


}
