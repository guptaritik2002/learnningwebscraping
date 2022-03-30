const request = require("request");
const ch = require("cheerio");
const chalk = require("chalk");
// import chalk from 'chalk' ;
console.log("before ");
request("https://www.worldometers.info/coronavirus/", (error, response, html) => {
  if (error) {
    console.error("error:", error); // Print the error if one occurred
  } else {
    handlehtml(html);
  }
});
console.log("after");
function handlehtml(html) {
  let seltool = ch.load(html);
  let arrcontent = seltool("#maincounter-wrap span");
//   for (let i = 0; i < arrcontent.length; i++) {
    // let data = seltool(arrcontent[i]).text();
    // console.log("data :", data);
   let total= seltool(arrcontent[0]).text();
   let deaths= seltool(arrcontent[1]).text();
   let recovered= seltool(arrcontent[2]).text();
   
   console.log(chalk.greenBright('totalcases:'+total));
   console.log(chalk.redBright('deaths:'+deaths));
   console.log(chalk.green('recovery:'+recovered));

  }



