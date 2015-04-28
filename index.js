var xray = require('x-ray');

var scrapeGithub = function(filepath, username){
  if (username === undefined){username = "lucaswadedavis";}
  if (filepath === undefined){filepath = 'github.json';}
  xray('http://github.com/stars/'+username)
    .select([{
      $root: '.repo-list-item',
      title: '.repo-list-name',
      link: '.repo-list-name a[href]',
      description: '.repo-list-description',
      meta: {
        $root: '.repo-list-meta',
        starredOn: 'time'
      }
    }])
    .paginate('.pagination a:last-child[href]')
    .limit(10)
    .write(filepath);
};


var scrapeTVTropes = function(filepath){
  if (filepath === undefined){filepath = 'tropes.json';}
  xray('http://tvtropes.org/pmwiki/pmwiki.php/Main/Tropes')
    .select([{$root:"li.plus",text:"",link:"a.twikilink[href]"}])
    .paginate('li.plus .twikilink[href]')
    .limit(50)
    .delay(500,3000)
    .write(filepath);
};

//scrapeGithub();
scrapeTVTropes('tvtropes.json');
//scrapeTVTropes(process.stdout);
