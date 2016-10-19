$('#startButton').click(function() {
    $('#article').html(getArticle());
});

$('#submitAnswer').click(function() {
    var answer = $('#answer').val();
    answer = answer.toLowerCase();
    if (answer == localStorage.getItem("answer")) {
        alert("You win. wow.");
        var wins = parseInt($("#win").html().replace(/\D/g,''));
        wins += 1;
        if (wins == 1) {
            $("#win").html("You have won " + wins + " time");
        }
        else {
            $("#win").html("You have won " + wins + " times");
        }

    }
    else {
        alert("Looking for " + localStorage.getItem("answer") + " not " + answer );
    }
    
            $('#mainContent').css('display', 'none');
        $('#startButton').css('display', 'inherit');
});



function getArticle() {
    var temp;
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
    $.each(data.query.pages, function(k, v) {
        $.getJSON('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro=&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
        $.each(data.query.pages, function(k, v) {
        temp = v.extract;
        temp = /(\bis\b|\bwas\b)(.+)/g.exec(temp)[0];
        temp = "? " + temp;
	//console.log(temp);
        temp = temp.replace(v.title.replace(/\(.*?\)/g,''),'?');
        	//console.log(v.title);
            $('#article').html(temp);
            $('#mainContent').css("display", "inherit");
            $('#startButton').css("display", "none");
            localStorage.setItem("answer", v.title.toLowerCase());
          return temp;
        });
           
        });
    });
    
});
return temp;
}