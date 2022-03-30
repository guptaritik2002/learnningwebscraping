const request = require("request");
const cheerio = require("cheerio");
const url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
request(url, cb);
// console.log('before');

function cb(error, responce, html) {
  if (error) {
    console.log("error");
  } else {
    extracthtml(html);
  }
} 

function extracthtml(html) {
  let $ = cheerio.load(html);
  let teamarr = $(".match-info.match-info-MATCH .team");
  let wteamname;
  for (let i = 0; i < teamarr.length; i++) {
    let hasclass = $(teamarr[i]).hasClass("team-gray"); //has class is used to get the class inside the array we get .
    if (hasclass == false) {
      //wining team
      let teamnameElem = $(teamarr[i]).find(".name");
      //   console.log("winning team:",teamnameElem.text());
      wteamname = teamnameElem.text().trim();
    }
  }
  // console.log('after');
  let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
  let htmlstr = "";
  for (let i = 0; i < inningsArr.length; i++) {
    //   let chtml=  $(inningsArr[i]).html();
    //   htmlstr+=chtml;
    let teamnameElem = $(inningsArr[i]).find(".header-title.label");
    let teamname = teamnameElem.text();
    teamname = teamname.split("INNINGS")[0];
    teamname = teamname.trim();
    //    console.log(teamname);
    if (teamname == wteamname) {
 
      let tableElem = $(inningsArr[i]).find(".table.batsman"); //abhi html mila hai
      let playerElem = $(tableElem).find(".batsman-cell .small ");
      for (let j = 0; j <playerElem.length; j++)
       {   
       let wtbatsman=   $(playerElem[j]).text();
       let href = $(playerElem[j]).attr("href");
       let fulllink="https://www.espncricinfo.com/"+href;
    //    let wtbatsman = $(playerElem[j]).url;  
       request(fulllink,newcallbackfun);

       function newcallbackfun(error ,responce ,html )
       {
           if(error)
           {
               console.log(error);

           }
           else{
             profilepage(html);
           }
       }
       
     
       function profilepage(html)
       {
           let $=cheerio.load(html);
           let profiledescription=$(".player-card-description.gray-900");
           let birthdateandlocation= $(profiledescription[1]).text().trim();
           console.log("team name:", wteamname ,"playername:",wtbatsman,"born date and place :",birthdateandlocation);
           
       }
       

      }
   
    }
  }
}
