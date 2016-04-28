#!/usr/bin/env node
/**
 * Created by Cento on 25/03/2016.
 */
// librerie
var Nightmare = require('nightmare');
var cheerio = require('cheerio');
var fs = require('fs');
var json2csv = require('json2csv');
var queryString = require('query-string');
var program = require('commander');


//dati del sito
var field = 110;
var fieldName = "design"
var date = new Date().getTime() / 1000;
var time = 'all';
var sort = "appreciations"
var ordinal = 0;
var perpage = 25;
var limit = 1000;
var content = "users";
var baseurl = 'https://www.behance.net/search?'

var fields = [
    {
        "id": 1,
        "name": "Academia"
    },
    {
        "id": 108,
        "name": "Advertising"
    },
    {
        "id": 3,
        "name": "Animation"
    },
    {
        "id": 4,
        "name": "Architecture"
    },
    {
        "id": 5,
        "name": "Art Direction"
    },
    {
        "id": 130,
        "name": "Automotive Design"
    },
    {
        "id": 6,
        "name": "Blogging"
    },
    {
        "id": 109,
        "name": "Branding"
    },
    {
        "id": 133,
        "name": "Calligraphy"
    },
    {
        "id": 7,
        "name": "Caricature"
    },
    {
        "id": 8,
        "name": "Carpentry"
    },
    {
        "id": 9,
        "name": "Cartooning"
    },
    {
        "id": 10,
        "name": "Ceramics"
    },
    {
        "id": 124,
        "name": "Character Design"
    },
    {
        "id": 11,
        "name": "Choreography"
    },
    {
        "id": 12,
        "name": "Cinematography"
    },
    {
        "id": 13,
        "name": "Claymation"
    },
    {
        "id": 14,
        "name": "Comedy"
    },
    {
        "id": 15,
        "name": "Computer Animation"
    },
    {
        "id": 17,
        "name": "Confectionary Arts"
    },
    {
        "id": 18,
        "name": "Consulting"
    },
    {
        "id": 19,
        "name": "Copywriting"
    },
    {
        "id": 20,
        "name": "Costume Design"
    },
    {
        "id": 21,
        "name": "Crafts"
    },
    {
        "id": 137,
        "name": "Creative Direction"
    },
    {
        "id": 22,
        "name": "Culinary Alchemy"
    },
    {
        "id": 23,
        "name": "Culinary Arts"
    },
    {
        "id": 24,
        "name": "Dance"
    },
    {
        "id": 25,
        "name": "Design"
    },
    {
        "id": 122,
        "name": "Digital Art"
    },
    {
        "id": 26,
        "name": "Digital Imaging"
    },
    {
        "id": 27,
        "name": "Digital Photography"
    },
    {
        "id": 28,
        "name": "Directing"
    },
    {
        "id": 29,
        "name": "DJing"
    },
    {
        "id": 30,
        "name": "Documentary"
    },
    {
        "id": 110,
        "name": "Drawing"
    },
    {
        "id": 31,
        "name": "Editing"
    },
    {
        "id": 32,
        "name": "Editorial Design"
    },
    {
        "id": 33,
        "name": "Engineering"
    },
    {
        "id": 34,
        "name": "Enology (Wines)"
    },
    {
        "id": 35,
        "name": "Entrepreneurship"
    },
    {
        "id": 36,
        "name": "Exhibition Design"
    },
    {
        "id": 37,
        "name": "Fashion"
    },
    {
        "id": 93,
        "name": "Fashion Styling"
    },
    {
        "id": 38,
        "name": "Film"
    },
    {
        "id": 112,
        "name": "Fine Arts"
    },
    {
        "id": 40,
        "name": "Furniture Design"
    },
    {
        "id": 41,
        "name": "Game Design"
    },
    {
        "id": 42,
        "name": "Glass Blowing"
    },
    {
        "id": 43,
        "name": "Graffiti"
    },
    {
        "id": 44,
        "name": "Graphic Design"
    },
    {
        "id": 45,
        "name": "Hair Styling"
    },
    {
        "id": 47,
        "name": "Ice Sculpting"
    },
    {
        "id": 131,
        "name": "Icon Design"
    },
    {
        "id": 48,
        "name": "Illustration"
    },
    {
        "id": 49,
        "name": "Industrial Design"
    },
    {
        "id": 50,
        "name": "Information Architecture"
    },
    {
        "id": 134,
        "name": "Installation Design"
    },
    {
        "id": 51,
        "name": "Interaction Design"
    },
    {
        "id": 52,
        "name": "Interior Design"
    },
    {
        "id": 53,
        "name": "Jewelry Design"
    },
    {
        "id": 54,
        "name": "Journalism"
    },
    {
        "id": 55,
        "name": "Landscape Design"
    },
    {
        "id": 56,
        "name": "Leather Working"
    },
    {
        "id": 57,
        "name": "Lighting Design"
    },
    {
        "id": 125,
        "name": "Machinima"
    },
    {
        "id": 58,
        "name": "Magic"
    },
    {
        "id": 59,
        "name": "MakeUp Arts (MUA)"
    },
    {
        "id": 60,
        "name": "Marketing"
    },
    {
        "id": 61,
        "name": "Masonry"
    },
    {
        "id": 62,
        "name": "Metal Working"
    },
    {
        "id": 127,
        "name": "Millinery"
    },
    {
        "id": 63,
        "name": "Motion Graphics"
    },
    {
        "id": 106,
        "name": "Multimedia"
    },
    {
        "id": 64,
        "name": "Music"
    },
    {
        "id": 65,
        "name": "Music Composition"
    },
    {
        "id": 114,
        "name": "Music Production"
    },
    {
        "id": 129,
        "name": "Origami"
    },
    {
        "id": 66,
        "name": "Packaging"
    },
    {
        "id": 67,
        "name": "Painting"
    },
    {
        "id": 69,
        "name": "Pattern Design"
    },
    {
        "id": 70,
        "name": "Performing Arts"
    },
    {
        "id": 71,
        "name": "Perfumery"
    },
    {
        "id": 72,
        "name": "Philanthropy"
    },
    {
        "id": 107,
        "name": "Philosophy"
    },
    {
        "id": 113,
        "name": "Photo Illustration"
    },
    {
        "id": 128,
        "name": "Photo Manipulation"
    },
    {
        "id": 73,
        "name": "Photography"
    },
    {
        "id": 74,
        "name": "Photojournalism"
    },
    {
        "id": 75,
        "name": "Playwriting"
    },
    {
        "id": 76,
        "name": "Podcasting"
    },
    {
        "id": 77,
        "name": "Poetry"
    },
    {
        "id": 78,
        "name": "Print Design"
    },
    {
        "id": 79,
        "name": "Product Design"
    },
    {
        "id": 80,
        "name": "Production"
    },
    {
        "id": 123,
        "name": "Programming"
    },
    {
        "id": 81,
        "name": "Publishing"
    },
    {
        "id": 82,
        "name": "Puppetry"
    },
    {
        "id": 136,
        "name": "Retouching"
    },
    {
        "id": 85,
        "name": "Screenwriting"
    },
    {
        "id": 86,
        "name": "Sculpting"
    },
    {
        "id": 87,
        "name": "Set Design"
    },
    {
        "id": 88,
        "name": "Singing"
    },
    {
        "id": 89,
        "name": "Software Architecture"
    },
    {
        "id": 90,
        "name": "Songwriting"
    },
    {
        "id": 118,
        "name": "Sound Design"
    },
    {
        "id": 91,
        "name": "Storyboarding"
    },
    {
        "id": 92,
        "name": "Storytelling"
    },
    {
        "id": 135,
        "name": "Street Art"
    },
    {
        "id": 94,
        "name": "Television"
    },
    {
        "id": 95,
        "name": "Textile Design"
    },
    {
        "id": 96,
        "name": "Theater"
    },
    {
        "id": 126,
        "name": "Toy Design"
    },
    {
        "id": 97,
        "name": "Typography"
    },
    {
        "id": 111,
        "name": "Urbanism"
    },
    {
        "id": 132,
        "name": "User Interface Design"
    },
    {
        "id": 98,
        "name": "Video Arts"
    },
    {
        "id": 99,
        "name": "Video Blogging"
    },
    {
        "id": 100,
        "name": "Video Game Design"
    },
    {
        "id": 116,
        "name": "Video Jockey"
    },
    {
        "id": 119,
        "name": "Virtual World Design"
    },
    {
        "id": 101,
        "name": "Visual Arts"
    },
    {
        "id": 120,
        "name": "Visual Effects"
    },
    {
        "id": 102,
        "name": "Web Design"
    },
    {
        "id": 103,
        "name": "Web Development"
    },
    {
        "id": 104,
        "name": "Wood Working"
    },
    {
        "id": 105,
        "name": "Writing"
    }
]


