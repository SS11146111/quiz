score=0;

document.getElementById("btnNew").addEventListener("click",
    function(){    
        document.getElementById("intro").style.display = "none"
        document.getElementById("game").style.display = "block"
        document.getElementById("next").style.display = "block"
       
    }
)

document.getElementById("next").addEventListener("click",
    function(){    
        document.getElementById("note").style.display = "none"
        document.getElementById("game").style.display = "block"
        document.getElementById("next").style.display = "block"
        document.getElementById("next").innerHTML = "NEXT"
        document.getElementById("playBtn").style.display = "block"
        document.getElementById("next").style.display = "none"
        document.getElementById("shift").style.display = "block"
        document.getElementById("best").style.display = "block"
        fetchQuiz();
       
    }
)



function fetchQuiz()
{
    questions = [];
    options = [];
    answers = [];
    attempted = [];
   
   
    fetch('https://quizapi.io/api/v1/questions?apiKey=S3QArPby4cid5g0QQInNpyh6OAwguWMVUv5LlGiC&category=Linux')
    .then(res =>{

        if(res.status == 200)
        {
            return res.json();
            
        }
        else if(res.status == 400 || res.status == 404)
        {
            throw new Error('Data not found');
        }
        else
        {
                
            throw new Error('Failed to Fetch Data!!!');
        }
    })
    .then(json => {
       
        i=0;

        json.forEach(obj => {
            questions.push(obj.question);
            options.push(obj.answers);
            if(obj.correct_answer == "answer_a")
                answers.push("A")
            else if(obj.correct_answer == "answer_b")
                answers.push("B")
            else if(obj.correct_answer == "answer_c")
                answers.push("C")
            else if(obj.correct_answer == "answer_d")
                answers.push("D")
            else if(obj.correct_answer == "answer_e")
                answers.push("E")
            else if(obj.correct_answer == "answer_f")
                answers.push("F")
        });

        
        document.getElementById("shift").addEventListener("click",
            function()
            {
                document.getElementById("a").disabled = false;
                document.getElementById("b").disabled = false;
                document.getElementById("c").disabled = false;
                document.getElementById("d").disabled = false;
                document.getElementById("e").disabled = false;
                document.getElementById("f").disabled = false;

                document.getElementById("best").style.display = "none"
                document.getElementById("qContainer").style.display = "block"
                document.getElementById("qContent").style.display = "flex"
                document.getElementById("result").src = "/images/time.png";
                document.getElementById("question").innerHTML = questions[i];
                document.getElementById("optionTbl").innerHTML =    "<tr class='rowStyle'><td>A)</td><td>"+options[i].answer_a+"</td></tr>"+
                                                                    "<tr class='rowStyle'><td>B)</td><td>"+options[i].answer_b+"</td></tr>"+
                                                                    "<tr class='rowStyle'><td>C)</td><td>"+options[i].answer_c+"</td></tr>"+
                                                                    "<tr class='rowStyle'><td>D)</td><td>"+options[i].answer_d+"</td></tr>"+
                                                                    "<tr class='rowStyle'><td>E)</td><td>"+options[i].answer_e+"</td></tr>"+
                                                                    "<tr class='rowStyle'><td>F)</td><td>"+options[i].answer_f+"</td></tr>";

                if(i<questions.length)
                    i=i+1;
                if(i>=questions.length)
                    {
                        document.getElementById("shift").disabled = true;
                        questions = [];
                        options = [];
                        answers = [];
                        attempted = [];
                        alert(score)
                    }
                    



                document.getElementById("buzzer").addEventListener("click",
                    function(){
                        
                        document.getElementById("a").disabled = true;
                        document.getElementById("b").disabled = true;
                        document.getElementById("c").disabled = true;
                        document.getElementById("d").disabled = true;
                        document.getElementById("e").disabled = true;
                        document.getElementById("f").disabled = true;

                        var ele = document.getElementsByName("ans");
                        for (j = 0; j < ele.length; j++) {
                            if (ele[j].checked)
                            {
                               attempted.push(ele[j].value)

                
                               if(ele[j].value == answers[i])
                                {
                                    score++;
                                    document.getElementById("result").src = "/images/check.png";
                                    
                                }
                                else
                                {
                                    document.getElementById("result").src = "/images/cross.png";
                                }
                
                            }
                        }
                    }
                )

            }
        )
       
    })
    .catch((error)=>{
        console.log(error.message)
    })

}



