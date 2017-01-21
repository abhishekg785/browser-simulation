#Simulation in Browser

##What am i doing ?
My universe will consist of three main components : System , World and Item.<br/>
What I will be doing is plain simple, first i will notice the changes in my object properties and then incorporate those changes to create a new frame.
if we manage to do it fast , we hope to create a beautiful natural looking simulation :)

Why not take the help of our buddy , requestAnimationFrame running 60 frames per sec.

##Cool Stuff I learnt in the process " Oh! Yeaah! "
When browser apply 3D transformations to our html elements ,they invoke the computer's GPU and accelerating rendering.<br/>
<em>Browsers are smart :) </em></br>
However not all browsers support them and some only support 2D transforms. Modernizr to the rescue!!!<br/>
I will use it to determine what transform feature my browser supports.
