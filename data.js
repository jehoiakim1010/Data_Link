    $(document).ready(function () {

        // Sentiments
        var sentiments_keyword_positive = [
            "good", "better", "nice", "excellent", "awesome",
            "fantastic", "wonderful", "superb", "great", "amazing",
            "brilliant", "terrific", "splendid", "fabulous", "outstanding",
            "phenomenal", "perfect", "incredible", "marvelous", "impressive",
            "delightful", "exceptional", "lovely", "beautiful", "cool",
            "joyful", "happy", "uplifting", "glorious", "graceful",
            "charming", "sensational", "stunning", "remarkable", "majestic",
            "elegant", "radiant", "breathtaking", "exquisite", "vibrant",
            "refreshing", "captivating", "blissful", "divine", "ecstatic",
            "thrilling", "ravishing", "enchanting", "resplendent", "serene",
            "exhilarating", "miraculous", "sunshine", "paradise", "heavenly",
            "glowing", "delicious", "grateful", "empowering", "fab",
            "pristine", "harmonious", "awesome", "magic", "celestial",
            "heartwarming", "gentle", "luminous", "exultant", "jubilant",
            "radiant", "cheerful", "bright", "sparkling", "festive",
            "gleaming", "sunny", "glistening", "effervescent", "exuberant",
            "golden", "beaming", "lively", "magnificent", "idyllic",
            "energizing", "bliss", "tranquil", "utopia", "paradise",
            "buoyant", "charismatic", "buoyant", "colorful", "glamorous"
        ];
        var sentiments_keyword_count_positive = {};

        var sentiments_keyword_negative = [
            "bad", "worse", "terrible", "horrible", "awful",
            "poor", "unpleasant", "disappointing", "unfavorable", "inferior",
            "disgusting", "offensive", "ugly", "abysmal", "dreadful",
            "lousy", "distasteful", "repulsive", "disheartening", "unacceptable",
            "depressing", "discouraging", "grim", "unfortunate", "miserable",
            "gloomy", "dire", "dreary", "bleak", "sad",
            "tragic", "melancholy", "grief", "sorrow", "despair",
            "anguish", "heartbreaking", "disastrous", "ruinous", "devastating",
            "catastrophic", "horrifying", "nightmarish", "frightening", "terrifying",
            "scary", "menacing", "threatening", "dangerous", "harmful", "mary grace"
        ];
        var sentiments_keyword_count_negative = {};

        var sentiments_keyword_Uncertainty = [
            "uncertain", "ambiguous", "doubtful", "indecisive", "insecure",
            "unsettled", "vague", "undecided", "unpredictable", "confused",
            "conflicted", "hesitant", "wary", "ambiguous", "equivocal",
            "unresolved", "unstable", "precarious", "tentative", "shaky",
            "unsteady", "iffy", "hazy", "murky", "cloudy",
            "fuzzy", "nebulous", "opaque", "mysterious", "obscure",
            "perplexing", "puzzling", "bewildering", "mixed", "variable",
            "volatile", "capricious", "chancy", "unreliable", "unclear",
            "questionable", "dubious", "skeptical", "suspicious", "anxious"
            , "mary grace"
        ];
        var sentiments_keyword_count_Uncertainty = {};

        var sentiments_keyword_Litigious = [
            "litigious", "lawsuit", "legal action", "court", "litigation",
            "dispute", "lawsuit", "claim", "legal battle", "litigate",
            "lawsuit", "legal case", "legal dispute", "lawsuit", "lawsuit",
            "litigious", "lawsuit", "legal claim", "legal proceeding", "litigation",
            "lawsuit", "lawsuit", "lawsuit", "litigious", "legal matter",
            "lawsuit", "legal process", "litigate", "lawsuit", "legal fight",
            "court case", "litigious", "lawsuit", "legal issue", "litigation",
            "lawsuit", "lawsuit", "lawsuit", "litigious", "legal matter",
            "lawsuit", "legal dispute", "litigate", "lawsuit", "legal action",
            "court battle", "litigious", "lawsuit", "legal challenge", "litigation"
        ];
        var sentiments_keyword_count_Litigious = {};
        //FETCH GOOGLE DATA
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://app.peakmetrics.com/alert/listenph1/79259/rss')}`)
            .then(response => {
                if (response.ok) return response.json(); // Parse the JSON response
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Parse the contents as XML
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data.contents, 'application/xml');
                var items = xmlDoc.querySelectorAll('item');

                items.forEach(item => {
                    var title = item.querySelector('title').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');
                    var description = item.querySelector('description').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');

                    // Check if any of the keywords are present in the title or description
                    sentiments_keyword_positive.forEach(keyword => {
                        if (title.includes(keyword) || description.includes(keyword)) {
                            if (sentiments_keyword_count_positive[keyword]) {
                                sentiments_keyword_count_positive[keyword]++;
                            } else {
                                sentiments_keyword_count_positive[keyword] = 1;
                            }
                        }
                    });

                    // Check if any of the keywords are present in the title or description
                    sentiments_keyword_negative.forEach(keyword => {
                        if (title.includes(keyword) || description.includes(keyword)) {
                            if (sentiments_keyword_count_negative[keyword]) {
                                sentiments_keyword_count_negative[keyword]++;


                            } else {
                                sentiments_keyword_count_negative[keyword] = 1;
                            }
                        }
                    });

                    // Check if any of the keywords are present in the title or description
                    sentiments_keyword_Uncertainty.forEach(keyword => {
                        if (title.includes(keyword) || description.includes(keyword)) {
                            if (sentiments_keyword_count_Uncertainty[keyword]) {
                                sentiments_keyword_count_Uncertainty[keyword]++;


                            } else {
                                sentiments_keyword_count_Uncertainty[keyword] = 1;
                            }
                        }
                    });

                    // Check if any of the keywords are present in the title or description
                    sentiments_keyword_Litigious.forEach(keyword => {
                        if (title.includes(keyword) || description.includes(keyword)) {
                            if (sentiments_keyword_count_Litigious[keyword]) {
                                sentiments_keyword_count_Litigious[keyword]++;


                            } else {
                                sentiments_keyword_count_Litigious[keyword] = 1;
                            }
                        }
                    });
                });

                // Create <li> elements based on the sentiments count
                var chartContainer_positive = document.querySelector('.chart--horiz_positive');
                for (var keyword in sentiments_keyword_count_positive) {
                    var count = sentiments_keyword_count_positive[keyword];
                    var li = document.createElement('li');
                    li.className = 'chart__bar';
                    var percentage = (sentiments_keyword_count_positive[keyword]);
                    li.style.width = percentage + '%';
                    li.setAttribute('data-percentage', percentage.toFixed(2));

                    var span = document.createElement('span');
                    span.className = 'chart__label';
                    span.textContent = keyword + ' (' + count + ')'; // Display count in label

                    li.appendChild(span);
                    chartContainer_positive.appendChild(li);
                }

                var chartContainer_negative = document.querySelector('.chart--horiz_negative');
                for (var keyword in sentiments_keyword_count_negative) {
                    var count = sentiments_keyword_count_negative[keyword];
                    var li = document.createElement('li');
                    li.className = 'chart__bar';
                    var percentage = (sentiments_keyword_count_negative[keyword]);
                    li.style.width = percentage + '%';
                    li.setAttribute('data-percentage', percentage.toFixed(2));

                    var span = document.createElement('span');
                    span.className = 'chart__label';
                    span.textContent = keyword + ' (' + count + ')'; // Display count in label

                    li.appendChild(span);
                    chartContainer_negative.appendChild(li);
                }

                var chartContainer_Uncertainty = document.querySelector('.chart--horiz_uncertainty');
                for (var keyword in sentiments_keyword_count_Uncertainty) {
                    var count = sentiments_keyword_count_Uncertainty[keyword];
                    var li = document.createElement('li');
                    li.className = 'chart__bar';
                    var percentage = (sentiments_keyword_count_Uncertainty[keyword]);
                    li.style.width = percentage + '%';
                    li.setAttribute('data-percentage', percentage.toFixed(2));

                    var span = document.createElement('span');
                    span.className = 'chart__label';
                    span.textContent = keyword + ' (' + count + ')'; // Display count in label

                    li.appendChild(span);
                    chartContainer_Uncertainty.appendChild(li);
                }

                var chartContainer_Litigious = document.querySelector('.chart--horiz_litigious');
                for (var keyword in sentiments_keyword_count_Litigious) {
                    var count = sentiments_keyword_count_Litigious[keyword];
                    var li = document.createElement('li');
                    li.className = 'chart__bar';
                    var percentage = (sentiments_keyword_count_Litigious[keyword]);
                    li.style.width = percentage + '%';
                    li.setAttribute('data-percentage', percentage.toFixed(2));

                    var span = document.createElement('span');
                    span.className = 'chart__label';
                    span.textContent = keyword + ' (' + count + ')'; // Display count in label

                    li.appendChild(span);
                    chartContainer_Litigious.appendChild(li);
                }
            });

        //FETCH RSS DATE
        var dateCounts = {}; //Dates
        var colors = [
            "cornflowerblue",
            "olivedrab",
            "orange",
            "tomato",
            "crimson",
            "purple",
            "turquoise",
            "forestgreen",
            "navy",
            "gray",
            "teal",
            "darkorchid",
            "mediumspringgreen",
            "lightcoral",
            "steelblue",
            "rosybrown",
            "indigo",
            "cadetblue",
            "sienna",
            "goldenrod",
            "maroon",
            "darkslategray",
            "lime",
            "mediumvioletred",
            "slateblue",
            "peru",
            "royalblue",
            "olive",
            "darkgoldenrod",
            "slategray",
            "saddlebrown",
            "darkorange",
            "mediumseagreen",
            "orchid",
            "mediumaquamarine",
            "darkgreen",
            "mediumslateblue",
            "darkmagenta",
            "dodgerblue",
            "firebrick",
            "mediumblue",
            "indianred",
            "navajowhite",
            "mediumorchid",
            "darkred",
            "seagreen",
            "darkcyan",
            "lightseagreen",
            "chocolate",
            "mediumturquoise",
            "crimson",
            "darkviolet",
            "darkolivegreen",
            "deepskyblue",
            "mediumspringgreen",
            "orangered",
            "purple",
            "salmon",
            "slateblue",
            "tomato",
            "darkslateblue",
            "darksalmon",
            "deepskyblue",
            "limegreen",
            "lightcoral",
            "mediumblue",
            "mediumvioletred",
            "midnightblue",
            "magenta",
            "green",
            "greenyellow",
            "hotpink",
            "lightgreen",
            "lightpink",
            "lightsalmon",
            "mediumslateblue",
            "navy",
            "palegreen",
            "orangered",
            "powderblue",
            "saddlebrown",
            "seagreen",
            "royalblue",
            "springgreen",
            "thistle",
            "violet",
            "yellowgreen",
            "darkolivegreen",
            "deeppink",
            "deepskyblue",
            "darkslategray",
            "darkseagreen",
            "darkorchid",
            "darkmagenta",
            "darkgreen",
            "darkcyan",
            "darkblue",
            "darkgoldenrod",
            "darkgray",
            "darkred",
            "darkorange",
            "darkkhaki",
            "darkviolet",
            "darksalmon",
            "darkturquoise",
            "dodgerblue",
            "lightseagreen",
            "lightgreen",
            "lightcoral",
            "lightpink",
            "lightsalmon",
            "lightsteelblue",
            "limegreen",
            "mediumaquamarine",
            "mediumblue",
            "mediumorchid",
            "mediumpurple",
            "mediumseagreen",
            "mediumslateblue",
            "mediumspringgreen",
            "mediumturquoise",
            "mediumvioletred",
            "midnightblue",
            "mistyrose",
            "moccasin",
            "navajowhite",
            "navy",
            "oldlace",
            "olive",
            "olivedrab",
            "orange",
            "orangered",
            "orchid",
            "palegoldenrod",
            "palegreen",
            "paleturquoise",
            "palevioletred",
            "papayawhip",
            "peachpuff",
            "peru",
            "pink",
            "plum",
            "powderblue",
            "purple",
            "red",
            "rosybrown",
            "royalblue",
            "saddlebrown",
            "salmon",
            "sandybrown",
            "seagreen",
            "seashell",
            "sienna",
            "silver",
            "skyblue",
            "slateblue",
            "slategray",
            "snow",
            "springgreen",
            "steelblue",
            "tan",
            "teal",
            "thistle",
            "tomato",
            "turquoise",
            "violet",
            "wheat",
            "white",
            "whitesmoke",
            "yellow",
            "yellowgreen"
        ];

        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://app.peakmetrics.com/alert/listenph1/79259/rss')}`)
            .then(response => {
                if (response.ok) return response.json(); // Parse the JSON response
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Parse the contents as XML
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data.contents, 'application/xml');
                var items = xmlDoc.querySelectorAll('item');
                var parsedPubDates = [];

                items.forEach(item => {
                    var pubDate = new Date(item.querySelector('pubDate').textContent);
                    var dateKey = pubDate.toDateString(); // Use date as key
                    var pubDateStr = new Date(pubDate);
                    parsedPubDates.push({ original: pubDate, parsed: pubDateStr });

                    // Count occurrences of each date
                    if (dateCounts[dateKey]) {
                        dateCounts[dateKey]++;
                    } else {
                        dateCounts[dateKey] = 1;
                    }
                    var randomColorIndex = Math.floor(Math.random() * colors.length);

                    // Initialize the data array for the chart
                    var chartData = [];

                    // Iterate over each date entry in dateCounts object
                    Object.keys(dateCounts).forEach(dateKey => {
                        // Generate a random color for each date entry
                        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

                        // Create a data object for the current date entry
                        var dataObject = {
                            "Date": dateKey,
                            "Date Count": dateCounts[dateKey],
                            "color": randomColor
                        };

                        // Push the data object to the chartData array
                        chartData.push(dataObject);
                    });
                    // Sort the chartData array by Date Count in descending order and take the top 5
                    chartData.sort((a, b) => b["Date Count"] - a["Date Count"]);
                    chartData = chartData.slice(0, 10);


                    // Create the chart with the modified data
                    var chart = AmCharts.makeChart("chartdiv", {
                        "type": "serial",
                        "startDuration": 2,
                        "dataProvider": chartData, // Use the modified chartData array
                        "valueAxes": [{
                            "position": "left",
                            "axisAlpha": 0,
                            "gridAlpha": 0
                        }],
                        "graphs": [{
                            "balloonText": "[[category]]: <b>[[value]]</b>",
                            "colorField": "color",
                            "fillAlphas": 0.85,
                            "lineAlpha": 0.1,
                            "type": "column",
                            "topRadius": 1,
                            "valueField": "Date Count"
                        }],
                        "depth3D": 40,
                        "angle": 30,
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryField": "Date",
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0
                        },
                        "exportConfig": {
                            "menuTop": "20px",
                            "menuRight": "20px",
                            "menuItems": [{
                                "icon": '/lib/3/images/export.png',
                                "format": 'png'
                            }]
                        }
                    }, 0);
                });
            }).catch(error => console.error('Error fetching RSS feed:', error));

        var keywords1 = [];
        var db_keyword = [];
        var keywordCounts1 = {};

        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://app.peakmetrics.com/alert/listenph1/79259/rss')}`)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Parse the RSS feed data
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data.contents, "text/xml");

                var items = xmlDoc.querySelectorAll('item');

                items.forEach(item => {
                    var title = item.querySelector('title').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');
                    var description = item.querySelector('description').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');

                    // Extract words from title and description
                    var words = title.split(/\s+/).concat(description.split(/\s+/));

                    // Update keywords1 and keywordCounts1
                    words.forEach(word => {
                        if (word) { // Check if the word is not empty
                            if (!keywords1.includes(word)) {
                                keywords1.push(word);
                            }
                            if (keywordCounts1[word]) {
                                keywordCounts1[word]++;
                            } else {
                                keywordCounts1[word] = 1;
                            }
                        }
                    });
                });

                // Populate db array from keywordCounts1
                for (var keyword in keywordCounts1) {
                    db_keyword.push({ "word": keyword, "weight": keywordCounts1[keyword] });
                }

                // Convert db array to the format required by WordCloud
                var list = db_keyword.map(item => [item.word, item.weight]);

                $("#wordCloud").jQWCloud({
                    words: db_keyword,
                    minFont: 10,
                    maxFont: 50,
                    //fontOffset: 5,
                    //cloud_font_family: 'Owned',
                    //verticalEnabled: false,
                    padding_left: 1,
                    //showSpaceDIV: true,
                    //spaceDIVColor: 'white',
                    word_common_classes: 'WordClass',
                    word_mouseEnter: function () {
                        var word = $(this).text();
                        var weight = db_keyword.find(item => item.word === word).weight;
                        $(this).css("text-decoration", "underline");
                        $(this).attr('title', `Number Of Count: ${weight}`);
                    },
                    word_mouseOut: function () {
                        $(this).css("text-decoration", "none");
                    },
                    word_click: function () {
                        alert("You have selected:" + $(this).text());
                    },
                    beforeCloudRender: function () {
                        date1 = new Date();
                    }
                    /*
                    afterCloudRender: function () {
                        var date2 = new Date();
                        console.log("Cloud Completed in " + (date2.getTime() - date1.getTime()) + " milliseconds");
                    }
                    */
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
