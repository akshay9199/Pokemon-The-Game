angular.module("animate",["firebase"])
.controller("Animate",Animate)
function Animate($rootScope, $firebaseObject,$firebaseArray)
{
    var ani=this;
  ani.call=call;
    ani.tally=tally;
    ani.repeat=repeat;
    ani.score=0;
    ani.f=0;
    ani.here=here;    
    ani.check=check;
    ani.level=1;
    var flag=0;
    ani.status=0;    
    ani.hscore=0; 
  var  n,m,p,r,wrong,random,count=0;
    var hscore;
    var alrt=0;   
    var time;
    ani.c=45;   
    var interval; 
    
ani.here=here;
 
   function call()
    {
  
    var startTime = new Date().getTime();
    interval = setInterval(function(){
                                    var t=new Date().getTime();
                                      
                                    ani.c-=1;
                                    //console.log(ani.c);
                                    setInterval(ani.repeat,2000); 
                                    $rootScope.$apply(ani);
                                        if(new Date().getTime() - startTime > 90000)
                                    {       ani.tally(); 
                                            clearInterval(interval);
                                            clearInterval(m);
                                            return;
                                        }
                                    else{}
                                    
    },2000);
    }
  


function here()
{

}
function check(t)
{

    if(ani.r==t)
    {
        count++;
      
        if(count==3)
        {
            ani.score+=5;
            count=0;
        }
        else
        ani.score+=1;
    
    }
  else if(ani.wrong==t)
      {

        ani.score-=3;
        count=0;


      }


      else
      {

      }
      
        if(ani.score<0)
        {
           n=0;
       alert("Game Over!\nBetter luck next time");
        ani.f=1;
       clearInterval(m);
       clearInterval(interval);
        } 
        if(ani.score>=30 && ani.score<60)
        {
        
         if(alrt==0)
         {
      ani.level+=1;
        alert("Congrats! You have reached to Level:"+ani.level);
        setTimeout(ani.repeat,2000);
         alrt=1;
         }
        }
         else if(ani.score>=60 && ani.score<90)
        {
        
         if(alrt==1)
         {
             ani.level+=1;
        alert("Congrats! You have reached to Level:"+ani.level);
        setTimeout(ani.repeat,2000);
         alrt=0;
         }
        }
        else if(ani.score>=90 && ani.score<120)
        {
        
         if(alrt==0)
         {
      ani.level+=1;
        alert("Congrats! You have reached to Level:"+ ani.level);
        setTimeout(ani.repeat,2000);
         alrt=1;
         }
        }
         else if(ani.score>=120 )
        {
        
         if(alrt==1)
         {
             ani.level+=1;
        alert("Congrats! You have reached to Level:"+ani.level);
        setTimeout(ani.repeat,2000);
         alrt=0;
         }
        }

}     
               //checkle}

function repeat()
{
    ani.r=Math.floor(Math.random()*16+1);
     p=Math.floor(Math.random()*16+1);
    while(ani.r==p)
    {
        p=Math.floor(Math.random()*16+1);
    }
    ani.wrong=p;

    $rootScope.$apply(ani);

}
    setTimeout(function()
    {
            var rootRef =  firebase.database().ref();
             var studentRef = rootRef.child("HighestScores");
             ani.hscore  =  $firebaseArray(studentRef);
  
     //console.log(ani.hscore[0]);
    },3000);
function tally()
{
    if(ani.score>ani.hscore[0].$value)
       {
           if(flag==0)
           {alert("Congrats! you have beaten the Highest Score \n New High Score will  be  "+ani.score);
             ani.f=1;
              ani.hscore.$add(ani.score);
              ani.hscore.$remove(0);
        flag=1;   
        }
       }
       else
alert("Times up \n Your Score is:"+ani.score+"\n Highest Score:"+ani.hscore[0].$value);       
ani.f=1;
}

} 

