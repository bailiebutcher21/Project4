var weatherobj;

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
    for (var i = 0; i < 21; i++) {
        $("#random").append("<th scope=\"col\"><input></th>");
    }

}

var closeCourses;
var local_obj = {latitude:40.4426135, longitude: -111.8631116, radius: 100};

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
    });
}