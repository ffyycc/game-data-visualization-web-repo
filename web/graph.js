const dims = { height: 1000, width: 1150};
const type_dic = { 0:"all", 1:"action",2:"adventure",3:"puzzle",4:"racing",5:"role-playing",6:"simulation",7:"sports",8:"strategy",9:"miscellaneous" };
const platform = { 0:"PC", 1:"PlayStation 4",2:"PlayStation 5",3:"Nintendo Switch",4:"Xbox One",5:"Xbox 360" };
const votes_vol = { 0: "100+", 3:"200+", 6:"500+", 9:"1000+" };

const margin = {top:60,right:30,bottom:100, left:30};
const graphWidth = dims.width - margin.left - margin.right;
const graphHeight = dims.height- margin.top - margin.bottom;

var slider = document.getElementById("myRange");
var var_slider = slider.value;
var colored_games = []
const chosen_color = ['#e65100','#9370DB','#DA70D6','#BC8F8F','#DEB887','#FFD700','#BDB76B','#E9967A','#C71585','#8FBC8B','#7e57c2','#CD5C5C','#DFFF00','#40E0D0','#9FE2BF','#CCCCFF']

const svg = d3.select('.canvas')
    .append('svg')
    // .attr('width',dims.width)
    // .attr('height',dims.height)
    .attr('viewBox',"0 0 1135 1100")
    .attr('preserveAspectRatio',"xMidYMid meet");


const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left},${margin.top})` )

const btn = document.querySelector('#btn');
const sb = document.querySelector('#framework')
const type_idx = document.querySelector('#gametype')

function makeGraphTitle() {
    var space ='\u00A0'.repeat(5);
    var first_str = `platform: ${platform[sb.selectedIndex]}`;
    var second_str = `type: ${type_dic[type_idx.selectedIndex]}`;
    var third_str = `min votes: ${votes_vol[var_slider]}`;
    return first_str+space+second_str+space+third_str;
}

const graphTitle = graph.append('text')
                .attr("class","title")
                .attr("text-anchor","middle")
                .attr("x", margin.left+graphWidth/2 )
                .attr("y",-35)
                .attr("font-family","Monospace")
                .text("Scatterplot of User Rating vs Game Difficulty (Size: Game Length)")
                .style("fill","grey")
                .style("font-size", 16);

const typeTitle = graph.append('text')
                .attr("class","cur-type")
                .attr("text-anchor","middle")
                .attr("x", margin.left+graphWidth/2 )
                .attr("y",-10)
                .attr("font-family","Monospace")
                .attr("white-space","pre")
                .text(makeGraphTitle)
                .style("fill","grey");
                

const xTitle = graph.append('text')
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", graphWidth+10)
            .attr("y", graphHeight+40)
            .attr("font-family","Monospace")
            .text("Difficulty level")
            .style("fill", "grey");
            
const yTitle = graph.append('text')
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", 100)
        .attr("y", -10)
        .attr("font-family","Monospace")
        .text("Game rating")
        .style("fill", "grey");


const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0,${graphHeight})`)

const yAxisGroup = graph.append('g');

const y = d3.scaleLinear()
    .domain([1,5])  
    .range([graphHeight,0]);

const x = d3.scaleLinear()
    .domain([1,5])
    .range([0,graphWidth]);

const min_radius = 8;
const max_radius = 20;
const score_transit = d3.scaleLinear()
    .range([min_radius,max_radius])
    .domain([0,80]);

const min_color = '#52BE80'
const max_color ='#041AFC'
var pick_color =  d3.scaleLinear().domain([2,5]).range([min_color,max_color])

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y)

function filter_sales(d,sale_vol) {
    const out = [];
    for (const element of d) {
        if (element.sales >= sale_vol) {
            out.push(element);
        }
    }
    return out;
}

