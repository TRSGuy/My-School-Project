content = {
  'Upcomming Events': {
    'header': 'Upcomming events',
    'content-type': 'text',
    'content': 'There is currently nothing scheduled for the rest of this week!'
  },
  'Classmates': {
    'header': 'Classmates',
    'content-type':'name-list',
    'content': [['John', 'Doe'], ['John', 'Doe II'], ['John', 'Doe III'], ['John', 'Doe IV']]
  },
  'Teachers': {
    'header': 'Teachers',
    'content-type':'contact-list',
    'content': [
      {
        'subject': 'Computer Science',
        'teacher-name': ['Vahap', 'Bilgec'],
        'picture-url': false
      },
      {
        'subject': 'Web Development',
        'teacher-name': ['Garabed', 'Hakopian'],
        'picture-url': false
      },
      {
        'subject': 'Mechatronics',
        'teacher-name': ['Shirin', 'Nasirpour'],
        'picture-url': false
      },
      {
        'subject': 'Electromechanics',
        'teacher-name': ['Kjell', 'Nyberg'],
        'picture-url': false // All false should be replaced with http://www.shawnee.edu/_resources/images/profile-placeholder.png
      },
      {
        'subject': 'English',
        'teacher-name': ['Catharina', 'Winbäck'],
        'picture-url': false
      },
      {
        'subject': 'Math',
        'teacher-name': ['Anna', 'Natanaelsson'],
        'picture-url': false
      },
      {
        'subject': 'Swedish',
        'teacher-name': ['Åse', 'Ståhlberg'],
        'picture-url': false
      }
    ]
  },
  'Computer Science': {
    'content-type': 'subject',
    'upcomming': 'There is nothing upcomming in this subject',
    'teacher': 0
  },
  'Web Development': {
    'content-type': 'subject',
    'upcomming': 'Presentation about our school website (Monday/Tuseday)',
    'teacher': 1
  },
  'Mechatronics': {
    'content-type': 'subject',
    'upcomming': 'Final Exam (Friday)',
    'teacher': 2
  },
  'Electromechanics': {
    'content-type': 'subject',
    'upcomming': 'There is nothing upcomming in this subject',
    'teacher': 3
  },
  'English': {
    'content-type': 'subject',
    'upcomming': 'Presentation about a topic of our choice (Wednesday/Friday)',
    'teacher': 4
  },
  'Math': {
    'content-type': 'subject',
    'upcomming': 'There is nothing upcomming in this subject',
    'teacher': 5
  },
  'Swedish': {
    'content-type': 'subject',
    'upcomming': 'There is nothing upcomming in this subject',
    'teacher': 6
  }
}

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
    get_schedule(true);
  }
};

