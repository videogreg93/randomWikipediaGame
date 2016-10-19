  

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
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
    $.each(data.query.pages, function(k, v) {
        $.getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro=&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
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
            setTimeout(getAnswers(),100);
            
          //return temp;
        });
           
        });
    });
    
});
//return temp;
}

function getAnswers() {
    
var allAnswers = new Array();
    allAnswers[0] = localStorage.getItem("answer");
    var done = 0;
            $.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
            $.each(data.query.pages, function(k, v) {
            $.getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro=&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
                $.each(data.query.pages, function(k, v) {
                    
                   allAnswers[1] = v.title.toLowerCase();
                   done++;
                });
               
            });
            });
    
        });
            $.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
            $.each(data.query.pages, function(k, v) {
            $.getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro=&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
                $.each(data.query.pages, function(k, v) {
                    
                   allAnswers[2] = v.title.toLowerCase();
                   done++;
                });
               
            });
            });
    
        });
            $.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
            $.each(data.query.pages, function(k, v) {
            $.getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro=&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
                $.each(data.query.pages, function(k, v) {
                    
                   allAnswers[3] = v.title.toLowerCase();
                   done++;
                });
               
            });
            });
    
        });


    
    setTimeout(function() {
                allAnswers = shuffle(allAnswers);

              
    
    $('#answers').append("<li class = 'posAnswer'>" + allAnswers[0] + "</li>");
    $('#answers').append("<li class = 'posAnswer'>" + allAnswers[1] + "</li>");
    $('#answers').append("<li class = 'posAnswer'>" + allAnswers[2] + "</li>");
    $('#answers').append("<li class = 'posAnswer'>" + allAnswers[3] + "</li>");
    
    $('.posAnswer').click(function() {
    answer = $(this).html();
        if (answer == localStorage.getItem("answer")) {
        $('#answers').html(""); 
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
        $('#answers').html(""); 
    }
    
            $('#mainContent').css('display', 'none');
        $('#startButton').css('display', 'inherit');
 
  
});
        
    },300);

  

}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}