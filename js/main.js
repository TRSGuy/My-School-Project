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
        'picture-url': 'https://schoolsoftelev.nacka.se/nacka/jsp/student/pictureFile.jsp?teacherId=2037&1495482396870'
      },
      {
        'subject': 'Web Development',
        'teacher-name': ['Garabed', 'Hakopian'],
        'picture-url': 'https://schoolsoftelev.nacka.se/nacka/jsp/student/pictureFile.jsp?teacherId=2047&1495482396870'
      },
      {
        'subject': 'Mechatronics',
        'teacher-name': ['Shirin', 'Nasirpour'],
        'picture-url':'https://schoolsoftelev.nacka.se/nacka/jsp/student/pictureFile.jsp?teacherId=4343&1495482396870'
      },
      {
        'subject': 'Electromechanics',
        'teacher-name': ['Kjell', 'Nyberg'],
        'picture-url': false // All false should be replaced with http://www.shawnee.edu/_resources/images/profile-placeholder.png
      },
      {
        'subject': 'English',
        'teacher-name': ['Catharina', 'Winbäck'],
        'picture-url': 'https://schoolsoftelev.nacka.se/nacka/jsp/student/pictureFile.jsp?teacherId=2081&1495482396870'
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
  }
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
    get_schedule(true);
  }
};

function change_content(obj) {
  var name = obj.innerHTML;
  console.log(content)
  $('#main-content').empty();
  $('.main-content-header').text(name);

  if(content[name]['content-type'] == 'text') {
    page_content = $('<div>', {text: content[name]['content']})
    $('#main-content').append(page_content);
  }

  else if(content[name]['content-type'] == 'name-list') {
    page_content = $('<ul>', {class: 'name-list'});
    for (var i = 0; i < content[name]['content'].length; i++) {
      first = $('<span>', {class: 'first', 'text': content[name]['content'][i][0] + ' '});
      last = $('<span>', {class: 'last', 'text': content[name]['content'][i][1]});
      list_element = $('<li>', {class: 'name'});
      list_element.append(first);
      list_element.append(last);
      page_content.append(list_element);
      $('#main-content').append(page_content);
    }
  }

  else if (content[name]['content-type'] == 'contact-list') {
    list_root = $('<ul>', {class: 'contact-list' });
    for (var i = 0; i < content[name]['content'].length; i++) {
      entry_root = $('<ul>', {class: 'contact-entry' });
      name_entry = $('<li>', {class: 'name' });
      first = $('<span>', {class: 'first', 'text': content[name]['content'][i]['teacher-name'][0] + ' ' });
      last = $('<span>', {class: 'last', 'text': content[name]['content'][i]['teacher-name'][1] });
      name_entry.append(first);
      name_entry.append(last);
      entry_root.append(name_entry);
      subject = $('<li>', {class: 'subject', text: content[name]['content'][i]['subject'] });
      entry_root.append(subject);
      image_root = $('<li>', {class: 'teacher-image' });
      if(content[name]['content'][i]['picture-url']) {
        image_element = $('<img>', {src:content[name]['content'][i]['picture-url']})
      }
      else {
        image_element = $('<img>', { src:'http://www.shawnee.edu/_resources/images/profile-placeholder.png' });
      }
      image_root.append(image_element);
      entry_root.append(image_root);
      list_root.append(entry_root);
    }
    $('#main-content').append(list_root);
  }
}

function main() {
  $('.navigation-item').each(
    function() {
      $(this).attr('onclick', 'change_content(this);')
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
  console.log(url)
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
  // TODO: ADD AN ELSE STATEMENT TO PROMPT THE USER ABOUT THE ID BEING INVALID
}