function update_sale_vol(level) {
    var sale_vol;

    if (level == 0) { 
        sale_vol = 100; 
    } else if (level == 3) { 
        sale_vol = 200; 
    } else if (level == 6) { 
        sale_vol = 500; 
    } else { 
        sale_vol = 1000;
    }

    switch(sb.selectedIndex) {
        case 0:
            const filtered_pc = filter_sales(data_pc,sale_vol);
            data_cur = filter_type(filtered_pc);
            draw_graph(data_cur);
            break;
        case 1:
            const filtered_ps4 = filter_sales(data_ps4,sale_vol);
            data_cur = filter_type(filtered_ps4);
            draw_graph(data_cur);
            break;
        case 2:
            const filtered_ps5 = filter_sales(data_ps5,sale_vol);
            data_cur = filter_type(filtered_ps5);
            draw_graph(data_cur);
            break;
        case 3:
            const filtered_switch = filter_sales(data_switch,sale_vol);
            data_cur = filter_type(filtered_switch);
            draw_graph(data_cur);
            break;
        case 4:
            const filtered_xbox_one = filter_sales(data_xbox_one,sale_vol);
            data_cur = filter_type(filtered_xbox_one);
            draw_graph(data_cur);
            break;
        case 5:
            const filtered_xbox_360 = filter_sales(data_xbox_360,sale_vol);
            data_cur = filter_type(filtered_xbox_360);
            draw_graph(data_cur);
            break;
    }
}

slider.oninput = function() {
  var_slider = this.value;
  update_sale_vol(var_slider);
}

function draw_graph(data) {
    // clean search input
    search_wrapper.classList.remove("active");
    message_container.innerHTML = "";
    document.getElementById("error-hint").style.visibility = "hidden";
    input_box.value = "";

    // update title
    graph.select('.cur-type').text(makeGraphTitle);

    // remove old circles
    graph.selectAll('circle').remove();

    // reset colored games
    colored_games = [];

    // join the data to points
    const points = graph.selectAll('circle').data(data);
    // update current shapes in dom
    points.enter().append('circle')
        .attr('id',d => d.name.replace(/\s/g, "").replace(/[^a-zA-Z0-9 ]/g, "").replace(/0/g, "O"))
        .attr('class', "graph_circle")
        .attr('cx', d => x(d.difficulty))
        .attr('cy', d => y(d.rating))
        .style('fill', d => pick_color(d.difficulty))
        .style('opacity', 0.75)
        .transition().duration(1000)
            .attr('r',d => score_transit(d.length));

    // add events
    graph.selectAll('.graph_circle')
        .on('mouseover', (e,d) => {
            handleMouseOver(e)
            tip.show(e,d)
        })
        .on('click', (e,d) => {
            handleMouseOver(e)
            tip.show(e,d)
        })
        .on('mouseout',(e,d) => {
            handleMouseOut(e)
            tip.hide(e,d)
        })
}

function update_graph(data,collection_name) {
    // remove old circles
    if (data.length == 0) {
        db.collection(collection_name).get().then(response => {
            response.docs.forEach(doc => {
                temp = doc.data();
                data.push(temp)
            })
            
            data_cur = filter_type(data);
            draw_graph(data_cur);
        })
    } else {
        data_cur = filter_type(data);
        draw_graph(data_cur);
    }

}

function find_type(data,type) {
    d = []
    data.forEach(element => {
        if (element.type1 == type || element.type2 == type) {
            d.push(element)
        }
    });
    return d;
}

function filter_type(data) {
    if (type_idx.selectedIndex != 0) {
        d = find_type(data,type_dic[type_idx.selectedIndex]);
    } else {
        d = data;
    }
    return d;
}

btn.onclick = (event) => {
    event.preventDefault();
    document.getElementById("myRange").value = 0;
    var_slider = 0;

    // show the selected index
    switch(sb.selectedIndex) {
        case 0:
            update_graph(data_pc,"pc_csv")
            break;
        case 1:
            update_graph(data_ps4,"ps4_csv")
            break;
        case 2:
            update_graph(data_ps5,"ps5_csv")
            break;
        case 3:
            update_graph(data_switch,"switch_csv")
            break;
        case 4:
            update_graph(data_xbox_one,"xbox_one_csv")
            break;
        case 5:
            update_graph(data_xbox_360,"xbox_360_csv")
            break;
    }
};

function convert_max_time(l) {
    if (l == 80) {
        return "80+";
    }
    return l;
}

function convert_type_tag(type1,type2) {
    if (type2 == "None") {
        return type1;
    } else {
        return type1 + " & " + type2;
    }
}

const tip = d3.tip()
    .attr('class','tip card')
    .html((e,d)  => {
        let content = `<div class ="name">${d.name}</div>`
        content += `<div class = "type">type: ${convert_type_tag(d.type1,d.type2)}</div>`
        content += `<div class = "rating">rating: ${d.rating}</div>`
        content += `<div class = "difficulty">difficulty: ${d.difficulty}</div>`
        content += `<div class = "length">length: ${convert_max_time(d.length)}</div>`
        return content
    });

graph.call(tip);

let data_cur = [];
let data_pc = [];
let data_ps5 = [];
let data_ps4 = [];
let data_switch = [];
let data_xbox_360 = [];
let data_xbox_one = [];

