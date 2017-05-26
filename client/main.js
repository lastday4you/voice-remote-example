import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.onCreated(function(){
  tutorialEnabled = new ReactiveVar(false);
});
Template.body.onRendered(function(){
  if (annyang) {
  // Add our commands to annyang
  annyang.addCommands({
    'hello': function() { 
      swal({text:'Hello Stranger!',timer:3000}); 
    },
    'tell me a jokes' : function() {
      let jokes = ['What do you get when you cross a midget with a computer? A short circuit.', 'What kind of doctor fixes broken websites? An URLologist.','Everytime I log onto the seven dwarfs website my computer screen goes snow white....']
      swal({text:jokes[Math.floor(Math.random()*jokes.length)],timer:5000});
    },
    'tell me a joke' : function() {
      let jokes = ['What do you get when you cross a midget with a computer? A short circuit.', 'What kind of doctor fixes broken websites? An URLologist.','Everytime I log onto the seven dwarfs website my computer screen goes snow white....']
      swal({text:jokes[Math.floor(Math.random()*jokes.length)],timer:5000});
    },
    'open facebook' : function() {window.open('http://www.facebook.com', '_blank');},
    'calculate birth year of :year' : function(year) {swal({text:'Your age is ' + (2017-parseInt(year)),timer:3000});},
    'what is square root of :number' : function(number) {swal({text: 'sqaure root of number is ' + Math.sqrt(parseInt(number)),timer:3000});},
    'ok': function(){swal.close();},
    'help': function() {tutorialEnabled.set(true)}
  });
  
  // Tell KITT to use annyang
  SpeechKITT.annyang();
  

  annyang.addCallback('result', function(userSaid, commandText, phrases) {
  console.log(userSaid); // sample output: 'hello'
  console.log(commandText); // sample output: 'hello (there)'
  console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
});

  annyang.addCallback('resultNoMatch', function(userSaid, commandText, phrases) {
   swal({text:'command not found: ' + userSaid ,type:'error', timer: 4000})
});
  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  SpeechKITT.vroom();
}
});

Template.body.helpers({
  tutorialEnabled(){
    return tutorialEnabled.get();
  },
  options: {
    steps:  [
  {
    template: Template.tutorial_step1,
 
        spot: "#skitt-ui"
  },
  {
    template: Template.tutorial_step2,
   spot: ".list-group"
  }
],
    emitter: new EventEmitter(),
    onFinish: function() {tutorialEnabled.set(false); }
  }
});

Template.body.events({
  'click #help_bt'(event, template){
    tutorialEnabled.set(true);
  }
});