
Parse.initialize("SKfw8dxK0Mb7xIPUw8oT4UIwISEMXrVYlVyN9oAZ","1dKtJ5ywMf1l6O0Jl6X2SLetVtfFFhj1iPvYUWnl");

$(document).ready(function() {
  				$("a.fancyimage").fancybox({
  				'overlayShow'	: false,
  				'transitionIn'	: 'elastic',
  				'transitionOut'	: 'elastic'	
        });

          $(".fa-comment-o").click(function(){
            var Ta = Parse.Object.extend(talk); //資料表talk
            var query = new Parse.Query(Ta);  //query
            var i = 0;
            var template='<h1>留言板</h1>'+'<div style="margin:10px auto">'+'<h6>我想要協調</h6>'+'<input class="left" type="text" style="width:600px"> <input id="go" type="submit"  value="送出"> </div>'+'<div class="border3" style="margin:10px auto"></div>';            
            
            var message='<div><img src="jagar.jpg" width="90px" height="90px" class="left"></img><div></div>';//這裡的message少一個</div>
            
            query.equalTo("欄位",'2-1');  //對欄位做filter
            query.find({            
                success: function(list) {
                  // Do something with the returned Parse.Object values
                  while(list[i]!= null ){
                    var object = list[i];                   
                    var temp =  '<div><h6>'+object.get('Name');+'</h6><p>'+object.get('content')+'</p></div>'; //將要顯示的內容逐一加入message中
                    message += temp; 
                    i++;
                  }
                },
            });
            message+='</div>';  //將message包起來

            $.colorbox({
              	html :template+message , //在燈箱中要顯示的html字段
              	width : 700, 	//燈箱中間區塊的寬度
               					//燈箱中間區塊的高度
              	$('#go').click(function(){
            		var talk = Parse.Object.extend("talk");//開一個資料表叫做talk
            		var NEW = new talk();
            		var currentUser = Parse.User.current().get("Name");//找出現在的使用者ID            
            		NEW.set("UserName",currentUser);//將目前的使用者ID放入資料表talk中
            		NEW.set("content",$("input[class='left']").val());//將目前使用者在template輸入至input的值傳入資料庫中content的欄位中
            		NEW.save();            					
            	});
             });
        });       
    });
