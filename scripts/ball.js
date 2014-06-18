Parse.initialize("SKfw8dxK0Mb7xIPUw8oT4UIwISEMXrVYlVyN9oAZ", "1dKtJ5ywMf1l6O0Jl6X2SLetVtfFFhj1iPvYUWnl");
$(document).ready(function(){
	var currentUser = Parse.User.current();
	var Message = Parse.Object.extend("Message");
    
	if(currentUser){
		

		$('#logout').click(function(){
			
			Parse.User.logOut();
			window.location.assign("login.html");
		})
		$('#account_submit').click(function(){
			currentUser.set("description", document.fm4.teamInfo.value);
			currentUser.set("capitalName", document.fm4.nameCap1.value);
			currentUser.set("capitalPhone", document.fm4.phoneCap1.value);
			currentUser.set("capitalPhone", document.fm4.mailCap1.value);
			
			currentUser.set("capitalName2", document.fm4.nameCap2.value);
			currentUser.set("capitalPhone2", document.fm4.phoneCap2.value);
			currentUser.set("capitalPhone2", document.fm4.mailCap2.value);

			var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
	      	var file = new Parse.File("myfile.zzz",{ base64: base64 },"image/png");

	      	var fileUploadControl = $("#imageload")[0];
	      	if (fileUploadControl.files.length > 0) {
	        var file = fileUploadControl.files[0];
	        var name = "photo.jpg";
	        var parseFile = new Parse.File(name, file);

	        parseFile.save().then(function() {
	            // The file has been saved to Parse.
	          

			
	              //jobApplication.set("applicantName", "Joe Smith");
	          currentUser.set("image", parseFile);
	          
	          currentUser.save();

	          }, function(error) {
	            alert();
	            // The file either could not be read, or could not be saved to Parse.
	        });

	        }
          
			
			currentUser.save(null,{
				success: function(){
					alert("成功修改囉！");
				},
				error: function(){
					//alert("no");
				}
			});
		});
		/*$('#team_photo').click(function(){
			var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
	      	var file = new Parse.File("myfile.zzz",{ base64: base64 },"image/png");

	      	var fileUploadControl = $("#imageload")[0];
	      	if (fileUploadControl.files.length > 0) {
		        var file = fileUploadControl.files[0];
		        var name = "photo.jpg";
		        var parseFile = new Parse.File(name, file);
		        parseFile.save();
		        currentUser.set("image", parseFile);
		        currentUser.save(null,{
		        	success: function(){
		        		alert('s');
		        	},
		        	error: function(){
		        		alert('f');
		        	}
		        });

		        parseFile.save().then(function() {
		           // The file has been saved to Parse.
		          
		          var profilePhoto = parseFile.url();
		          $("#showing")[0].src = profilePhoto;
		          
		          
		          
		          
		          }, function(error) {
		            alert();
		            // The file either could not be read, or could not be saved to Parse.
		        });

       		 }

		});*/

		$('#msgsend').click(function(){
			var msg= new Message();
			var Court = Parse.Object.extend("Court");
        	var myCourt = new Court();
			msg.set("message", document.msgfm.leavemsg.value);
			msg.set("user", currentUser);
		});

		

		
      
	      
          
          
     	 
		
	}else{
		//window.location.assign("login.html");
		$('#submit').click(function(){
			Parse.User.logIn( $("input[name='acc']").val(), $("input[name='pass']").val(), {
				success: function(user) {
	  				setTimeout(function(){
	  			  		window.location.assign("index.html");

	  			  	},500);
			    	// Do stuff after successful login.
		  		},
		  			error: function(user, error) {
		    	// The login failed. Check error to see why.
		        	alert(error);
		  		}
			})
		});

		
		
	}
	$('.fa-comment-o').click(function(){
		window.location.assign("leavemsg.html");
	});


});
