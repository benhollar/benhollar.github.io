---
title: Visualizing Weight Loss
date: 2022-11-11
last_modified_at: 2022-11-12
categories: automation ios health data-visualization
excerpt: I've set a goal to lose weight, and have found luck tracking and projecting my weight loss with the help of a 
         few iOS tools.
automation-gallery:
  - url: /assets/img/projecting-weight-loss/shortcuts.png
    image_path: /assets/img/projecting-weight-loss/shortcuts.png
    alt: "Snippet of Shortcut workflow for generating projected weight charts."
    title: "Snippet of Shortcut workflow for generating projected weight charts."
  - url: /assets/img/projecting-weight-loss/charty.png
    image_path: /assets/img/projecting-weight-loss/charty.png
    alt: "placeholder image 2"
    title: "Image 2 title caption"
  - url: /assets/img/projecting-weight-loss/widgets.png
    image_path: /assets/img/projecting-weight-loss/widgets.png
    alt: "placeholder image 3"
    title: "Image 3 title caption"
---

Weight -- especially weight gain -- is a challenging subject for many, and I'm no exception. I've struggled with my
weight throughout the majority of my life, almost always falling in the "obese" category on the BMI scale.

**Note:** I'm no medical expert, but as I understand it, BMI isn't a generally useful metric. It can be both 
[misleading](https://www.science.ucsb.edu/news/headline/1159) and 
[dangerous](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2930234/) to rely on BMI for legitimate medical usage. I use it
here only as a surrogate to explain that I was and am carrying an undue amount of fat on my body.
{: .notice--info}

Starting the summer after I graduated high school, I began my first weight-loss journey as I lost nearly _fifty_ pounds.
It wasn't the first time I'd _tried_ to lose weight, but it was the first time I succeeded. Unfortunately, years later,
I regained all of the weight I lost and then some; I fell victim to a 
[common, though unfortunate phenomenon](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5764193/).

Recently, I've been grappling with finding the motivation and willpower to stick to the lifestyle change that losing
significant sums of weight requires. Understanding what to do is straightforward; the only essential advice is that to
lose weight, you must consume fewer calories than you expend. **Calories in, calories out.** In my experience, though,
that's harder said than done. Hunger pangs are frequent, and seeing the number on the scale increase _ever_ is intensely
demoralizing.

**Losing weight is a mental battle.** And this time around, I'm finding success by relying on collecting data about
my calorie intake and calorie expenditure so I can rigorously monitor my weight loss. With modestly accurate data, I
can see on a graph that even though the number on the scale went up one morning, I'm still on track. I'd like to share
the process I'm following now, in case it's of any use to anyone else who may be similarly struggling.

## Calories In: Calorie Counting

The first step I've always taken, even dating back to my first efforts to lose weight, is to count the calories I eat.
In order to make a change, you have to understand how much you're eating now. Calorie counting isn't fun, but I've found
that the small time investment makes a _huge_ difference to ensure that you're mindful of what you're eating.

**Eating at restaurants can be tricky.** Established chain restaurants generally have accessible nutritional
information, though it's often buried on their website in a dense, hard-to-read PDF. Some restaurants actually make it 
_easy_ to understand the nutritional information for your food; 
[Chipotle's nutrition calculator](https://www.chipotle.com/nutrition-calculator) is a notable example. However, smaller
restaurants may not make the information readily available, and they're often not _required_ to. 
{: .notice--danger}

Just looking at the nutritional label before deciding how much to eat is a great first step, but there are _countless_
apps available that make the process easier. A simple search on your phone's app store for "calorie counter" will turn
up a ton of options, but I can recommend a few. 

* [myfitnesspal](https://www.myfitnesspal.com/) is the most popular option on the iOS App Store.
* [Lose It!](https://loseit.com/) is the second most popular option.
* [Calory](https://calory.app/) is the app I'm currently using; it also provides some helpful recipe management tools.

Any good calorie tracking app will help you set an appropriate and safe daily calorie goal for your desired weight
change, and the essential features will likely be completely free.

## Calories Out: Activity Tracking

Counting calories is only half the battle when trying to understand if you should be losing (or gaining) weight.
Unfortunately, estimating calorie expenditure is a more complicated task, but fitness trackers do a decent job. The key
things to estimate are your [BMR](https://en.wikipedia.org/wiki/Basal_metabolic_rate) -- the energy you'd burn by doing
absolutely nothing all day -- and your "active" calories burned. 

In my case, I rely on my Apple Watch to collect this data for me. Throughout the day, it's monitoring my heart rate and
movement to record its best estimates into Apple Health, which can be used as a database to retrieve a total amount of
calories burned for a given day. I'm sure similarly-featured alternatives exist for other platforms, but if you own
Apple devices, I recommend this route.

## Visualizing Progress

Collecting calorie consumption and expenditure data is only useful if you have tools to visualize and interpret the
data. Unfortunately, while Apple Health provides charts for single collections of data (e.g. weight only, calorie 
consumption only, etc.), it doesn't have any support for showing how multiple values might relate to one another. Even
more unfortunately, I couldn't readily find any third-party apps that did what I wanted.

So, I made something myself. Through a combination of _Shortcuts_ (the Apple-provided app for creating automated
workflows of specified actions) and a chart-generation app _Charty_, I can now plot my weight against other lines
tracking my "scheduled" weight loss (I'm targeting losing 2 pounds per week) and my "projected" weight loss given my
calorie tracking. The end result looks something like this:

{% include gallery id="automation-gallery" caption="Shortcuts (left), Charty (middle), Widgets (right)" %}

If you'd like to give it a shot yourself, the following steps should work (though I've not tested them on another 
device):

* Download [Charty](https://chartyios.app/) and [Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334)
* Download my shortcuts: [_Plot Projected Weight_](/assets/files/projecting-weight-loss/Plot Projected Weight.shortcut) 
  and [_Get Date Range_](/assets/files/projecting-weight-loss/Get Date Range.shortcut)
* Run the _Plot Projected Weight_ shortcut, selecting a range of dates where you've recorded your weight and calorie 
  expenditure every day
