function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function myFunction() {
  var data = getMultipleRowsData()
  var sheet = SpreadsheetApp.create("test1").getActiveSheet()
  sheet.getRange(1,1,1, 5).setValues([["id","data","подпись","картинка", "подпись поста"]])
  sheet.getRange(2,1,data.length, data[0].length).setValues(data)
}

function getMultipleRowsData() {
 var data = [];

 var requestOptions = {
  method: 'POST',
  redirect: 'follow'
  };
  var response = UrlFetchApp.fetch("https://api.vk.com/method/wall.get?access_token=%token%&owner_id=-22142529&domain=chitaigorod&offset=0&count=20&v=5.131",requestOptions);
  var json = response.getContentText();
  var data1 = JSON.parse(json);
  var posts = data1.response.items;
  var cell = 0
  for (let i = 0; i < 20; i++) {
    var attachments = posts[i].attachments
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type == "photo") {
        photo_url = attachments[i].photo.sizes[3].url
        date = timeConverter(posts[i].date)
        let image  = SpreadsheetApp.newCellImage().setSourceUrl(photo_url).build();
        data.push([cell,date , attachments[i].photo.text, image, posts[i].text]);
        cell = cell + 1
      }
    }
  }
 return data;
}
