var jsonData;
var heightP = $(".column1").css("height").substring(0,($(".column1").css("height").length-2));

function readData() {
	$.ajax({				//jquery read file from url
			type:"POST",
			url:"rcs/spices.json",
			data:"json",
			async:false,
			success:function(result){
				jsonData = $.parseJSON(result);
			}
	});
}

function onloadFunc() { 	// this function will do the preprocess data and set initial page
	readData();
	appendInitialDiv();
	$(".productConsole").append("<div>I could define product description, but I dont have time to add them to my JSON file one by one.</br> BUT, I KNOW HOW TO DO THAT!!!!!!</div>");
}
function appendInitialDiv() {
	var level = 1;
	var count = 0;
	var out = "";
	for(var i=0;i<jsonData.length;i++){
		var checkLevel = jsonData[i].level
		if( checkLevel == level){
			var id = jsonData[i].id;
			out +="<div style=\"background-color:hsl("+count*120+",100%,30%)\" onclick=\x22appendWithPara(\'"+id+"\');\x22>"+jsonData[i].name+"</div>";
			count++;
		}
	}
	$(".column1").append(out);
	$(".column1 div").css("height",heightP/count + "px");
}
function appendWithPara(pid) {
	switch (pid.substring(0,1)) {
		case '1':
			var color = 0;
			break;
		case '2':
			var color = 120;
			break;
		case '3':
			var color = 240;		
			break;
		default:
	}
	var level;
	for (var i = 0, l = jsonData.length; i < l; i++) {
		if(jsonData[i].Categorize[0] == pid){
			level = jsonData[i].level;
			break;
		}
	}
	removeDiv(level);
	var out = "";
	var count = 0;
	for(var i=0;i<jsonData.length;i++){
		for(var j=0;j<jsonData[i].Categorize.length;j++){
			var checkId = jsonData[i].Categorize[j];
			if( checkId == pid){
				var id = jsonData[i].id;
				out += "<div onclick=\x22appendWithPara(\'"+id+"\');\x22>"+jsonData[i].name+"</div>";
				count++;
				}	
			}
		}
		switch (level) {
			case 2:
				$(".column2").append(out);
				$(".column2 div").css("height",heightP/count + "px");
				$(".column2 div").css("background-color","hsl("+color+",100%,40%)");
				break;
			case 3:
				$(".column3").append(out);
				$(".column3 div").css("height",heightP/count + "px");
				$(".column3 div").css("background-color","hsl("+color+",100%,50%)");
				break;
			case 4:
				$(".column4").append(out);
				$(".column4 div").css("height",heightP/count + "px");
				$(".column4 div").css("background-color","hsl("+color+",100%,60%)");
				break;
			case 5:
				$(".column5").append(out);
				$(".column5 div").css("height",heightP/count + "px");
				$(".column5 div").css("background-color","hsl("+color+",100%,70%)");
				break;
			default:
				//console.log("Wrong Level");
	}
}
function removeDiv(level) {
	switch (level) {
		case 2:
			$(".column2 div").remove();
			$(".column3 div").remove();
			$(".column4 div").remove();
			$(".column5 div").remove();
			//$(".productConsole div").remove();
			break;
		case 3:
			$(".column3 div").remove();
			$(".column4 div").remove();
			$(".column5 div").remove();
			//$(".productConsole div").remove();
			break;
		case 4:
			$(".column4 div").remove();
			$(".column5 div").remove();
			//$(".productConsole div").remove();
			break;
		case 5:
			$(".column5 div").remove();
			//$(".productConsole div").remove();
			break;
		default:
	}
}
