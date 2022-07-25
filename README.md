# Find Your Video Game
## Graph Visualization for Games in Different Platforms

This repo shares my data using on [Find Your Video Game](https://videogamevisual.com/) website. You can visit **content_data** directory to find csv files I used on my website.

I use **D3.js** to create most part of my website and use **google firebase** as the database. Also, **Scrapy** is the main web scraping tool for me to collect data. 

All content based data are from [GameFAQs](https://gamefaqs.gamespot.com/), and I will update the data periodically.

All web related codes are in **web** directory and all data analysis and model development codes are in **analysis** directory.

The part of project ideas is inspired by Professor Wade [Visualization for GenEd](https://waf.cs.illinois.edu/visualizations/)

Below are some examples and instructions about what you can do on this web.

### Examples
#### PC
<img width="880" alt="image" src="https://user-images.githubusercontent.com/55035176/175436832-7e5725c8-666d-454a-9e96-32b11d0665dc.png">

#### Nintendo Switch
<img width="880" alt="image" src="https://user-images.githubusercontent.com/55035176/175436972-cb5c7e73-293d-4bac-b52d-0e86f8b47202.png">

### Mouse Over and Search
You can put your mouse on the single plot to show detailed information.
Here, I select the point for the popular game "Super Smash Bros"

<img width="880" alt="image" src="https://user-images.githubusercontent.com/55035176/175438134-2df63cc1-1bf2-46d1-960d-04906e064d50.png">

If you can't find your game, you can always search in the search bar. The search box will give you the similar game names.

<img width="357" alt="image" src="https://user-images.githubusercontent.com/55035176/175440426-0ccc77cb-f348-4a21-aaed-1f311a1195c4.png">

Then you can click search, it would have a success message if success.

<img width="498" alt="image" src="https://user-images.githubusercontent.com/55035176/175440702-ee67f48b-0e21-4583-8c0a-0064d9240bb7.png">

Your game will be highlighted in graph!

<img width="880" alt="image" src="https://user-images.githubusercontent.com/55035176/175440841-b0aa2d03-41eb-4204-8f24-656cd249c712.png">

Click **RESET** button to clear all highlighted games.

If your searched game not in the current graph, it will show some similar games. You can click the game you want.

<img width="363" alt="image" src="https://user-images.githubusercontent.com/55035176/175441348-f61d9b80-7ab7-485d-a5c6-149895f76c6a.png">

<img width="880" alt="image" src="https://user-images.githubusercontent.com/55035176/175441542-52aba66f-2a55-4aa7-9031-d7f513d3afd2.png">

The system can recommend games based on your input. You can click the game you are interested in.
<img width="363" alt="image" src="https://user-images.githubusercontent.com/55035176/180627077-f6eb9ed6-ab40-4d75-868d-137eaab40dba.png">
<img width="880" alt="image" src="https://user-images.githubusercontent.com/55035176/180627108-f3a1877b-cc12-4669-821c-312d39393e79.png">


