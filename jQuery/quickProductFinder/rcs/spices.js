var jsonData;
var heightP = $(".column1").css("height")
//this function is using for convert certern data format to data format
function convert (data) {
	if (data) {
		//
		var subStrArr = data.split(/\n/);				//split by line
		var strArr = new Object; 						//this array hold the result
		var subSubStr = subStrArr[0].split(' ');
		var attr1 = subSubStr[0];
		var newArrCheck;
		var tmpHandler = [];
		for (var i = 0; i < subStrArr.length; i++) {	//every line will convert to a key:value pair
			subSubStr = subStrArr[i].split(' ');
			if(subSubStr[0].split('.').length < 2){		//adding key to non key pair
				if (newArrCheck != attr1 && newArrCheck !=""){
					newArrCheck = attr1;
					var tmpHandler = [];
				}
				var tmpSmallH = [];
				for(var j = 0; j < subSubStr.length; j++)
					tmpSmallH += " " + subSubStr[j];
				if(tmpSmallH!=""){
					tmpHandler += "<p>" + tmpSmallH.substr(2,tmpSmallH.length) + "</p>";
				}
				continue;
			}else if(subSubStr[0].split('.').length >= 2)//if(tA[tA.length - 1]!="x")
			{
				attr1 = subSubStr[0];
				if (newArrCheck != attr1 && newArrCheck !=""){
					if(tmpHandler!="")
						strArr[newArrCheck] = tmpHandler;
				}
				var attr2 = [];
				for(var j = 1; j < subSubStr.length; j++)
					attr2 += " " + subSubStr[j];
				if(attr2!=""){
					var attr3 = attr2.substr(1,attr2.length);
					strArr[attr1] = attr3;
				}
			}
		}
		return strArr;
	};
}

//this function is using for parse json data with parameter
function jparse (data,para) {
	var keys = Object.keys(data);
	var fkeys = [];
	var j = 0;
	for(i=0;i<keys.length;i++){
		//console.log(keys[i].length);
		var tmpkey = keys[i].split('.');
		// console.log(para.length);
		// console.log(tmpkey.length);
		if (para.length == 1 && tmpkey.length == 2){
			if(tmpkey[0]==para && tmpkey[1]!="")
				fkeys[j++] = keys[i];
		}
		if (para.length == 3 && tmpkey.length == 3){
			var tmpPara = para.split(".");
			if(tmpkey[0]==tmpPara[0] && tmpkey[1]==tmpPara[1] && tmpkey[2]!="")
				fkeys[j++] = keys[i];
		}
		if (para.length == 5 && tmpkey.length == 4){
			var tmpPara = para.split(".");
			if(tmpkey[0]==tmpPara[0] && tmpkey[1]==tmpPara[1] && tmpkey[2]==tmpPara[2] && tmpkey[3]!="")
				fkeys[j++] = keys[i];
		}
		if (para.length == 7 && tmpkey.length == 5){
			var tmpPara = para.split(".");
			if(tmpkey[0]==tmpPara[0] && tmpkey[1]==tmpPara[1] && tmpkey[2]==tmpPara[2] && tmpkey[3]==tmpPara[3] && tmpkey[4]!="")
				fkeys[j++] = keys[i];
		}
	};
	return fkeys;
}
//this function execute when empty good shown
function endOfGoods (para) {
	console.log(para);
	var count = para.length;
	console.log(count);
	if(count==3){
		$(".column3 div").remove();
		$(".column4 div").remove();
		$(".column5 div").remove();
		$(".productConsole").html("<p>Description:</p><p>########################################</p><p>########################################</p>");
	}
	if(count==5){
		$(".column4 div").remove();
		$(".column5 div").remove();
		$(".productConsole").html("<p>Description:</p><p>########################################</p><p>########################################</p>");
	}
	if(count==6){
		$(".column4 div").remove();
		$(".column5 div").remove();
		$(".productConsole").html("<p>Description:</p><p>########################################</p><p>########################################</p>");
	}
	if(count==7){
		$(".column5 div").remove();
		$(".productConsole").html("<p>Description:</p><p>########################################</p><p>########################################</p>");
	}
	if(count==9){
		$(".productConsole").html("<p>Description:</p><p>########################################</p><p>########################################</p>");
	}
}

