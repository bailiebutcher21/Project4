var weatherobj;
var closeCourses;
var local_obj = {latitude:40.4426135, longitude: -111.8631116, radius: 100};
var numholes;
var numplayers = 5;


$(function(){
    $.get("http://api.openweathermap.org/data/2.5/weather?q=Lehi&appid=cc8ef8e5c209d938ab3801daa42b5e31", function(data, status){
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

function addPlayer(){
        $("#tablehead").append("<tr id='random'></tr>");
        for(var i =0; i<1; i++){
            $("#random").append("<div id='lists'>Player<span onclick='editItem(this)'></span></div>");
        }
    for (var i = 0; i < 21; i++) {
        $("#random").append("<th scope=\"col\"><input id='inputval'></th>");
        $("#inputbox").val("");
    }

}
var editItem = function(element) {
    var text = element.innerText;
    var input ="<input onkeyup='save(this)' value='"+ text +"'>";
    $(element).parent().prepend(input);
    $(element).remove();

};


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
            $("#selecttype").append("<option value='" + teename +"'>"+ teename + "</option>");
        } });
}
function buildCard(mytee){
    numholes = currentCourse.course.holes.length;
    console.log(numholes);

    for(var c in currentCourse.course.holes){
        $(".scorecolumn").append("<div id='column" + (Number(c) + 1) + "' class='column'></div>")
    }
    fillCard();
}
function fillCard(){
    for(var p = 1; p <= numplayers; p++){
        for(var h = 1; h <= numholes; h++){
            $("#column" + h).append("<input id='player"+ p + "hole" + h +"' type= 'text' class='holeinput'/> ");
        }
    }
}