content = {
  'ED16': [
    {
      'name': 'Navigation',
      'type': 'main-header',
      'classes': ['main-header', 'list-divider'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Upcomming',
      'type': 'list-header',
      'classes': ['list-header', 'list-divider'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Schedule',
      'type': 'external_link',
      'url': 'http://voraschem.tk',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Information',
      'type': 'list-header',
      'classes': ['list-header', 'list-divider'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'School Information',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Upcomming Events',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'People',
      'type': 'list-header',
      'classes': ['list-header', 'list-divider'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Classmates',
      'type': 'list',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Teachers',
      'type': 'list',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },

    {
      'name': 'Subjects',
      'type': 'list-header',
      'classes': ['list-header', 'list-divider'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Web Development',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Computer Science',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Mechatronics',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Electromechanics',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Math',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'English',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    },
    {
      'name': 'Swedish',
      'type': 'content',
      'classes': ['list-item'],
      'element': '<li/>',
      'parent_id': 'sidebar'
    }
  ]
}
console.log(content);
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
    initialize(false);
  }
}



function get_schedule() {
  var time_array = time();
  var w = Math.round($('.schedule').width());
  var h = Math.round($('.schedule').height());
  var id = document.cookie.split('=')[1]
  var url = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=58700/sv-se&type=-1&id=' + id + '&period=&week=' + time_array[0] + '&mode=0&printer=0&colors=32&head=1&clock=1&foot=1&day=' + time_array[1] + '&width=' + w + '&height=' + h + '&maxwidth=' + w + '&maxheight=' + h + '';
  $('#schedule').attr('src', url);
}

function initialize(store_cookie) {
    if(store_cookie) {
      var id = $('#class-id').val();
      document.cookie = "id=" + id;
      $('.id').slideUp("100");
      $('.grid').slideDown("100");
    }
    else {
      var id = document.cookie.split('=')[1]
      $('.grid').show();
      $('.id').slideUp();
    }
    if(id in content) {
      get_schedule();
      for (var i = 0; i < content[id].length; i++) {
        tmp_item = content[id][i]
        item_text = ''
        base_element = ''
        class_array = tmp_item['classes'];
        class_string = ''
        for (var i = 0; i < class_array.length; i++) {
          class_string += class_array[i];
        }
      }
  }
  else {
    console.log("Sorry, this id doesn't exist in our database, are you sure you spelled it correctly?")
  }
}