//'ts=1461316500&ordinal=12&per_page=12&field=48&content=users&sort=appreciations&time=all&location_id=';


//variabili di supporto
var crt_array = [];
var toCsv = [];

//variabili per il csv finale
var csvHeaders = ["id", "name", "url", "location", "fields", "appreciations", "views"];

var nightmare = Nightmare({
    show: false,
})

//noinspection JSUnresolvedVariable
program
    .arguments('<category>')
    .option('-l, --limit <limit>', 'The top n profiles, es: 10000. Default = 1000')
    .option('-f, --filename <file>', 'The name of the output file, es: design.xlsx')

    .action(function (category) {

        fieldName = category.replace(/ /g, "");
        field = fields.filter(function (d) {
            return d.name.toLowerCase() == category.toLowerCase()
        })[0].id
        console.log(program.limit, field)
        //noinspection JSUnresolvedVariable
        if (program.limit != "") {

            //noinspection JSUnresolvedVariable
            limit = program.limit;
        }
        console.log("getting first " + limit + " profiles for category: " + fieldName);
        getProfiles(ordinal);
    })
    .parse(process.argv);


//scrape pagina Ammunitions
function getProfiles(ordinal) {

    var query = {
        field: field,
        content: content,
        ts: new Date().getTime(),
        time: time,
        sort: sort,
        ordinal: ordinal,
        per_page: perpage
    }


    var qs = queryString.stringify(query)


    nightmare
        .goto(baseurl + qs)
        .wait(".covers")
        .inject('js', 'node_modules/jquery/dist/jquery.js')
        .evaluate(function () {
            return $(".covers").html()
        })
        //la funzione "then" prende in ingresso il return della "evaluate"
        //il codice viene eseguito su node
        .then(function (prfl_page) {

            scrapeProfiles(prfl_page)
            if (toCsv.length < limit && prfl_page.indexOf("<")>-1) {
                ordinal += perpage;
                getProfiles(ordinal);
            }

            else {
                writeCsv(toCsv);
            }
        });
}


//Fase 3 - estrazione dei dati
function scrapeProfiles(html) {

    $ = cheerio.load(html);


    $(".user-row").each(function (index, item) {


        if (toCsv.length < limit) {
            var elem = {};
            var i = $(this)


            var fields = [];
            i.find(".field-link").each(function () {
                fields.push($(this).text())
            });

            ;
            elem.id = i.attr("data-id");
            elem.name = i.find(".user-name").text();
            elem.url = i.find(".user-image-link").attr("href");
            elem.location = i.find(".location-link").text();
            elem.fields = fields.join();
            elem.appreciations = i.find(".cover-stat-appreciations").text();
            elem.views = i.find(".cover-stat-views").text();


            toCsv.push(elem);
        }

    })
    console.log(toCsv.length);
    //writeCsv(toCsv);
}

//Fase 4 - Salvataggio su CSV
function writeCsv(arr) {

    console.log("writing csv");
    json2csv({data: arr, fields: csvHeaders}, function (err, csv) {
        if (err) console.log(err);
        fs.writeFile(fieldName + '.csv', csv, function (err) {
            if (err) throw err;
            console.log('file saved');
            //Chiudi Electron
            nightmare.end();
        });
    });
}
