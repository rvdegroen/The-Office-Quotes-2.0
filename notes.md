# Critical rendering path

- Performance matters
- Internet snelheid (ongelijkheid)
- Perfomance is about improving conversion : fast websites have more visitors that visit more pages for longr period of times who come back more often
- no ux until the page loads
- poorly perfomring sites and app can pose real coss for the people who use them (lack of info)

- performance is about SEO (search engine optimization)
- google measures a lot of things, users have high expectations.
- perceived perofrmance refers to how fast a user thinks how fast you site is (think about rows in the efteling when you're actually waiting, but also getting a story)

- critical rendering path > different phases when loading a page
- how quikc are you at is it usable?

- progressive rendering: slow in rendering or out
- the sequence of steps the browser goes through rendering a page by giving priorities to certain files

- distinguish between first view (first time user) and repeat view
- first view: first meaningful paint
- repeat view: caching strategies, squashing bytes

- google core web vitals:
- lcp largest contentful paint - about loading, which element is your largest contentful paint (most pixels, hope it to be text, but usually img or header)
- fid - first input delay - interactivity with javascript its a challenge!!!! especially with frameworks
- cls - cumulative layout shift - frustrations for users when showing an add and you want to click, and you click on the add (measures how layout jumps while loading the page) - visual stability

---

how to measure this:
in the network tabs you can see it with lighthouse, oyu can throttle cpu, throttle network, html is usually the highest one rendering it in,

- webpagetest to also test ur page like lighthouse
- put in ur documentaton how u compressed it
- rticialcss minification + gzip
- gelderlander.nl - 1.5 s (in compirson to other websites)

## what can you do

- minification
- css netwerk, timing tab removing unnecessary things
- minify html
- in network, file, next to headers click on timing
- js

## first view

- firs person view without service worker caching?
- browser caching for first person view, no control except only using caching headers
- cache control: can see it in your response headers
- cache content
- cache on a server means you need to send a response header to your express server
- n express middleware res.setHeader("cache-control", "max-age=" + 365 _ 24 _ 60 + 60));
  next();
- in serviceworker without a serviceworker

## problem cache invalidation

- that means if ur v1 in serviceworker to fix, otherwise it will not use the styling for 1 year, cause its been cached

## revisioned files

cache/ folder
files
rev-manifest.json
index-khskdhf.css (per file is caching)

- you usallually keep track of changes in ur rev-manifest.json (key value pair)

## compression

download-time = file size / download speed
uncomprssed: download size === file size

how to turn it on in netwerk tab:
onderste value next to type is value (in size vgm) ? and daadwerkelijke grootte zie je ook

- je kan ook cache disablen next to red dot in the row
- in response header kann je zien of je app compression gebruikt

# network tab

- click on smthn or yellow line, yoi can see where the hole falls where smthn doesnt gets rendered and that render blocking js is render blocking

- defer is download together, voer t uit na domcontent is loaded

## compression custom fonts

- font subsetting
- foit probbleem
- inladen bokkeert renderen van je font in je css
- font face src in css
  font-display swap

# To do

- finsish readme (code examples, app description, screenshots)
- add offline page to cache (latest fetched quote)
- maybe add in that when i fetch, i fetch 2 quotes and it shows the older quote thats been saved, so the website is overall faster
