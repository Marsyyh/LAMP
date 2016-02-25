//var testData=[{
//	"statement": "Which one of the following is a search engine?",
//	"options": {
//		"A": "Google",
//		"B": "Woogle",
//        "C": "Dogpile",
//        "D": "None of the above"
//	},
//    "correct answer" : "A C",
//    "id" : "1"
//	}
//];
function readData() {
	$.ajax({
		type:"POST",
		url:"rcs/testing.php",
		dataType:"json",
		success:function(result){
			showTestContent(result);
		}
	});
}
function onloadFunc(){
	readData();
}
function showTestContent(testData) {
	var $cbForm = $("<form>",{action:"rcs/score.php",method:"post"}).appendTo($(".testContent"));
	for(var i=0; i<testData.length;i++){
		var idT = "question"+i;
		var $question = $("<div>",{id:idT,class:"questionClass"}).appendTo($cbForm);
		var $qState = $("<p>",{class:"qState"}).appendTo($question);
		var iCount = i + 1;
		$qState.html(iCount + ". "  +testData[i].statement);
		var obj = testData[i].options;
		var inputs = 0;
		for (var keys in obj){
			var $cbDiv = $("<div>",{class:"checkbox"}).appendTo($question);
			var $cbLable = $("<label>",{class:"c-input c-checkbox"}).appendTo($cbDiv);
			$("<input />",{type:"checkbox",name:i+keys}).appendTo($cbLable);
			$cbLable.append(keys+". "+obj[keys]);
		   	inputs++;	
		}
	}
	$("<input />",{type:"submit",style:"text-align:center;"}).appendTo($cbForm);
}