// num of grid on y-axies
var num_grid_y = 5;

// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(x)
        
}

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(num_grid_y)
}

// make labels on axies
xAxisGroup.call(xAxis)
        
xAxisGroup.selectAll(".tick text")
        .attr("font-size","15")
        .attr("font-family","Monospace")
        .style("fill", "grey");

yAxisGroup.call(yAxis)
        
yAxisGroup.selectAll("text")
        .style("font-size", 15)
        .attr("font-family","Monospace")
        .style("fill", "grey");

xAxisGroup.call(make_x_gridlines()
                    .tickSize(-graphHeight)
                    .tickPadding(10));

yAxisGroup.call(make_y_gridlines()
    .tickSize(-graphWidth)
    .tickPadding(10));

xAxisGroup.selectAll(".tick line")
        .attr("stroke","#CDCDCD");

yAxisGroup.selectAll(".tick line")
        .attr("stroke","#CDCDCD");

xAxisGroup.append('line')
        .style("stroke", "black")
        .style("stroke-width", 2)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", graphWidth)
        .attr("y2", 0);

// get default data platform from firebase
db.collection("pc_csv").get().then(response => { 
    // push data in
    response.docs.forEach(doc => {
        data_pc.push(doc.data());
    })
    data_cur = data_pc;
    draw_graph(data_cur);

})

// event handlers
const handleMouseOver = e => {
    d3.selectAll('.graph_circle').style('opacity', 0.25);
    d3.select(e.currentTarget).style('opacity', 1);
}

const handleMouseOut = e => {
    d3.selectAll('.graph_circle').style('opacity', 0.75);
}

// getting input on search bar
const search_wrapper = document.querySelector(".input-field");
const input_box = search_wrapper.querySelector("input");
const sugg_box = search_wrapper.querySelector(".autocom-box")

input_box.onkeyup = (e) => {
    let user_data = e.target.value;
    let emptyArray = [];
    let suggestions = [];
    
    for (const element of data_cur) {
        suggestions.push(element.name);
    }

    if (user_data) {
        emptyArray = suggestions.filter((d) => {
            return d.toLocaleLowerCase().includes(user_data.toLocaleLowerCase());
        });

        if (emptyArray.length > 5) {
            emptyArray.length = 5;
        }

        emptyArray = emptyArray.map((d)  => {
            return d = '<li>' + d + '<li>';
        })
        search_wrapper.classList.add("active"); // show box
        show_suggestion(emptyArray);

        
        let temp_list = sugg_box.querySelectorAll("li");
        for (let i = 0; i <temp_list.length; i++) {
            if (temp_list[i].innerHTML == "") {
                temp_list[i].remove();
            } else {
                temp_list[i].setAttribute("onclick","select(this)");
            }
        }

    } else {
        search_wrapper.classList.remove("active"); //hide box
    }

}

function select(element) {
    let select_user_data = element.textContent;
    input_box.value = select_user_data;
    search_wrapper.classList.remove("active");
    after_search_event();
    
}

function show_suggestion(list) {
    let list_data;
    if (!list.length) {
        user_val = input_box.value;
        list_data = '<li>' + user_val + '</li>';
    } else {
        list_data = list.join('');
    }
    sugg_box.innerHTML = list_data;

}

const search_btn = document.querySelector('#btn-search');
const clear_btn = document.querySelector('#btn-clear');

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
    this.parentNode.appendChild(this);
    });
};

const message_container = search_wrapper.querySelector(".similar-hint");

clear_btn.onclick = (e) => {
    update_graph(data_cur);
}


function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function findIndicesOfMax(array, count) {
    var out = [];
    for (var i = 0; i < array.length; i++) {
        out.push(i);
        if (out.length > count) {
            out.sort(function(a, b) { return array[b] - array[a]; }); 
            out.pop(); 
        }
    }
    return out;
}

function giveGameList(array) {
    for (var i = 0; i < array.length-1; i++) {
        message_container.insertAdjacentHTML(
            'beforeend',
            `<span onclick= "fillSearchBar(this)" style="color:#039be5; font-family:Arial, Helvetica, sans-serif; cursor: pointer;">${array[i]}</span>`
        );

        message_container.insertAdjacentHTML(
            'beforeend',
            `<span style="color:#grey; font-family:Arial, Helvetica, sans-serif; cursor: pointer;">, </span>`
        ); 
    }
    message_container.insertAdjacentHTML(
        'beforeend',
        `<span onclick= "fillSearchBar(this)" style="color:#039be5; font-family:Arial, Helvetica, sans-serif; cursor: pointer;">${array[array.length-1]}</span>`
    );
}