//this function create and display value with keys and para
function controllerToggle (para) {
	var tmpPara = para.split(".");
	if(tmpPara[0]==1){
		$(".productConsole p").remove();
		$(".column2 div").remove();
		$(".column3 div").remove();
		$(".column4 div").remove();
		$(".column5 div").remove();
		var keys = jparse(jsonData,"1");
		var keysP = jparse(jsonData,para);
		var count = keysP.length;
		var myClass = "class" + para;
		for(var i=0;i<count;i++){
			myClass += i.toString();
			$(".column2").append($("<div>Hello</div>").addClass(myClass));
			myClass = "." + myClass;
			$(myClass).html(jsonData[keysP[i]]);
			// create hidden element to hold value
			$(myClass).append("<span>"+i+"</span>");
			$(myClass + " span").hide();
			// create height
			var tmpHeightString = heightP.substr(0,heightP.length-2);
			realHeight = (Number(tmpHeightString))/count + "px";
			$(myClass).css("height",realHeight);
			//--------------
			//create color
			$(myClass).css("background-color","rgb(165,0,0)");
			//create subslide
			$(myClass).click(function(){ // this is second layer
				$(".productConsole p").remove();
				$(".column3 div").remove();
				$(".column4 div").remove();
				$(".column5 div").remove();
				console.log($(this).text());
				var tmpI = Number($(this).text()[$(this).text().length -1]);
				console.log(tmpI);
				var keysP1 = jparse(jsonData,keysP[tmpI]);
				if(keysP1==""){
					//console.log(keysP);
					endOfGoods(keysP[tmpI]);
				}
					// console.log(keysP1);
					var count1 = keysP1.length;
					var myClass1 = myClass + tmpI;
					for(var i1=0;i1<count1;i1++){
						myClass1 += i1.toString();
						$(".column3").append($("<div>Hello</div>").addClass(myClass1));
						myClass1 = "." + myClass1;
						$(myClass1).html(jsonData[keysP1[i1]]);
						// create width of the elements and overflow
						$(myClass1).css("width","206px");
						$(myClass1).css("overflow","scroll");
						// create hidden element to hold value
						$(myClass1).append("<span>"+i1+"</span>");
						$(myClass1 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count1 + "px";
						$(myClass1).css("height",realHeight);
						//--------------
						//create color
						$(myClass1).css("background-color","rgb(195,0,0)");

						//create subslide
						$(myClass1).click(function(){
							$(".productConsole p").remove();
							$(".column4 div").remove();
							$(".column5 div").remove();
							var tmpI = Number($(this).text()[$(this).text().length -1]);
							console.log(tmpI);
							var keysP2 = jparse(jsonData,keysP1[tmpI]);
							if(keysP2==""){
								console.log(keysP1);
								endOfGoods(keysP1[tmpI]);
							}
							var count2 = keysP2.length;
							var myClass2 = myClass1 + tmpI;
							for(var i2=0;i2<count2;i2++){
								myClass2 += i2.toString();
								$(".column4").append($("<div>Hello</div>").addClass(myClass2));
								myClass2 = "." + myClass2;
								$(myClass2).html(jsonData[keysP2[i2]]);
						// create hidden element to hold value
						$(myClass2).append("<span>"+i2+"</span>");
						$(myClass2 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count2 + "px";
						$(myClass2).css("height",realHeight);
						//--------------
						//create color
						$(myClass2).css("background-color","rgb(225,0,0)");

						//create subslide
						$(myClass2).click(function(){
							$(".productConsole p").remove();
							$(".column5 div").remove();
							var tmpI = Number($(this).text()[$(this).text().length -1]);
							console.log(tmpI);
							var keysP3 = jparse(jsonData,keysP2[tmpI]);
							if(keysP3==""){
								console.log(keysP2);
								endOfGoods(keysP2[tmpI]);
							}
							var count3 = keysP3.length;
							var myClass3 = myClass2 + tmpI;
							for(var i3=0;i3<count3;i3++){
								myClass3 += i3.toString();
								$(".column5").append($("<div>Hello</div>").addClass(myClass3));
								myClass3 = "." + myClass3;
								$(myClass3).html(jsonData[keysP3[i3]]);
						// create hidden element to hold value
						$(myClass3).append("<span>"+i3+"</span>");
						$(myClass3 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count3 + "px";
						$(myClass3).css("height",realHeight);
						//--------------
						//create color
						$(myClass3).css("background-color","rgb(255,0,0)");
						$(myClass3).click(function(){
							$(".productConsole p").remove();
							var tmpI = Number($(this).text()[$(this).text().length -1]);
							console.log(tmpI);
							var keysP4 = jparse(jsonData,keysP3[tmpI]);
							if(keysP4==""){
								console.log(keysP3);
								endOfGoods(keysP3[tmpI]);
							}
						});
						myClass3 = myClass3.substr(1,myClass3.length-2);
					}
				});
myClass2 = myClass2.substr(1,myClass2.length-2);
}

});
myClass1 = myClass1.substr(1,myClass1.length-2);
}

});
				//---secend slide end here
				myClass = myClass.substr(1,myClass.length-2);

			}
		}
		if(tmpPara[0]==2){
			$(".productConsole p").remove();
			$(".column2 div").remove();
			$(".column3 div").remove();
			$(".column4 div").remove();
			$(".column5 div").remove();
			var keys = jparse(jsonData,"1");
			var keysP = jparse(jsonData,para);
			var count = keysP.length;
			var myClass = "class" + para;
			for(var i=0;i<count;i++){
				myClass += i.toString();
				$(".column2").append($("<div>Hello</div>").addClass(myClass));
				myClass = "." + myClass;
				$(myClass).html(jsonData[keysP[i]]);
			// create hidden element to hold value
			$(myClass).append("<span>"+i+"</span>");
			$(myClass + " span").hide();
			// create height
			var tmpHeightString = heightP.substr(0,heightP.length-2);
			realHeight = (Number(tmpHeightString))/count + "px";
			$(myClass).css("height",realHeight);
			//--------------
			//create color
			$(myClass).css("background-color","rgb(0,165,0)");

			//create subslide
			$(myClass).click(function(){ // this is second layer
				$(".productConsole p").remove();
				$(".column3 div").remove();
				$(".column4 div").remove();
				$(".column5 div").remove();
				var tmpI = Number($(this).text()[$(this).text().length -1]);
				console.log(tmpI);
				var keysP1 = jparse(jsonData,keysP[tmpI]);
				if(keysP1==""){
					console.log(keysP);
					endOfGoods(keysP[tmpI]);
				}
					// console.log(keysP1);
					var count1 = keysP1.length;
					var myClass1 = myClass + tmpI;
					for(var i1=0;i1<count1;i1++){
						myClass1 += i1.toString();
						$(".column3").append($("<div>Hello</div>").addClass(myClass1));
						myClass1 = "." + myClass1;
						$(myClass1).html(jsonData[keysP1[i1]]);
						// create hidden element to hold value
						$(myClass1).append("<span>"+i1+"</span>");
						$(myClass1 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count1 + "px";
						$(myClass1).css("height",realHeight);
						//--------------
						//create color
						$(myClass1).css("background-color","rgb(0,195,0)");

						//create subsubslide
						$(myClass1).click(function(){
							$(".productConsole p").remove();
							$(".column4 div").remove();
							$(".column5 div").remove();
							var tmpI = Number($(this).text()[$(this).text().length -1]);
							console.log(tmpI);
							var keysP2 = jparse(jsonData,keysP1[tmpI]);
							if(keysP2==""){
								console.log(keysP1);
								endOfGoods(keysP1[tmpI]);
							}
							var count2 = keysP2.length;
							var myClass2 = myClass1 + tmpI;
							for(var i2=0;i2<count2;i2++){
								myClass2 += i2.toString();
								$(".column4").append($("<div>Hello</div>").addClass(myClass2));
								myClass2 = "." + myClass2;
								$(myClass2).html(jsonData[keysP2[i2]]);
						// create hidden element to hold value
						$(myClass2).append("<span>"+i2+"</span>");
						$(myClass2 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count2 + "px";
						$(myClass2).css("height",realHeight);
						//--------------
						//create color
						$(myClass2).css("background-color","rgb(0,225,0)");

						//create subslide
						$(myClass2).click(function(){
							$(".productConsole p").remove();
							$(".column5 div").remove();
							var tmpI = Number($(this).text()[$(this).text().length -1]);
							console.log(tmpI);
							var keysP3 = jparse(jsonData,keysP2[tmpI]);
							if(keysP3==""){
								console.log(keysP2);
								endOfGoods(keysP2[tmpI]);
							}
							var count3 = keysP3.length;
							var myClass3 = myClass2 + tmpI;
							for(var i3=0;i3<count3;i3++){
								myClass3 += i3.toString();
								$(".column5").append($("<div>Hello</div>").addClass(myClass3));
								myClass3 = "." + myClass3;
								$(myClass3).html(jsonData[keysP3[i3]]);
						// create hidden element to hold value
						$(myClass3).append("<span>"+i3+"</span>");
						$(myClass3 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count3 + "px";
						$(myClass3).css("height",realHeight);
						//--------------
						//create color
						$(myClass3).css("background-color","rgb(0,255,0)");

						
						myClass3 = myClass3.substr(1,myClass3.length-2);
					}
				});
myClass2 = myClass2.substr(1,myClass2.length-2);
}

});
myClass1 = myClass1.substr(1,myClass1.length-2);
}

});
				//---secend slide end here
				myClass = myClass.substr(1,myClass.length-2);

			}
		}
		if(tmpPara[0]==3){
			$(".productConsole p").remove();
			$(".column2 div").remove();
			$(".column3 div").remove();
			$(".column4 div").remove();
			$(".column5 div").remove();
			var keys = jparse(jsonData,"1");
			var keysP = jparse(jsonData,para);
			var count = keysP.length;
			var myClass = "class" + para;
			for(var i=0;i<count;i++){
				myClass += i.toString();
				$(".column2").append($("<div>Hello</div>").addClass(myClass));
				myClass = "." + myClass;
				$(myClass).html(jsonData[keysP[i]]);
			// create hidden element to hold value
			$(myClass).append("<span>"+i+"</span>");
			$(myClass + " span").hide();
			// create height
			var tmpHeightString = heightP.substr(0,heightP.length-2);
			realHeight = (Number(tmpHeightString))/count + "px";
			$(myClass).css("height",realHeight);
			//--------------
			//create color
			$(myClass).css("background-color","rgb(0,0,165)");
			//create subslide
			$(myClass).click(function(){ // this is second layer
				$(".productConsole p").remove();
				$(".column3 div").remove();
				$(".column4 div").remove();
				$(".column5 div").remove();
				var tmpI = Number($(this).text()[$(this).text().length -1]);
				console.log(tmpI);
				var keysP1 = jparse(jsonData,keysP[tmpI]);
				if(keysP1==""){
					console.log(keysP);
					endOfGoods(keysP[tmpI]);
				}
					// console.log(keysP1);
					var count1 = keysP1.length;
					var myClass1 = myClass + tmpI;
					for(var i1=0;i1<count1;i1++){
						myClass1 += i1.toString();
						$(".column3").append($("<div>Hello</div>").addClass(myClass1));
						myClass1 = "." + myClass1;
						$(myClass1).html(jsonData[keysP1[i1]]);
						// create hidden element to hold value
						$(myClass1).append("<span>"+i1+"</span>");
						$(myClass1 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count1 + "px";
						$(myClass1).css("height",realHeight);
						//--------------
						//create color
						$(myClass1).css("background-color","rgb(0,0,195)");

						//create subslide
						$(myClass1).click(function(){ 
							$(".productConsole p").remove();
							$(".column4 div").remove();
							$(".column5 div").remove();
							var tmpI = Number($(this).text()[$(this).text().length -1]);
							console.log(tmpI);
							var keysP2 = jparse(jsonData,keysP1[tmpI]);
							if(keysP2==""){
								console.log(keysP1);
								endOfGoods(keysP1[tmpI]);
							}
							var count2 = keysP2.length;
							var myClass2 = myClass1 + tmpI;
							for(var i2=0;i2<count2;i2++){
								myClass2 += i2.toString();
								$(".column4").append($("<div>Hello</div>").addClass(myClass2));
								myClass2 = "." + myClass2;
								$(myClass2).html(jsonData[keysP2[i2]]);
						// create hidden element to hold value
						$(myClass2).append("<span>"+i2+"</span>");
						$(myClass2 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count2 + "px";
						$(myClass2).css("height",realHeight);
						//--------------
						//create color
						$(myClass2).css("background-color","rgb(0,0,225)");

						//create subslide
						$(myClass2).click(function(){
							$(".productConsole p").remove();
							$(".column5 div").remove();
							var tmpI = Number($(this).text()[$(this).text().length -1]);
							console.log(tmpI);
							var keysP3 = jparse(jsonData,keysP2[tmpI]);
							if(keysP3==""){
								console.log(keysP2);
								endOfGoods(keysP2[tmpI]);
							}
							var count3 = keysP3.length;
							var myClass3 = myClass2 + tmpI;
							for(var i3=0;i3<count3;i3++){
								myClass3 += i3.toString();
								$(".column5").append($("<div>Hello</div>").addClass(myClass3));
								myClass3 = "." + myClass3;
								$(myClass3).html(jsonData[keysP3[i3]]);
						// create hidden element to hold value
						$(myClass3).append("<span>"+i3+"</span>");
						$(myClass3 + " span").hide();
						// create height
						var tmpHeightString = heightP.substr(0,heightP.length-2);
						realHeight = (Number(tmpHeightString))/count3 + "px";
						$(myClass3).css("height",realHeight);
						//--------------
						//create color
						$(myClass3).css("background-color","rgb(0,0,255)");

						
						myClass3 = myClass3.substr(1,myClass3.length-2);
					}
				});
myClass2 = myClass2.substr(1,myClass2.length-2);
}


});
myClass1 = myClass1.substr(1,myClass1.length-2);
}

});
myClass = myClass.substr(1,myClass.length-2);

}
}
}

$.ajax({				//jquery read file from url
	type:"POST",
	url:"rcs/spices.txt",
	data:"json",
	success:function(result){
		jsonData = convert(result);
	}});
$(".product1").click(function(){

	controllerToggle("1");
});
$(".product2").click(function(){

	controllerToggle("2");
});
$(".product3").click(function(){

	controllerToggle("3");
});