Parse.initialize("SKfw8dxK0Mb7xIPUw8oT4UIwISEMXrVYlVyN9oAZ", "1dKtJ5ywMf1l6O0Jl6X2SLetVtfFFhj1iPvYUWnl");
var currentUser = Parse.User.current();
var User = Parse.Object.extend("User");
var query = new Parse.Query(User);


$(document).ready(function(){


if(currentUser){
  var time=[];
  var Court = Parse.Object.extend("Court");
  var query1 = new Parse.Query(Court);
  query1.notEqualTo("name", "ss");
  query1.find({
    success: function(result){
      var num= result.length;
      

      for(var i=0; i< num; i++){
        var tk= result[i].get("time");
        var str = "<div class='time-table-div' id='i"+tk+"'>"+result[i].get("name")+"</div>";//抓到使用者資料做成html元素
        
        var isChecked=result[i].get('checked');

        $('#icon'+tk).append(str);//丟進表格


      }

    },
    error: function(){

    }
  });
  var query2 = new Parse.Query(Court);
  query2.equalTo('checked',true );
  query2.find({
    success: function(result){
      var num= result.length;
      

      for(var i=0; i< num; i++){
        var ch=result[i].get('time');
        var chid="#"+ch;
        console.log(chid);
        $(chid).prop('checked', true);
    

      }
    },
    error: function(){

    }
  })

  query.get(currentUser.id, {
  success: function(result) {
      // The object was retrieved successfully.
    var id = result.get('major');
    $('.i').click( function (){// 勾選觸發事件

    var k = $(this).attr('id'); //記錄勾選的是哪一格

     //表格打勾了

    if($(this).prop('checked')){

       // var Court = Parse.Object.extend("Court");
       // var query = new Parse.Query(Court);
       // var n = 0;
    
       // query.equalTo("name","資科");//找到DB場地資料中，XX系選的時間筆數



      var r =confirm("確認:這時間我要了!, 取消:我按好玩的XD");
    
      //確認的情況
      if(r){
      
        var Court = Parse.Object.extend("Court");
        var myCourt = new Court();

        // myCourt.set("name",Parse.User.current().get("name"));  //設定登記的系隊名稱
        myCourt.set("name",id);  //設定登記的系隊名稱
        myCourt.set("time",k);//設定登記時段
        myCourt.set("checked",true);
        myCourt.save();

                        
        var str = "<div id='i"+k+"'>"+myCourt.get("name")+"</div>";//抓到使用者資料做成html元素

        $('.icon'+k).append(str);//丟進表格
        //location.reload();
      }
      else{
      //按錯了，取消checked
      this.checked = false;
      }
    
     //打勾被取消了，要把空格清空
    }else{
    
      var r =confirm("確認:我要取消!, 取消:我按錯了><");
    
    //確認的情況
      if(r){

        var Court = Parse.Object.extend("Court");
        var query = new Parse.Query(Court);
    
        query.equalTo("time",k);//找到DB場地資料中，X-X這一格
        query.find({

          success: function(obj){
          
            obj[0].destroy();//刪除該筆登記資料
         
            $("#i"+k).remove();//清空該格，這邊
          },
          error: function(){alert("DB ERROR!");}

        });     
      }
      else{
      //按錯了，維持checked
        this.checked = true;
      }
    }//44444444
  });
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
});
 
  

}else{

}
  
})

// 我的code哪裡醜了妳說!!!