function push_recommend(result,temp_d) {
    for (var i = 1; i < 11; i ++) {
        var tag = 'recommend' + i.toString();
        result.push(temp_d[tag]);
    }
    return result
}

function find_top_three_rmd(name) {
    var result1 = []
    var result2 = []

    // push current data to game list
    var game_list = []
    for (const element of data_cur) {
        game_list.push(element.name);
    }

    var recommand_list = []

    // push data in 
    d3.csv("user_based_rmd.csv",function(data){
        temp_name = data.game_name
        if (temp_name.toLocaleLowerCase() == name.toLocaleLowerCase()) {
            result1 = push_recommend(result1,data);
            for (var i = 0; i < result1.length; i++) {
                if (recommand_list.length == 3) {
                    break;
                }

                if (game_list.includes(result1[i]) && !colored_games.includes(result1[i])) {
                    recommand_list.push(result1[i])
                }
            }
        }
    })

    d3.csv("content_based_rmd.csv",function(data){
        temp_name = data.game_name
        if (temp_name.toLocaleLowerCase() == name.toLocaleLowerCase()) {
            result2 = push_recommend(result2,data);
            for (var i = 0; i < result2.length; i++) {
                if (recommand_list.length == 3) {
                    break;
                }
                
                if (game_list.includes(result2[i]) && !colored_games.includes(result2[i])) {
                    recommand_list.push(result2[i])
                }
            }
            
            if (recommand_list.length != 0) {
                message_container.insertAdjacentHTML(
                    'beforeend',
                    `<span style="color: grey; font-family:Arial, Helvetica, sans-serif;">Other games you may like: </span>`
                );
        
                giveGameList(recommand_list);
            }

        }
    })

    
}

function after_search_event() {
    search_wrapper.classList.remove("active");
    message_container.innerHTML = "";

    let select_games = [];
    for (const element of data_cur) {
        if (element.name.toLocaleLowerCase() == input_box.value.toLocaleLowerCase()) {
            select_games.push(element.name);
            break;
        }
    }

    var recomand_visible = false;
    var hint_container = document.getElementById("error-hint");
    if (select_games.length == 0) {
        hint_container.innerHTML = 'Game not found in the current graph';
        hint_container.style.visibility = 'visible';
        hint_container.style.color = 'red';
        recomand_visible = true;
    } else {
        find_top_three_rmd(select_games[0])

        hint_container.innerHTML = 'Your game is shown in the graph!'
        hint_container.style.visibility = 'visible';
        hint_container.style.color = 'green';

        d3.selectAll('.graph_circle').style('opacity', 0.25);
        for (var i = 0; i < select_games.length; i+=1) {
            var temp_game = d3.select('#' + select_games[i].replace(/\s/g, "").replace(/[^a-zA-Z0-9 ]/g, "").replace(/0/g, "O"));
            colored_games.push(select_games[i]);
            
            var temp_color = chosen_color[(colored_games.length-1)%chosen_color.length]
            temp_game.style('opacity', 1).style('fill',temp_color);
            temp_game.moveToFront();
        }
    
    }

    const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now',""," "];

    if (select_games.length == 0 && input_box.value != "") {
        var search_words = input_box.value.split(" ");
        var table = []; 
        for (const game of data_cur) {
            var count = 0;
            for (var i = 0; i < search_words.length; i+= 1) {
                if (!stopwords.includes(search_words[i].toLocaleLowerCase())) {
                    if (game.name.toLocaleLowerCase().includes(search_words[i].toLocaleLowerCase())) {
                        count += 1;
                    }
                }

            }

            table.push(count/countWords(game.name));

        }
        var indices = findIndicesOfMax(table,3); 
        for (var i = 0; i < indices.length; i++) {
            if (table[indices[i]] >= 1/5) {
                select_games.push(data_cur[indices[i]].name);
            }
        }
    } 

    if (recomand_visible && select_games.length > 0) {
        message_container.insertAdjacentHTML(
            'beforeend',
            `<span style="color: grey; font-family:Arial, Helvetica, sans-serif;">Maybe you want: </span>`
        );

        giveGameList(select_games);

    }
}

function fillSearchBar(inp) {
    input_box.value = inp.innerHTML;
    after_search_event();
}

search_btn.onclick = (e) => {
    after_search_event();
}