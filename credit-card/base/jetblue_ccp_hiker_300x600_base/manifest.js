FT.manifest({
    "filename": "index.html",
    "width": 300,
    "height": 600,
    "clickTagCount": 1,
    "hideBrowsers": ["ie8"],
    "richloads": [
 		{"name":"main_rl", "src":"jetblue_ccp_man_300x600_richload"}
 	],
    "instantAds": [
        {"name":"main_rl",          "type":"richload"}, 
        {"name":"clickTag1_url",    "type":"text", "default":"http://www.landingpageurl.com/?blahblah"}
    ]
});