let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");

console.log("before");
request(url, cb);

function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        extractHTML(html);
    }
}

function extractHTML(html){
    let $ = cheerio.load(html);
    let teamsArr = $(".match-info.match-info-MATCH .team");
    let wTeamName;
    for(let i = 0; i<teamsArr.length; i++){
        let hasClass = $(teamsArr[i]).hasClass("team-gray");
        if(hasClass == false){
            let teamNameElem = $(teamsArr[i]).find(".name");
            // console.log(teamNameElem.text());
            wTeamName = teamNameElem.text().trim();
        }
    }

    let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    let htmlStr = "";
    for(let i = 0; i<inningsArr.length; i++){
        // let cHtml = $(inningsArr[i]).html();
        // htmlStr += cHtml;

        //team name
        let teamNameElem = $(inningsArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        // console.log(teamName);

        if(wTeamName == teamName){
            console.log(teamName);
        }

    }
    console.log(htmlStr);
}




