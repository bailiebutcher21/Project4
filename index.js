var weatherobj;
var closeCourses;
var local_obj = {latitude:40.4426135, longitude: -111.8631116, radius: 100};
var numholes;
var numplayers = 4;
var selectedtee;


$(function(){
    $.get("http://api.openweathermap.org/data/2.5/weather?q=lehi&appid=cc8ef8e5c209d938ab3801daa42b5e31", function(data, status){
        weatherobj = data;
        console.log(data);
        mytemp = tempconvert(weatherobj.main.temp);
        $(".temp").html(mytemp).append(" Degrees");
        $(".img").attr("src","http://openweathermap.org/img/w/"+ weatherobj.weather[0].icon +".png");
        $(".conditions").html(weatherobj.weather[0].description);
        $(".wind").html(weatherobj.wind.speed).prepend("Wind Speed: ");
    });
});

function tempconvert(valNum) {
    valNum = parseFloat(valNum);
    return Math.round(((valNum-273.15)*1.8)+32);
}

/*function addPlayer(){
        $("#scorecolumn").append("<tr id='newplayer'></tr>");
        for(var i =0; i<1; i++){
            $("#random").append("<div id='lists'>Player<span onclick='editItem(this)'></span></div>");
        }
    for (var i = 0; i < 21; i++) {
        $("#random").append("<th scope=\"col\"><input id='inputval'></th>");
        $("#inputbox").val("");
    }

}*/



function loadMe(){
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data,status){
        closeCourses = JSON.parse(data);
        for(var p in closeCourses.courses){
            $("#selectCourse").append("<option value='"+ closeCourses.courses[p].id + "'>"+ closeCourses.courses[p].name +"</option");
        }
    });
}

function getCourse(courseid){
    $.get("https://golf-courses-api.herokuapp.com/courses/" + courseid, function(data){
        currentCourse = JSON.parse(data);
        console.log(currentCourse);
        for(var t in currentCourse.course.tee_types) {
            var teename = currentCourse.course.tee_types[t].tee_type;
            $("#selecttype").append("<option value='" + t +"'>"+ teename + "</option>");
        } });
    //changeName();
}
/*function changeName(coursename){
    $.get("https://golf-courses-api.herokuapp.com/courses/" + coursename, function(data){
        currentCourse = JSON.parse(data);
        for(var n in currentCourse.course.name) {
            var courseName = currentCourse.course.name;
            $("#leftside").HTML().append("<span>" + n + "</span>");
        } });

}*/
function buildCard(mytee){
    selectedtee = mytee;
    numholes = currentCourse.course.holes.length;
    console.log(numholes);

    for(var c in currentCourse.course.holes){
        var getPar = currentCourse.course.holes[c].tee_boxes[mytee].par;
        var gethcp = currentCourse.course.holes[c].tee_boxes[mytee].hcp;
        $(".scorecolumn").append("<div id='column" + (Number(c) + 1) + "' class='column'><div class='holenumber'> Hole " + (Number(c) +1) +"</div><span class='gettee'>Par " + getPar +"</span><div class='hcp'>HCP "+ gethcp +"</div></div></div>")
    }
    $(".scorecolumn").append("<div class = 'totalc column'><div class = 'holeheader'>Total</div></div>");

    fillCard();
}
function fillCard(){
    for(var p = 1; p <= numplayers; p++){
        $(".playercolumn").append("<span class='players' id='pl"+ p +"' ><span class='deletebtn' onclick='deleteplayer("+ p +")'><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"'></i></span><span contenteditable='true'>Player</span></span></span>");
        $("inscoretotal").append("<input type = 'text' class = 'intotal' id = 'intotal" + p + "'>")
        $(".totalc").append("<input type = 'text' class = 'holeinput' id = 'totalhole" + p + "'>");
        for(var h = 1; h <= numholes; h++){
            $("#column" + h).append("<input id='player"+ p + "hole" + h +"' type= 'text' class='holeinput' onkeyup = 'updatescore("+ p +")'/> ");
        }
    }
}
function deleteplayer(playerid){
    $("#pl" + playerid).remove();
    for(var h = 1; h <= numholes.length; h++){
        $("#addplayer" + playerid + "hole" + h).remove();
    }
}

function addPlayer(playerid){
    $("#pl" + playerid).append();
    for(var h = 1; h <= numholes.length; h++){
        $("#addplayer" + playerid + "hole" + h).append();
    }
}

function updatescore(playerid){
    var playertotal = 0;
    for (var t = 1; t <= numholes.length; t++){
        playertotal += Number($("#player" + playerid + "hole" + t).val());
    }
    $("#totalhole" + playerid).val(playertotal);
}
