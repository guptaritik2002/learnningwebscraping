const request = require("request");
const cheerio= require("cheerio");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
console.log('before');
request(url, cb);
function cb(error , responce , html)
{
    if(error)
    {
    console.log('error');
    
    }
    else 
    {
      extracthtml(html);
        
    }
}
function extracthtml(html)
{
   let $=cheerio.load(html);
   let textarr =$('div[class="match-comment-long-text match-comment-padder"]>p:first').text();
//    let text=$(textarr[0]).text();
   let htmldata= $('div[class="match-comment-long-text match-comment-padder"]>p:first').html();
   console.log("text-data=",textarr);
   console.log("\n \n \n........now html data is going to be printed ................ \n\n\n");
   console.log("html-data",htmldata);

}


console.log('after');