function change_content(obj) {
  var name = $(obj).text();
  $('#main-content').empty();
  $('.main-content-header').text(name);

  if(content[name]['content-type'] == 'text') {
    var page_content = $('<div>', {text: content[name]['content'], class: 'text'});
    $('#main-content').append(page_content);
  }

  else if(content[name]['content-type'] == 'name-list') {
    var page_content = $('<ul>', {class: 'name-list'});
    for (var i = 0; i < content[name]['content'].length; i++) {
      var first = $('<span>', {class: 'first', 'text': content[name]['content'][i][0] + ' '});
      var last = $('<span>', {class: 'last', 'text': content[name]['content'][i][1]});
      var list_element = $('<li>', {class: 'name'});
      list_element.append(first);
      list_element.append(last);
      page_content.append(list_element);
      $('#main-content').append(page_content);
    }
  }

  else if (content[name]['content-type'] == 'contact-list') {
    var list_root = $('<ul>', {class: 'contact-list' });
    for (var i = 0; i < content[name]['content'].length; i++) {
      var entry_root = $('<ul>', {class: 'contact-entry' });
      var name_entry = $('<li>', {class: 'name' });
      var first = $('<span>', {class: 'first', 'text': content[name]['content'][i]['teacher-name'][0] + ' ' });
      var last = $('<span>', {class: 'last', 'text': content[name]['content'][i]['teacher-name'][1] });
      name_entry.append(first);
      name_entry.append(last);

      var subject = $('<li>', {class: 'subject', text: content[name]['content'][i]['subject']});

      image_root = $('<li>', {class: 'teacher-image'});
      if(content[name]['content'][i]['picture-url']) {
        var image_element = $('<img>', {src:content[name]['content'][i]['picture-url'], class: 'teacher-image'});
      }
      else {
        var image_element = $('<img>', { src:'http://www.shawnee.edu/_resources/images/profile-placeholder.png', class: 'teacher-image'});
      }
      image_root.append(image_element);
      entry_root.append(image_root);
      entry_root.append(name_entry);
      entry_root.append($('<br/>'));
      entry_root.append($('<br/>'));
      entry_root.append(subject);
      entry_root.append($('<br/>'));
      list_root.append(entry_root);
    }
    $('#main-content').append(list_root);
  }
  else if (content[name]['content-type'] == 'subject') {
    var entry = content[name];
    var teacher = content['Teachers']['content'][entry['teacher']];
    var teacher_name = teacher['teacher-name'];
    var first = $('<span>', {class: 'first', text: teacher_name[0] + ' ' });
    var last = $('<span>', {class: 'last', text: teacher_name[1]});
    var upcomming = entry['upcomming'];
    var image = teacher['picture-url'];
    if(!image) {
      var image_url = 'http://www.shawnee.edu/_resources/images/profile-placeholder.png';
    }
    else {
      var image_url = image;
    }
    var teacher_root = $('<div>', {class: 'righty'});
    var upcomming_root = $('<div>', {class: 'text', text: upcomming});
    var teacher_image = $('<img>', {src: image_url, class: 'teacher-image'});
    var teacher_name_root = $('<div>');
    var first = $('<span>', {class: 'first', text: teacher_name[0] + ' ' });
    var last = $('<span>', {class: 'last', text: teacher_name[1]});
    teacher_name_root.append(first);
    teacher_name_root.append(last);
    teacher_root.append(teacher_name_root);
    teacher_root.append(teacher_image);
    var root = $('#main-content');
    root.append(teacher_root);
    root.append(upcomming_root);
  }
}

function main() {
  $('.grid').hide();
  $('.navigation-item').each(
    function() {
      $(this).attr('onclick', 'change_content(this);');
    }
  )
  if (document.cookie !== "") {
    initialize(true);
  }
}

function get_schedule() {
  var time_array = time();
  var w = Math.round($('.schedule').width());
  var h = Math.round($('.schedule').height());
  var id = $('#class-id').val();
  var url = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=58700/sv-se&type=-1&id=' + id + '&period=&week=' + time_array[0] + '&mode=0&printer=0&colors=32&head=1&clock=1&foot=1&day=' + time_array[1] + '&width=' + w + '&height=' + h + '&maxwidth=' + w + '&maxheight=' + h + '';
  $('#schedule-image').attr('src', url);
}

function initialize(cookie_exists) {
  if(cookie_exists) {
    var id = document.cookie.split('=')[1];
    $('.id').hide();
  }
  else {
    var id = $('#class-id').val();
    document.cookie = 'classid=' + id;
  }
  if(id !== '') {
    $('.grid').show();
    $('.id').slideUp();
    document.cookie = 'classid=' + id;
    get_schedule();
  }
  else {
    alert('The ID You entered is not in our database, please select another ID');
  }
}

function hide_navigation() {
  if($('#sidebar').is(":visible")) {
    $('#sidebar').slideUp('900');
    $('#hide-nav').addClass('hide');
    $('#hide-nav').removeClass('show');;
  }
  else {
    $('#sidebar').slideDown('900');
    $('#hide-nav').removeClass('hide');
    $('#hide-nav').addClass('show');
  }
}
