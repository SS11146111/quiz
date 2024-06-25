document.getElementById("btnNew").addEventListener("click",
    function(){    
        document.getElementById("intro").style.display = "none"
        displayQuiz();
    }
)

function displayQuiz()
{
    /*Promise.race(fetch('https://quizapi.io/api/v1/questions?apiKey=S3QArPby4cid5g0QQInNpyh6OAwguWMVUv5LlGiC&category=Linux'),
        new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Operation timed out")), 10000);
    }))*/
   
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
       
        questions = [];
        options = [];
        answers = [];

        json.forEach(obj => {
            questions.push(obj.question);
            options.push(obj.answers);
            answers.push(obj.correct_answer);
        });
       
    })
    .catch((error)=>{
        console.log(error.message)
    })
}




