import { useState, useEffect } from 'react';

// ============================================================
// WORKOUT PROGRAM DATA (all 20 weeks embedded)
// ============================================================
const PHASES = [
  { weeks: [1,2,3,4], name: "Foundation", color: "#4ADE80", icon: "🌱" },
  { weeks: [5,6,7,8], name: "Build", color: "#FACC15", icon: "🔨" },
  { weeks: [9,10,11,12], name: "Strength", color: "#F97316", icon: "💪" },
  { weeks: [13,14,15,16], name: "Peak", color: "#EF4444", icon: "🔥" },
  { weeks: [17,18,19,20], name: "Performance", color: "#A78BFA", icon: "⚡" },
];

const SUBS = {
  "Rowing": "400m run or 3 min jump rope",
  "Assault Bike": "Burpees (1 cal = 1 burpee) or jump rope",
  "Box Jump": "Broad jump ×3 or tuck jump ×2",
};

const WEEKS_DATA = [
  // WEEK 1 - FOUNDATION
  { week:1, phase:"Foundation", days:[
    { day:1, title:"Baseline Benchmark", type:"Benchmark", warmup:"5 min jump rope, 10 air squats, 10 push-ups, 5 pull-ups",
      strength:"Back Squat: 5×5 @ 60% 1RM",
      wod:{ name:"Baseline WOD", type:"For Time", timeCap:20,
        description:"3 rounds:\n• 400m run (or 3 min jump rope)\n• 21 air squats\n• 15 push-ups\n• 9 pull-ups",
        scaling:"Ring rows instead of pull-ups; knee push-ups" }},
    { day:2, title:"Pressing + Core", type:"Strength + Metcon", warmup:"10 shoulder circles, 10 band pull-aparts, 5 push-up negatives",
      strength:"Strict Press: 5×5 @ moderate weight",
      wod:{ name:"Press It", type:"AMRAP 12", timeCap:12,
        description:"• 10 push press (65/45 lbs)\n• 10 sit-ups\n• 10 dumbbell rows (20 lbs each side)",
        scaling:"Reduce press weight; banded sit-ups" }},
    { day:3, title:"Pull + Hinge", type:"Skill + WOD", warmup:"5 dead hang, 5 scap pull-ups, 10 good mornings",
      strength:"Deadlift: 5×3 @ 70% 1RM",
      wod:{ name:"Pull Heavy", type:"For Time", timeCap:15,
        description:"21-15-9:\n• Deadlift (135/95 lbs)\n• Pull-ups",
        scaling:"Reduce weight; jumping pull-ups or ring rows" }},
    { day:4, title:"Cardio + Gymnastics", type:"Conditioning", warmup:"200m jog, 10 leg swings, 5 burpees",
      strength:null,
      wod:{ name:"Body Mover", type:"5 Rounds for Time", timeCap:25,
        description:"• 200m run (or 90s jump rope)\n• 10 burpees\n• 10 hollow rocks\n• 5 pull-ups",
        scaling:"Reduce to 3 rounds; ring rows" }},
    { day:5, title:"Full Body Friday", type:"WOD", warmup:"200m run, 10 air squats, 10 push-ups",
      strength:"Front Squat: 3×8 @ light-moderate",
      wod:{ name:"Friday Five", type:"For Time", timeCap:25,
        description:"5 rounds:\n• 10 front squats (75/55 lbs)\n• 10 push-ups\n• 10 dumbbell lunges (20 lbs)\n• 200m run",
        scaling:"Reduce weight; walking lunges unweighted" }},
  ]},
  // WEEK 2
  { week:2, phase:"Foundation", days:[
    { day:1, title:"Squat Focus", type:"Strength + Metcon", warmup:"2 min jump rope, 10 goblet squats",
      strength:"Back Squat: 5×5 @ 65% 1RM",
      wod:{ name:"Squat City", type:"AMRAP 15", timeCap:15,
        description:"• 10 back squats (75/55 lbs)\n• 10 broad jumps\n• 10 pull-ups",
        scaling:"Reduce weight; jumping pull-ups" }},
    { day:2, title:"Push Strength", type:"Strength + Metcon", warmup:"10 push-up variations, shoulder taps",
      strength:"Bench Press: 4×6 @ moderate",
      wod:{ name:"Push Ladder", type:"For Time", timeCap:15,
        description:"10-9-8-7-6-5-4-3-2-1:\n• Push press (75/55 lbs)\n• Burpees",
        scaling:"Scale weight; step-out burpees" }},
    { day:3, title:"Deadlift + Core", type:"Strength + Core", warmup:"Cat-cow ×10, good mornings ×10",
      strength:"Romanian Deadlift: 4×8 @ moderate",
      wod:{ name:"Hinge & Core", type:"3 Rounds for Time", timeCap:20,
        description:"• 12 deadlifts (115/75 lbs)\n• 20 sit-ups\n• 12 DB rows each side\n• 20 flutter kicks",
        scaling:"Reduce weight; banded sit-ups" }},
    { day:4, title:"Cardio Engine", type:"Conditioning", warmup:"400m jog + dynamic stretching",
      strength:null,
      wod:{ name:"Engine Builder", type:"EMOM 20", timeCap:20,
        description:"Odd min: 15 jump rope doubles (or 30 singles) + 5 burpees\nEven min: 10 DB thrusters (20 lbs) + 5 pull-ups",
        scaling:"Reduce reps; scale to singles" }},
    { day:5, title:"Chipper Friday", type:"WOD", warmup:"5 min general movement",
      strength:null,
      wod:{ name:"Week 2 Chipper", type:"For Time", timeCap:20,
        description:"50 air squats\n40 push-ups\n30 sit-ups\n20 pull-ups\n10 burpees\n400m run",
        scaling:"Reduce all reps by 50%; ring rows" }},
  ]},
  // WEEK 3
  { week:3, phase:"Foundation", days:[
    { day:1, title:"Overhead + Squat", type:"Skill + WOD", warmup:"Empty bar overhead squat 5×5",
      strength:"Overhead Squat: 5×3 (technique focus)",
      wod:{ name:"OHS Primer", type:"AMRAP 12", timeCap:12,
        description:"• 5 overhead squats (65/45 lbs)\n• 10 pull-ups\n• 15 sit-ups",
        scaling:"Reduce weight; jumping pull-ups" }},
    { day:2, title:"Clean Intro", type:"Skill + Metcon", warmup:"Hang clean practice with empty bar 3×5",
      strength:"Hang Power Clean: 5×3 (build technique)",
      wod:{ name:"Clean & Move", type:"4 Rounds for Time", timeCap:20,
        description:"• 5 hang power cleans (95/65 lbs)\n• 10 push-ups\n• 15 air squats\n• 200m run",
        scaling:"Reduce weight; 3 rounds" }},
    { day:3, title:"Pull Day", type:"Strength + Metcon", warmup:"Dead hangs, scap pulls",
      strength:"Weighted/Assisted Pull-ups: 5×3",
      wod:{ name:"Pull Complex", type:"For Time", timeCap:20,
        description:"3 rounds:\n• 10 pull-ups\n• 10 barbell rows (115/75 lbs)\n• 10 DB curls (20 lbs)\n• 400m run",
        scaling:"Ring rows; reduce weight" }},
    { day:4, title:"Legs + Lungs", type:"Conditioning", warmup:"400m run, leg swings",
      strength:null,
      wod:{ name:"Legwork", type:"5 Rounds for Time", timeCap:30,
        description:"• 400m run (or 3 min jump rope)\n• 20 walking lunges\n• 10 broad jumps\n• 10 DB goblet squats (35 lbs)",
        scaling:"3 rounds; reduce weight" }},
    { day:5, title:"Cindy Benchmark", type:"Benchmark", warmup:"10 min thorough warm-up",
      strength:null,
      wod:{ name:"Cindy", type:"AMRAP 20", timeCap:20,
        description:"• 5 pull-ups\n• 10 push-ups\n• 15 air squats\nRepeat as many rounds as possible",
        scaling:"Ring rows; knee push-ups" }},
  ]},
  // WEEK 4 - DELOAD
  { week:4, phase:"Foundation – Deload", days:[
    { day:1, title:"Deload Squat", type:"Deload", warmup:"10 min easy movement",
      strength:"Back Squat: 3×5 @ 50%",
      wod:{ name:"Easy Monday", type:"AMRAP 10", timeCap:10,
        description:"• 10 goblet squats (light)\n• 10 push-ups\n• 10 sit-ups",
        scaling:"Keep it very easy – recovery week" }},
    { day:2, title:"Deload Press", type:"Deload", warmup:"Shoulder mobility focus",
      strength:"Strict Press: 3×5 @ 50%",
      wod:{ name:"Light Press Day", type:"3 Rounds Easy", timeCap:15,
        description:"• 10 push press (light)\n• 10 DB lateral raises\n• 10 band pull-aparts",
        scaling:"Very light – active recovery" }},
    { day:3, title:"Deload Pull", type:"Deload", warmup:"Dead hangs, light movements",
      strength:"Deadlift: 3×3 @ 50%",
      wod:{ name:"Active Recovery", type:"For Quality", timeCap:20,
        description:"4 rounds:\n• 5 pull-ups (perfect form)\n• 10 ring/barbell rows (light)\n• 20 hollow rocks",
        scaling:"Focus on movement quality" }},
    { day:4, title:"Mobility Day", type:"Mobility", warmup:null,
      strength:null,
      wod:{ name:"Full Mobility Flow", type:"For Quality", timeCap:30,
        description:"30 min circuit:\n• Hip 90/90 2×60s each side\n• Pigeon pose 2×60s\n• Thoracic extensions 2×10\n• Shoulder CARs 2×5\n• Squat therapy 5 min",
        scaling:"Listen to body" }},
    { day:5, title:"Phase 1 Test – Fran", type:"Benchmark", warmup:"10 min",
      strength:"Back Squat: 1×5 heavy (test PR)",
      wod:{ name:"Fran", type:"For Time", timeCap:10,
        description:"21-15-9:\n• Thrusters (95/65 lbs)\n• Pull-ups",
        scaling:"Reduce weight; ring rows or jumping pull-ups" }},
  ]},
  // WEEK 5 - BUILD
  { week:5, phase:"Build", days:[
    { day:1, title:"Back Squat Strength", type:"Strength + Metcon", warmup:"10 min squat mobility",
      strength:"Back Squat: 5×3 @ 75%",
      wod:{ name:"Squat & Sprint", type:"AMRAP 15", timeCap:15,
        description:"• 5 back squats (95/65 lbs)\n• 10 burpees\n• 15 sit-ups\n• 400m run",
        scaling:"Reduce weight" }},
    { day:2, title:"Snatch Intro", type:"Skill", warmup:"Empty bar OHS + snatch grip deadlift",
      strength:"Hang Power Snatch: 5×3 (technique)",
      wod:{ name:"Snatch Complex", type:"EMOM 10 + 3 Rounds", timeCap:20,
        description:"EMOM 10 min: 3 hang power snatches (build weight)\nThen: 3 rounds of 10 pull-ups + 200m run",
        scaling:"Very light; focus on form" }},
    { day:3, title:"Deadlift Heavy", type:"Strength + Metcon", warmup:"Hip hinge warm-up",
      strength:"Deadlift: 5×3 @ 80%",
      wod:{ name:"Heavy Pull", type:"5 Rounds for Time", timeCap:20,
        description:"• 5 deadlifts (185/125 lbs)\n• 10 hanging knee raises\n• 15 push-ups",
        scaling:"Reduce weight; modify push-ups" }},
    { day:4, title:"Helen", type:"Classic WOD", warmup:"200m jog + dynamic",
      strength:null,
      wod:{ name:"Helen", type:"3 Rounds for Time", timeCap:20,
        description:"• 400m run (or 3 min jump rope)\n• 21 DB swings (35 lbs)\n• 12 pull-ups",
        scaling:"Reduce weight; ring rows" }},
    { day:5, title:"Power Friday", type:"WOD", warmup:"General movement",
      strength:"Push Jerk: 4×4 (learn technique)",
      wod:{ name:"Push & Grunt", type:"4 Rounds for Time", timeCap:25,
        description:"• 8 push jerks (95/65 lbs)\n• 12 pull-ups\n• 16 DB lunges (20 lbs)\n• 200m run",
        scaling:"Reduce weight; ring rows" }},
  ]},
  // WEEK 6
  { week:6, phase:"Build", days:[
    { day:1, title:"Front Squat Power", type:"Strength + Metcon", warmup:"Front rack mobility",
      strength:"Front Squat: 5×3 @ 75%",
      wod:{ name:"Front & Center", type:"AMRAP 14", timeCap:14,
        description:"• 7 front squats (95/65 lbs)\n• 7 pull-ups\n• 7 burpees",
        scaling:"Reduce weight and reps" }},
    { day:2, title:"Push Complex", type:"Strength + WOD", warmup:"Shoulder sequence",
      strength:"Strict Press 3×5, Push Press 3×5",
      wod:{ name:"Pressing Matters", type:"3 Rounds for Time", timeCap:20,
        description:"• 10 strict press (65/45 lbs)\n• 10 push press\n• 10 push jerk\n• 10 pull-ups",
        scaling:"Reduce weight; ring rows" }},
    { day:3, title:"Grace", type:"Classic WOD", warmup:"Barbell cycling warm-up",
      strength:"Clean & Jerk: work to 75% ×3",
      wod:{ name:"Grace", type:"For Time", timeCap:10,
        description:"30 clean & jerks for time (135/95 lbs)",
        scaling:"Reduce to 95/65 lbs; break into manageable sets" }},
    { day:4, title:"Cardio Pyramid", type:"Conditioning", warmup:"400m jog",
      strength:null,
      wod:{ name:"Cardio Pyramid", type:"For Time", timeCap:30,
        description:"Run 400m → 30 burpees\nRun 400m → 20 burpees\nRun 400m → 10 burpees\nRun 400m\n(Sub: 3 min jump rope per 400m)",
        scaling:"Reduce burpee count" }},
    { day:5, title:"Build Chipper", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Build Chipper", type:"For Time", timeCap:25,
        description:"Buy-in: 400m run\n40 pull-ups / 40 push-ups / 40 sit-ups\n40 air squats / 40 DB swings (35 lbs)\nBuy-out: 400m run",
        scaling:"Reduce to 25 reps each" }},
  ]},
  // WEEK 7
  { week:7, phase:"Build", days:[
    { day:1, title:"Back Squat 3RM", type:"Strength Test", warmup:"Thorough squat warm-up",
      strength:"Back Squat: Work to 3RM",
      wod:{ name:"Annie", type:"For Time", timeCap:15,
        description:"50-40-30-20-10:\n• Double-unders (or 2× singles)\n• Sit-ups",
        scaling:"Singles; reduce reps" }},
    { day:2, title:"Isabel", type:"Classic WOD", warmup:"Power snatch progression",
      strength:"Power Clean: Work to daily heavy single",
      wod:{ name:"Isabel", type:"For Time", timeCap:10,
        description:"30 snatches for time (135/95 lbs)\n(Sub: power snatch or hang power snatch)",
        scaling:"95/65 lbs; reduce to 20 reps" }},
    { day:3, title:"Deadlift 5RM + Death by Pull-ups", type:"Strength + WOD", warmup:"Hip hinge + pull",
      strength:"Deadlift: Work to 5RM",
      wod:{ name:"Death by Pull-ups", type:"EMOM Until Failure", timeCap:20,
        description:"Minute 1: 1 pull-up\nMinute 2: 2 pull-ups\n...continue until you can't complete the required reps",
        scaling:"Ring rows; start at 1" }},
    { day:4, title:"Cindy Retest", type:"Benchmark", warmup:"10 min",
      strength:null,
      wod:{ name:"Cindy Retest", type:"AMRAP 20", timeCap:20,
        description:"• 5 pull-ups\n• 10 push-ups\n• 15 air squats\n(Compare to Week 3!)",
        scaling:"Ring rows; knee push-ups" }},
    { day:5, title:"Big Chipper", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Partner/Solo Chipper", type:"For Time", timeCap:30,
        description:"100 DB thrusters (20 lbs)\n80 pull-ups\n60 burpees\n40 DB cleans (20 lbs)\n20 DB snatches (35 lbs)",
        scaling:"Reduce all by 50%" }},
  ]},
  // WEEK 8 - DELOAD
  { week:8, phase:"Build – Deload", days:[
    { day:1, title:"Deload Squat", type:"Deload", warmup:"Mobility focus",
      strength:"Back Squat: 3×5 @ 60%",
      wod:{ name:"Light Monday", type:"3 Rounds Easy", timeCap:15,
        description:"3 rounds easy:\n• 10 goblet squats\n• 10 push-ups\n• 10 ring rows\n• 200m jog",
        scaling:"Keep very light" }},
    { day:2, title:"Skill Work", type:"Technique", warmup:null,
      strength:"Snatch technique: 5×3 @ 50%",
      wod:{ name:"Skill Session", type:"For Quality", timeCap:30,
        description:"Practice:\n• Kipping swing 3×10\n• Double-under practice 5×30s\n• Handstand practice\n• Toes-to-bar practice",
        scaling:"Focus on weaknesses" }},
    { day:3, title:"Active Recovery", type:"Deload", warmup:null,
      strength:"Deadlift: 3×3 @ 60%",
      wod:{ name:"Recovery Flow", type:"Easy 20 min", timeCap:20,
        description:"5 min jump rope + 50 air squats + 30 push-ups + 20 pull-ups\n(All at easy pace)",
        scaling:"Easy pace only" }},
    { day:4, title:"Yoga / Mobility", type:"Mobility", warmup:null,
      strength:null,
      wod:{ name:"CrossFit Yoga", type:"For Quality", timeCap:30,
        description:"30 min:\n• Sun salutations ×5\n• Warrior sequence\n• Pigeon pose deep holds\n• Spinal twists\n• Shoulder openers",
        scaling:"N/A" }},
    { day:5, title:"Fran Retest", type:"Benchmark", warmup:"10 min",
      strength:"Push Press: 1×3 heavy",
      wod:{ name:"Fran Retest", type:"For Time", timeCap:10,
        description:"21-15-9:\n• Thrusters (95/65 lbs)\n• Pull-ups\n(Compare to Week 4!)",
        scaling:"Reduce weight; ring rows" }},
  ]},
  // WEEK 9 - STRENGTH
  { week:9, phase:"Strength", days:[
    { day:1, title:"Heavy Squat", type:"Strength Focus", warmup:"15 min squat prep",
      strength:"Back Squat: 5×3 @ 80%",
      wod:{ name:"Squat Storm", type:"3 Rounds for Time", timeCap:20,
        description:"• 10 back squats (115/75 lbs)\n• 15 pull-ups\n• 20 burpees",
        scaling:"Reduce weight; scale pull-ups" }},
    { day:2, title:"Randy", type:"Classic WOD", warmup:"Full barbell warm-up",
      strength:"Clean & Jerk: Work to 85% 1RM",
      wod:{ name:"Randy", type:"For Time", timeCap:15,
        description:"75 power snatches (75/55 lbs)",
        scaling:"55/35 lbs; reduce to 50 reps" }},
    { day:3, title:"DT", type:"Classic WOD", warmup:"Hip hinge prep",
      strength:"Deadlift: 5×2 @ 85%",
      wod:{ name:"DT", type:"5 Rounds for Time", timeCap:20,
        description:"• 12 deadlifts (155/105 lbs)\n• 9 hang power cleans\n• 6 push jerks",
        scaling:"Reduce weight significantly" }},
    { day:4, title:"Gymnastics + Weighted Pull-ups", type:"Gymnastics", warmup:"Pull-up warm-up",
      strength:"Weighted pull-ups: 5×3",
      wod:{ name:"Pullathon", type:"AMRAP 15", timeCap:15,
        description:"• 10 pull-ups\n• 10 dips (use bar)\n• 10 hanging leg raises\n• 200m run",
        scaling:"Ring rows; bench dips" }},
    { day:5, title:"Murph (shortened)", type:"Hero WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Murph (Half)", type:"For Time", timeCap:40,
        description:"800m run\n50 pull-ups\n100 push-ups\n150 air squats\n800m run\n(Partition any way)",
        scaling:"Full Murph: add 2nd mile; half Murph shown" }},
  ]},
  // WEEK 10
  { week:10, phase:"Strength", days:[
    { day:1, title:"Front Squat 3RM", type:"Strength", warmup:"Front rack mobility",
      strength:"Front Squat: Work to 3RM",
      wod:{ name:"Nasty Girls", type:"3 Rounds for Time", timeCap:20,
        description:"• 50 air squats\n• 7 muscle-ups (sub: 14 pull-ups + 14 dips)\n• 10 hang power cleans (135/95 lbs)",
        scaling:"Reduce weight; jumping pull-ups" }},
    { day:2, title:"Overhead Strength", type:"Strength", warmup:"Shoulder mobility",
      strength:"Push Press: 5×3 heavy\nStrict Press: 3×5 moderate",
      wod:{ name:"Overhead EMOM", type:"EMOM 15", timeCap:15,
        description:"Min 1: 5 push press (heavy)\nMin 2: 10 push-ups\nMin 3: 10 DB push press (20 lbs)",
        scaling:"Reduce weight" }},
    { day:3, title:"Barbell Complex", type:"Olympic + Metcon", warmup:"Full barbell warm-up",
      strength:"Complex: 5 rounds (power clean + front squat + push jerk)",
      wod:{ name:"Isabel + Karen Hybrid", type:"For Time", timeCap:15,
        description:"15 snatches (95/65 lbs)\n50 DB thrusters (20 lbs)\n15 snatches",
        scaling:"Reduce weight; 10 snatches" }},
    { day:4, title:"Core Stamina", type:"Core + Metcon", warmup:"Core activation",
      strength:null,
      wod:{ name:"Core Circuit", type:"5 Rounds for Time", timeCap:30,
        description:"• 20 sit-ups\n• 15 hollow rocks\n• 10 v-ups\n• 5 toes-to-bar\n• 400m run",
        scaling:"Reduce reps; mod toes-to-bar" }},
    { day:5, title:"CrossFit Total", type:"Strength Test", warmup:"Full warm-up",
      strength:"CF Total:\n• Max Back Squat (3 attempts)\n• Max Press (3 attempts)\n• Max Deadlift (3 attempts)",
      wod:{ name:"Post-Total Finisher", type:"AMRAP 10", timeCap:10,
        description:"• 5 burpees\n• 10 air squats\n• 15 sit-ups\n(Easy finisher after heavy lifting)",
        scaling:"Easy finisher" }},
  ]},
  // WEEK 11
  { week:11, phase:"Strength", days:[
    { day:1, title:"Squat 4×4 @ 85%", type:"Strength", warmup:"Squat mobility",
      strength:"Back Squat: 4×4 @ 85%",
      wod:{ name:"Heavy Tuesday", type:"4 Rounds for Time", timeCap:20,
        description:"• 8 back squats (115/75 lbs)\n• 8 burpee pull-ups\n• 200m run",
        scaling:"Reduce weight" }},
    { day:2, title:"Power Snatch", type:"Olympic", warmup:"Snatch progression",
      strength:"Power Snatch: Work to 80% 1RM",
      wod:{ name:"Sprint Snatch", type:"EMOM 12", timeCap:12,
        description:"Odd min: 3 power snatches (heavy)\nEven min: 8 burpees",
        scaling:"Reduce weight" }},
    { day:3, title:"Deadlift 3×5 @ 80%", type:"Strength", warmup:"Hip hinge",
      strength:"Deadlift: 3×5 @ 80%",
      wod:{ name:"Back Attack", type:"3 Rounds for Time", timeCap:20,
        description:"• 15 deadlifts (135/95 lbs)\n• 12 pull-ups\n• 9 push-ups\n• 6 DB rows (35 lbs each)",
        scaling:"Reduce weight" }},
    { day:4, title:"Jackie", type:"Classic WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Jackie", type:"For Time", timeCap:20,
        description:"1000m run (or 7 min jump rope)\n50 barbell thrusters (45 lbs)\n30 pull-ups",
        scaling:"Reduce run; 35 lb bar; ring rows" }},
    { day:5, title:"The Seven", type:"Hero WOD", warmup:"10 min",
      strength:"Push Jerk: Work to 1RM",
      wod:{ name:"The Seven", type:"7 Rounds for Time", timeCap:40,
        description:"• 7 handstand push-ups (sub: pike push-ups)\n• 7 thrusters (135/95 lbs)\n• 7 knees-to-elbows\n• 7 deadlifts (245/165 lbs)\n• 7 burpees\n• 7 DB swings (35 lbs)\n• 7 pull-ups",
        scaling:"Reduce all weights significantly" }},
  ]},
  // WEEK 12 - DELOAD
  { week:12, phase:"Strength – Deload", days:[
    { day:1, title:"Deload", type:"Deload", warmup:"Mobility",
      strength:"Back Squat: 3×3 @ 65%",
      wod:{ name:"Easy Wednesday", type:"Easy 15 min", timeCap:15,
        description:"3 rounds:\n• 10 goblet squats\n• 10 push-ups\n• 5 pull-ups",
        scaling:"Light/easy" }},
    { day:2, title:"Skill Work", type:"Technique", warmup:null,
      strength:"Clean & Jerk: 5×2 @ 60% technique",
      wod:{ name:"Technique Day", type:"For Quality", timeCap:30,
        description:"Skill stations:\n• Double-under practice\n• Handstand holds\n• Kipping pull-up review\n• Toes-to-bar practice",
        scaling:"Focus on form" }},
    { day:3, title:"Flush It Out", type:"Deload", warmup:null,
      strength:"Deadlift: 3×2 @ 65%",
      wod:{ name:"Flush It Out", type:"Easy 20 min", timeCap:20,
        description:"800m easy run + 3 rounds of:\n• 10 pull-ups\n• 20 push-ups\n• 30 sit-ups\n(All at easy pace)",
        scaling:"Easy pace" }},
    { day:4, title:"Mobility", type:"Mobility", warmup:null,
      strength:null,
      wod:{ name:"Deep Mobility", type:"For Quality", timeCap:35,
        description:"35 min deep mobility: hips, thoracic spine, shoulders",
        scaling:"N/A" }},
    { day:5, title:"Elizabeth", type:"Benchmark", warmup:"10 min",
      strength:"Back Squat: New 1RM attempt",
      wod:{ name:"Elizabeth", type:"For Time", timeCap:12,
        description:"21-15-9:\n• Power cleans (135/95 lbs)\n• Ring dips (sub: bar dips or push-ups)",
        scaling:"Reduce weight; push-up substitution" }},
  ]},
  // WEEK 13 - PEAK
  { week:13, phase:"Peak", days:[
    { day:1, title:"Squat 1RM", type:"Strength Max", warmup:"Full squat prep",
      strength:"Back Squat: New 1RM attempt",
      wod:{ name:"Madman Squats", type:"5 Rounds for Time", timeCap:20,
        description:"• 3 back squats (85% 1RM)\n• 10 burpee pull-ups\n• 200m sprint",
        scaling:"Reduce weight; scale pull-ups" }},
    { day:2, title:"Clean & Jerk 1RM", type:"Olympic", warmup:"Full barbell warm-up",
      strength:"Clean & Jerk: 1RM attempt",
      wod:{ name:"Barbell Cycling", type:"AMRAP 10", timeCap:10,
        description:"• 3 power cleans (135/95 lbs)\n• 3 shoulder to overhead\n• 6 pull-ups",
        scaling:"Reduce weight" }},
    { day:3, title:"Deadlift 1RM", type:"Strength Max", warmup:"Hip prep",
      strength:"Deadlift: New 1RM attempt",
      wod:{ name:"Linda", type:"10-9-8-7-6-5-4-3-2-1", timeCap:30,
        description:"• Deadlifts (1.5× bodyweight)\n• Bench press (bodyweight)\n• Power cleans (0.75× bodyweight)\n(Scale weights appropriately)",
        scaling:"Scale all weights to manageable" }},
    { day:4, title:"Tabata Everything", type:"Conditioning", warmup:"400m jog",
      strength:null,
      wod:{ name:"Tabata Everything", type:"Tabata (8 rounds each)", timeCap:35,
        description:"Tabata (20s on/10s off ×8) per movement:\n1. Pull-ups → 2. Push-ups\n3. Sit-ups → 4. Air squats\n(1 min rest between movements)",
        scaling:"Modify movements" }},
    { day:5, title:"Nate", type:"Hero WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Nate", type:"AMRAP 20", timeCap:20,
        description:"• 2 muscle-ups (sub: 4 pull-ups + 4 dips)\n• 4 handstand push-ups (sub: pike push-ups)\n• 8 DB swings (35 lbs)",
        scaling:"Pull-ups + dips substitution" }},
  ]},
  // WEEK 14
  { week:14, phase:"Peak", days:[
    { day:1, title:"Filthy Fifty", type:"Classic WOD", warmup:"10 min general",
      strength:"Back Squat: 3×2 @ 90%",
      wod:{ name:"Filthy Fifty", type:"For Time", timeCap:35,
        description:"50 broad jumps / 50 jumping pull-ups / 50 DB swings (35 lbs)\n50 walking lunges / 50 knees-to-elbows\n50 push press (45 lbs) / 50 back extensions\n50 DB thrusters / 50 burpees / 50 jump rope doubles",
        scaling:"Reduce to 30 reps each" }},
    { day:2, title:"Snatch 1RM", type:"Olympic", warmup:"Snatch progression",
      strength:"Snatch: Work to 1RM",
      wod:{ name:"Randy Retest", type:"For Time", timeCap:15,
        description:"75 power snatches (75/55 lbs)\n(Compare to Week 9!)",
        scaling:"55/35 lbs; 50 reps" }},
    { day:3, title:"Bear Complex", type:"Barbell", warmup:"Full barbell",
      strength:"Deadlift: 3×2 @ 88%",
      wod:{ name:"The Bear Complex", type:"5 Rounds", timeCap:25,
        description:"7 sets (no rest): power clean → front squat → push press → back squat → push press\n(Increase weight each round; no bar drop within set)",
        scaling:"Reduce starting weight" }},
    { day:4, title:"Peak Chipper", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Peak Chipper", type:"For Time", timeCap:40,
        description:"1000m run\n50 pull-ups / 75 push-ups / 100 sit-ups\n75 air squats / 50 DB snatches (35 lbs)\n1000m run",
        scaling:"Reduce all reps by 40%" }},
    { day:5, title:"Death by Thrusters", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Death by Thrusters + Cindy", type:"EMOM Until Failure + AMRAP", timeCap:25,
        description:"EMOM: Min 1 = 1 thruster (95/65 lbs), Min 2 = 2, etc until failure\nThen: max rounds of Cindy in remaining time",
        scaling:"75/45 lbs" }},
  ]},
  // WEEK 15
  { week:15, phase:"Peak", days:[
    { day:1, title:"Squat Volume", type:"Strength", warmup:"10 min squat",
      strength:"Back Squat: 5×1 @ 95% (singles)",
      wod:{ name:"50 Squats for Time", type:"For Time", timeCap:15,
        description:"50 back squats (95/65 lbs) for time\nPartition however you want",
        scaling:"Reduce weight" }},
    { day:2, title:"Open 21.1 Style", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Open Style WOD", type:"AMRAP 15", timeCap:15,
        description:"• 3 wall walks (sub: 5 pike push-ups + 5 inchworms)\n• 6 DB snatches (50/35 lbs)\nIncrease snatches by 6 each round, wall walks +3",
        scaling:"Reduce weight; fewer reps" }},
    { day:3, title:"Clean & Jerk @ 90%+", type:"Strength", warmup:"Full barbell",
      strength:"Clean & Jerk: 5 singles @ 90%+",
      wod:{ name:"Barbell Sprint", type:"3 Rounds for Time", timeCap:15,
        description:"• 7 clean & jerks (115/75 lbs)\n• 7 toes-to-bar\n• 200m sprint",
        scaling:"Reduce weight" }},
    { day:4, title:"Gymnastics Peak", type:"Gymnastics", warmup:"Pull-up + shoulder",
      strength:"Weighted pull-ups: 5×1 (max)",
      wod:{ name:"Gymnastics Circuit", type:"4 Rounds for Time", timeCap:25,
        description:"• 15 pull-ups\n• 15 pike push-ups\n• 15 dips (bar/bench)\n• 15 hollow rocks\n• Rest 1 min",
        scaling:"Ring rows; scale reps" }},
    { day:5, title:"Diane", type:"Classic WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Diane", type:"For Time", timeCap:10,
        description:"21-15-9:\n• Deadlifts (225/155 lbs)\n• Handstand push-ups (sub: pike push-ups)",
        scaling:"Reduce weight; pike HSPU" }},
  ]},
  // WEEK 16 - DELOAD
  { week:16, phase:"Peak – Deload", days:[
    { day:1, title:"Easy Cindy", type:"Deload", warmup:"Mobility",
      strength:"Back Squat: 3×3 @ 60%",
      wod:{ name:"Easy Cindy", type:"AMRAP 12", timeCap:12,
        description:"• 5 pull-ups\n• 10 push-ups\n• 15 air squats\n(Easy pace)",
        scaling:"Keep easy" }},
    { day:2, title:"Olympic Review", type:"Technique", warmup:null,
      strength:"C&J + Snatch: 3×3 @ 60% technique",
      wod:{ name:"Skill Practice", type:"For Quality", timeCap:30,
        description:"30 min skill work on weaknesses from past 15 weeks",
        scaling:"N/A" }},
    { day:3, title:"Light & Fast", type:"Deload", warmup:null,
      strength:null,
      wod:{ name:"Light & Fast", type:"3 Rounds for Time", timeCap:15,
        description:"• 200m run\n• 10 light thrusters\n• 10 pull-ups\n(Fast but light)",
        scaling:"Very light" }},
    { day:4, title:"Mobility", type:"Mobility", warmup:null,
      strength:null,
      wod:{ name:"Recovery Yoga", type:"For Quality", timeCap:35,
        description:"35 min full body mobility flow",
        scaling:"N/A" }},
    { day:5, title:"Mary", type:"Classic WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Mary", type:"AMRAP 20", timeCap:20,
        description:"• 5 handstand push-ups (sub: pike push-ups)\n• 10 pistols (sub: single-leg squats/lunges)\n• 15 pull-ups",
        scaling:"Scale all movements" }},
  ]},
  // WEEK 17 - PERFORMANCE
  { week:17, phase:"Performance", days:[
    { day:1, title:"Back Squat New PR", type:"Strength Max", warmup:"Full prep",
      strength:"Back Squat: New 1RM PR attempt",
      wod:{ name:"Speed Squats", type:"EMOM 10", timeCap:10,
        description:"Every 2 min: 3 back squats @ 70% (fast and explosive)",
        scaling:"Reduce weight" }},
    { day:2, title:"Olympic PRs", type:"Olympic Max", warmup:"Full barbell warm-up",
      strength:"Clean & Jerk: New 1RM PR\nSnatch: New 1RM PR",
      wod:{ name:"Olympic Finisher", type:"AMRAP 8", timeCap:8,
        description:"• 3 power cleans (light)\n• 3 push jerks\n• 6 pull-ups",
        scaling:"Reduce weight" }},
    { day:3, title:"Deadlift New PR", type:"Strength Max", warmup:"Hip prep",
      strength:"Deadlift: New 1RM PR attempt",
      wod:{ name:"Post-PR WOD", type:"For Time", timeCap:15,
        description:"21-15-9:\n• Deadlifts (185/125 lbs)\n• Burpees",
        scaling:"Reduce weight" }},
    { day:4, title:"Full Send WOD", type:"Competition", warmup:"10 min race prep",
      strength:null,
      wod:{ name:"Full Send", type:"For Time", timeCap:30,
        description:"800m run\n40 DB snatches (50/35 lbs)\n30 pull-ups\n20 pike push-ups\n10 thrusters (135/95 lbs)\n800m run",
        scaling:"Reduce weights/reps" }},
    { day:5, title:"Josh", type:"Classic WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Josh", type:"For Time", timeCap:15,
        description:"21-15-9:\n• Overhead squats (95/65 lbs)\n• Pull-ups",
        scaling:"Reduce weight; ring rows" }},
  ]},
  // WEEK 18
  { week:18, phase:"Performance", days:[
    { day:1, title:"Press 1RM + Fran Final", type:"Benchmark", warmup:"10 min",
      strength:"Press: New 1RM",
      wod:{ name:"Fran FINAL", type:"For Time", timeCap:10,
        description:"21-15-9:\n• Thrusters (95/65 lbs)\n• Pull-ups\n🏆 Compare to Weeks 4, 8, 18!",
        scaling:"Scale as needed" }},
    { day:2, title:"Open Sim 1", type:"Competition", warmup:"10 min race prep",
      strength:null,
      wod:{ name:"Open Simulation 1", type:"For Time (12 min cap)", timeCap:12,
        description:"10 rounds:\n• 3 thrusters (95/65 lbs)\n• 3 chest-to-bar pull-ups\n• 3 bar-facing burpees",
        scaling:"Scale weight; standard pull-ups" }},
    { day:3, title:"Open Sim 2", type:"Competition", warmup:"10 min",
      strength:null,
      wod:{ name:"Open Simulation 2", type:"AMRAP 20", timeCap:20,
        description:"• 5 pull-ups\n• 10 push-ups\n• 15 air squats\n• 20 sit-ups\n(Extended Cindy variant)",
        scaling:"Scale movements" }},
    { day:4, title:"Performance Chipper", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Performance Chipper", type:"For Time", timeCap:30,
        description:"30 deadlifts (185/125 lbs)\n30 pull-ups\n30 thrusters (95/65 lbs)\n30 burpees\n30 clean & jerks (95/65 lbs)",
        scaling:"Reduce to 20 reps; lower weights" }},
    { day:5, title:"Full Murph", type:"Hero WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Full Murph", type:"For Time", timeCap:60,
        description:"1 mile run\n100 pull-ups\n200 push-ups\n300 air squats\n1 mile run\n(Partition as needed; vest optional)",
        scaling:"Half Murph or modify" }},
  ]},
  // WEEK 19 - TAPER
  { week:19, phase:"Performance – Taper", days:[
    { day:1, title:"Helen Final", type:"Benchmark", warmup:"10 min",
      strength:"Back Squat: 3×3 @ 75%",
      wod:{ name:"Helen FINAL", type:"3 Rounds for Time", timeCap:20,
        description:"• 400m run\n• 21 DB swings (35 lbs)\n• 12 pull-ups\n🏆 Compare to Week 5!",
        scaling:"Scale as needed" }},
    { day:2, title:"Speed Day", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Speed Day", type:"5 Rounds for Time", timeCap:15,
        description:"• 5 power cleans (135/95 lbs)\n• 10 pull-ups\n• 15 broad jumps\n(Sprint pace)",
        scaling:"Reduce weight" }},
    { day:3, title:"Wednesday Grind", type:"WOD", warmup:"10 min",
      strength:"Deadlift: 3×2 @ 80%",
      wod:{ name:"Wednesday Grind", type:"AMRAP 12", timeCap:12,
        description:"• 3 deadlifts (205/135 lbs)\n• 6 hang power cleans\n• 9 pull-ups",
        scaling:"Reduce weight" }},
    { day:4, title:"Quick Fire", type:"WOD", warmup:"10 min",
      strength:null,
      wod:{ name:"Quick Fire", type:"4 Rounds for Time", timeCap:15,
        description:"• 7 thrusters (95/65 lbs)\n• 7 pull-ups\n• 200m run",
        scaling:"Reduce weight" }},
    { day:5, title:"Annie Final", type:"Benchmark", warmup:"10 min",
      strength:null,
      wod:{ name:"Annie FINAL", type:"For Time", timeCap:15,
        description:"50-40-30-20-10:\n• Double-unders (or 2× singles)\n• Sit-ups\n🏆 Compare to Week 7!",
        scaling:"Singles; reduce reps" }},
  ]},
  // WEEK 20 - FINAL
  { week:20, phase:"Performance – Final Week 🏆", days:[
    { day:1, title:"CrossFit Total – FINAL", type:"Strength Max", warmup:"Full 15 min",
      strength:"FINAL CF TOTAL:\n• Back Squat 1RM\n• Deadlift 1RM\n• Press 1RM\n🏆 Compare to Week 10!",
      wod:{ name:"Cindy Celebration", type:"AMRAP 10", timeCap:10,
        description:"• 5 pull-ups\n• 10 push-ups\n• 15 air squats\n(Easy celebration round)",
        scaling:"Easy pace" }},
    { day:2, title:"Olympic Final PRs", type:"Olympic Max", warmup:"Full barbell warm-up",
      strength:"Clean & Jerk: FINAL 1RM PR\nSnatch: FINAL 1RM PR",
      wod:{ name:"Grace FINAL", type:"For Time", timeCap:10,
        description:"30 clean & jerks (135/95 lbs)\n🏆 Compare to Week 6!",
        scaling:"Scale weight" }},
    { day:3, title:"Fran FINAL FINAL", type:"Benchmark", warmup:"10 min",
      strength:null,
      wod:{ name:"Fran – FINAL ATTEMPT", type:"For Time", timeCap:10,
        description:"21-15-9:\n• Thrusters (95/65 lbs)\n• Pull-ups\n🏆 Your BEST EVER Fran – compare to Weeks 4, 8, 18!",
        scaling:"Scale as needed" }},
    { day:4, title:"20-Week Celebration WOD", type:"Celebration", warmup:"10 min",
      strength:null,
      wod:{ name:"20 Week Celebration", type:"For Time", timeCap:20,
        description:"20 rounds of:\n• 5 pull-ups\n• 5 push-ups\n• 5 air squats\n\n🎉 One round per week – YOU DID IT!",
        scaling:"Steady pace – enjoy every round!" }},
    { day:5, title:"FINAL DAY – Baseline Retest", type:"Benchmark", warmup:"15 min",
      strength:null,
      wod:{ name:"BASELINE RETEST", type:"For Time", timeCap:20,
        description:"3 rounds:\n• 400m run\n• 21 air squats\n• 15 push-ups\n• 9 pull-ups\n\n🏆 THE SAME WOD AS WEEK 1, DAY 1\nSee exactly how far you've come!",
        scaling:"RX — you've earned it!" }},
  ]},
];

// ============================================================
// STORAGE HELPERS
// ============================================================
const STORAGE_KEYS = {
  logs: "cf_workout_logs_v2",
  aiChats: "cf_ai_chats_v2",
};

// localStorage helpers
const lsGet = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
const lsSet = (key, val) => { try { localStorage.setItem(key, val); } catch {} };

// ============================================================
// PHASE / WEEK HELPERS
// ============================================================
const getPhaseForWeek = (w) => PHASES.find(p => p.weeks.includes(w)) || PHASES[0];
const getDayName = (d) => ["Mon","Tue","Wed","Thu","Fri"][d-1] || `Day ${d}`;

// ============================================================
// ICONS (SVG inline)
// ============================================================
const Icon = ({ name, size=20, color="currentColor" }) => {
  const icons = {
    barbell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="10" width="4" height="4" rx="1"/><rect x="18" y="10" width="4" height="4" rx="1"/><rect x="4" y="9" width="3" height="6" rx="1"/><rect x="17" y="9" width="3" height="6" rx="1"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M9.5 2C8.1 2 7 3.1 7 4.5c0 .4.1.8.3 1.1C6.2 6.2 5 7.6 5 9.3c0 .9.3 1.8.9 2.4C5.3 12.5 5 13.6 5 14.7 5 17.1 7 19 9.3 19c.6 0 1.1-.1 1.7-.3V22h4v-3.3c.6.2 1.1.3 1.7.3 2.3 0 4.3-1.9 4.3-4.3 0-1.1-.3-2.2-.9-3 .6-.6.9-1.5.9-2.4 0-1.7-1.2-3.1-2.3-3.7.2-.3.3-.7.3-1.1C19 3.1 17.9 2 16.5 2c-.8 0-1.5.4-2 .9C14 2.3 13.1 2 12 2s-2 .3-2.5.9C9 2.4 8.3 2 7.5 2"/></svg>,
    timer: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 14 15"/><line x1="9" y1="1" x2="15" y2="1"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="8 21 12 17 16 21"/><path d="M5 3H3a2 2 0 0 0-2 2v2a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2h-2"/><rect x="8" y="17" width="8" height="1"/><path d="M5 3h14"/></svg>,
    fire: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17h2a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 0-2.5-2.5h-1A2.5 2.5 0 0 0 7 7v2a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 1 12 14"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  };
  return icons[name] || null;
};

// ============================================================
// MAIN APP
// ============================================================

// ============================================================
// SUB-COMPONENTS (defined outside App for stable identity = no focus loss)
// ============================================================

function HomeView({ logs, currentWeek, completedWorkouts, skippedWorkouts, totalWorkouts, setSelectedWeek, setSelectedDay, setTab, getPhaseForWeek, getDayName, logKey, Icon }) {
  const streak = (() => {
    let s = 0;
    const keys = Object.keys(logs).sort().reverse();
    for (const k of keys) {
      if (logs[k]?.completed) s++;
      else break;
    }
    return s;
  })();

  return (
    <div style={{ padding: "0 0 100px" }}>
      {/* Hero Header */}
      <div style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)", padding: "40px 20px 30px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)" }}/>
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)" }}/>
        <p style={{ color: "#6b7280", fontSize: 13, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 6px" }}>20-Week Program</p>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 4px", letterSpacing: -1 }}>CROSSFIT TRACKER</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Week {currentWeek} · {getPhaseForWeek(currentWeek).icon} {getPhaseForWeek(currentWeek).name} Phase</p>
        
        {/* Progress bar */}
        <div style={{ marginTop: 20, background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 8, overflow: "hidden" }}>
          <div style={{ width: `${(completedWorkouts/totalWorkouts)*100}%`, height: "100%", background: `linear-gradient(90deg, ${getPhaseForWeek(currentWeek).color}, #f59e0b)`, borderRadius: 8, transition: "width 0.5s" }}/>
        </div>
        <p style={{ color: "#9ca3af", fontSize: 12, margin: "6px 0 0" }}>{completedWorkouts}/{totalWorkouts} workouts complete · {Math.round((completedWorkouts/totalWorkouts)*100)}%</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "16px 16px 0" }}>
        {[
          { label: "Completed", value: completedWorkouts, color: "#4ade80" },
          { label: "Skipped", value: skippedWorkouts, color: "#f87171" },
          { label: "Streak", value: `${streak}🔥`, color: "#fb923c" },
        ].map(s => (
          <div key={s.label} style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: "14px 10px", textAlign: "center" }}>
            <div style={{ color: s.color, fontSize: 24, fontWeight: 900 }}>{s.value}</div>
            <div style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Today's Workout */}
      <div style={{ padding: "16px 16px 0" }}>
        <p style={{ color: "#6b7280", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Continue Training</p>
        {WEEKS_DATA.filter(w => w.week === currentWeek).map(wd => (
          <div key={wd.week}>
            {wd.days.map(day => {
              const log = getLog(wd.week, day.day);
              if (log) return null;
              const phase = getPhaseForWeek(wd.week);
              return (
                <div key={day.day} onClick={() => { setSelectedWeek(wd.week); setSelectedDay(day.day); setTab("program"); }}
                  style={{ background: "#111", border: `1px solid ${phase.color}33`, borderLeft: `3px solid ${phase.color}`, borderRadius: 16, padding: 16, cursor: "pointer", marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ color: "#6b7280", fontSize: 11, margin: "0 0 2px" }}>Week {wd.week} · {getDayName(day.day)}</p>
                      <p style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: 0 }}>{day.title}</p>
                      <p style={{ color: phase.color, fontSize: 12, margin: "4px 0 0" }}>{day.wod?.name} · {day.wod?.type}</p>
                    </div>
                    <div style={{ color: "#4b5563" }}><Icon name="chevron" size={20}/></div>
                  </div>
                </div>
              );
            }).filter(Boolean).slice(0,1)}
          </div>
        ))}
      </div>

      {/* Phase overview */}
      <div style={{ padding: "16px 16px 0" }}>
        <p style={{ color: "#6b7280", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Program Phases</p>
        {PHASES.map(phase => {
          const phaseWorkouts = WEEKS_DATA.filter(w => phase.weeks.includes(w.week)).reduce((s, w) => s + w.days.length, 0);
          const phaseDone = WEEKS_DATA.filter(w => phase.weeks.includes(w.week)).reduce((s, w) => s + w.days.filter(d => logs[logKey(w.week, d.day)]?.completed).length, 0);
          return (
            <div key={phase.name} style={{ display: "flex", alignItems: "center", gap: 12, background: "#111", border: "1px solid #222", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{phase.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#e5e7eb", fontSize: 14, fontWeight: 600 }}>{phase.name}</span>
                  <span style={{ color: "#6b7280", fontSize: 12 }}>{phaseDone}/{phaseWorkouts}</span>
                </div>
                <div style={{ background: "#1f2937", borderRadius: 4, height: 4, marginTop: 6, overflow: "hidden" }}>
                  <div style={{ width: `${phaseWorkouts ? (phaseDone/phaseWorkouts)*100 : 0}%`, height: "100%", background: phase.color, borderRadius: 4 }}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProgramView({ logs, selectedWeek, selectedDay, setSelectedWeek, setSelectedDay, setTab, getPhaseForWeek, getDayName, logKey, getLog, setLogModal, setLogForm, saveLogs, Icon, currentWeek }) {
  if (selectedDay !== null && selectedWeek !== null) {
    const weekData = WEEKS_DATA.find(w => w.week === selectedWeek);
    const dayData = weekData?.days.find(d => d.day === selectedDay);
    if (!dayData) return null;
    const log = getLog(selectedWeek, selectedDay);
    const phase = getPhaseForWeek(selectedWeek);

    return (
      <div style={{ padding: "0 0 100px" }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, #0f0f0f, ${phase.color}22)`, padding: "50px 20px 24px", borderBottom: "1px solid #222" }}>
          <button onClick={() => setSelectedDay(null)} style={{ background: "none", border: "none", color: "#9ca3af", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", padding: 0, marginBottom: 12 }}>
            <Icon name="back" size={18}/> <span style={{ fontSize: 14 }}>Week {selectedWeek}</span>
          </button>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: phase.color, fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 4px" }}>{phase.icon} {phase.name} · {getDayName(dayData.day)}</p>
              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>{dayData.title}</h2>
              <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>{dayData.type}</p>
            </div>
            <div style={{ background: log?.completed ? "#166534" : log ? "#7f1d1d" : "#1f2937", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: log?.completed ? "#4ade80" : log ? "#f87171" : "#6b7280" }}>
              {log?.completed ? "✓ Done" : log ? "✗ Skipped" : "Pending"}
            </div>
          </div>
        </div>

        <div style={{ padding: "0 16px" }}>
          {/* Warm-up */}
          {dayData.warmup && (
            <div style={{ marginTop: 16, background: "#111", borderRadius: 16, padding: 16, border: "1px solid #222" }}>
              <p style={{ color: "#f59e0b", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>🔥 Warm-Up</p>
              <p style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{dayData.warmup}</p>
            </div>
          )}

          {/* Strength */}
          {dayData.strength && (
            <div style={{ marginTop: 12, background: "#111", borderRadius: 16, padding: 16, border: "1px solid #374151" }}>
              <p style={{ color: "#60a5fa", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>💪 Strength / Skill</p>
              <p style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{dayData.strength}</p>
            </div>
          )}

          {/* WOD */}
          <div style={{ marginTop: 12, background: `${phase.color}11`, borderRadius: 16, padding: 16, border: `1px solid ${phase.color}33` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <p style={{ color: phase.color, fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>⚡ WOD</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9ca3af", fontSize: 12 }}>
                <Icon name="timer" size={14}/> {dayData.wod?.timeCap} min cap
              </div>
            </div>
            <p style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>{dayData.wod?.name}</p>
            <p style={{ color: phase.color, fontSize: 12, margin: "0 0 12px" }}>{dayData.wod?.type}</p>
            <p style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px", whiteSpace: "pre-line" }}>{dayData.wod?.description}</p>
            {dayData.wod?.scaling && (
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "10px 12px" }}>
                <p style={{ color: "#9ca3af", fontSize: 11, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>Scale</p>
                <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>{dayData.wod.scaling}</p>
              </div>
            )}
          </div>

          {/* Equipment substitutions note */}
          <div style={{ marginTop: 12, background: "#0c1a0c", borderRadius: 16, padding: 14, border: "1px solid #14532d" }}>
            <p style={{ color: "#4ade80", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>📦 Equipment Subs</p>
            <p style={{ color: "#86efac", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
              Rowing → 400m run or 3 min jump rope<br/>
              Assault Bike → burpees or jump rope<br/>
              Box jumps → broad jumps or tuck jumps
            </p>
          </div>

          {/* Log */}
          {log && (
            <div style={{ marginTop: 12, background: log.completed ? "#052e16" : "#1c0607", borderRadius: 16, padding: 16, border: `1px solid ${log.completed ? "#166534" : "#7f1d1d"}` }}>
              <p style={{ color: log.completed ? "#4ade80" : "#f87171", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>
                {log.completed ? "✓ Logged Performance" : "✗ Skipped"}
              </p>
              {log.time && <p style={{ color: "#d1d5db", fontSize: 13, margin: "0 0 4px" }}>⏱ Time: <strong>{log.time}</strong></p>}
              {log.weight && <p style={{ color: "#d1d5db", fontSize: 13, margin: "0 0 4px" }}>🏋️ Weight: <strong>{log.weight}</strong></p>}
              {log.rpe && <p style={{ color: "#d1d5db", fontSize: 13, margin: "0 0 4px" }}>💥 RPE: <strong>{log.rpe}/10</strong></p>}
              {log.notes && <p style={{ color: "#9ca3af", fontSize: 13, margin: "4px 0 0", fontStyle: "italic" }}>"{log.notes}"</p>}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => { setLogModal({ week: selectedWeek, day: selectedDay }); setLogForm({ completed: true, time: "", weight: "", notes: "", rpe: 7, ...(log || {}) }); }}
              style={{ flex: 1, background: phase.color, color: "#000", border: "none", borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name={log ? "edit" : "check"} size={18}/> {log ? "Edit Log" : "Log Workout"}
            </button>
            {!log && (
              <button onClick={() => { saveLogs({ ...logs, [logKey(selectedWeek, selectedDay)]: { completed: false, timestamp: new Date().toISOString() } }); }}
                style={{ background: "#1f2937", color: "#9ca3af", border: "1px solid #374151", borderRadius: 14, padding: "14px 16px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="x" size={16}/> Skip
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedWeek !== null) {
    const weekData = WEEKS_DATA.find(w => w.week === selectedWeek);
    const phase = getPhaseForWeek(selectedWeek);
    if (!weekData) return null;
    return (
      <div style={{ padding: "0 0 100px" }}>
        <div style={{ background: `linear-gradient(135deg, #0f0f0f, ${phase.color}22)`, padding: "50px 20px 24px", borderBottom: "1px solid #222" }}>
          <button onClick={() => setSelectedWeek(null)} style={{ background: "none", border: "none", color: "#9ca3af", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", padding: 0, marginBottom: 12 }}>
            <Icon name="back" size={18}/> <span style={{ fontSize: 14 }}>All Weeks</span>
          </button>
          <p style={{ color: phase.color, fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 4px" }}>{phase.icon} {phase.name}</p>
          <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: 0 }}>Week {selectedWeek}</h2>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 0" }}>{weekData.phase}</p>
        </div>
        <div style={{ padding: "16px" }}>
          {weekData.days.map(day => {
            const log = getLog(selectedWeek, day.day);
            return (
              <div key={day.day} onClick={() => setSelectedDay(day.day)}
                style={{ background: "#111", border: `1px solid ${log?.completed ? "#166534" : log ? "#7f1d1d" : "#222"}`, borderRadius: 16, padding: 16, marginBottom: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: log?.completed ? "#166534" : log ? "#7f1d1d" : "#1f2937", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {log?.completed ? <Icon name="check" size={20} color="#4ade80"/> : log ? <Icon name="x" size={20} color="#f87171"/> : <span style={{ color: "#6b7280", fontWeight: 700, fontSize: 14 }}>{getDayName(day.day)}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#e5e7eb", fontSize: 15, fontWeight: 700, margin: 0 }}>{day.title}</p>
                  <p style={{ color: "#6b7280", fontSize: 12, margin: "2px 0 0" }}>{day.wod?.name} · {day.type}</p>
                  {log?.time && <p style={{ color: "#9ca3af", fontSize: 11, margin: "2px 0 0" }}>⏱ {log.time} · RPE {log.rpe}</p>}
                </div>
                <Icon name="chevron" size={18} color="#4b5563"/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // All weeks
  return (
    <div style={{ padding: "0 0 100px" }}>
      <div style={{ background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)", padding: "50px 20px 20px", borderBottom: "1px solid #222" }}>
        <p style={{ color: "#6b7280", fontSize: 11, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 4px" }}>Full Schedule</p>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: 0 }}>20-Week Program</h2>
      </div>
      <div style={{ padding: "16px" }}>
        {PHASES.map(phase => (
          <div key={phase.name} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{phase.icon}</span>
              <span style={{ color: phase.color, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{phase.name.toUpperCase()}</span>
              <span style={{ color: "#374151", fontSize: 12 }}>Weeks {phase.weeks[0]}–{phase.weeks[phase.weeks.length-1]}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {phase.weeks.map(wNum => {
                const wd = WEEKS_DATA.find(w => w.week === wNum);
                if (!wd) return null;
                const done = wd.days.filter(d => logs[logKey(wNum, d.day)]?.completed).length;
                const total = wd.days.length;
                const isCurrent = wNum === currentWeek;
                return (
                  <div key={wNum} onClick={() => setSelectedWeek(wNum)}
                    style={{ background: "#111", border: `1px solid ${isCurrent ? phase.color : "#222"}`, borderRadius: 14, padding: 14, cursor: "pointer", position: "relative", overflow: "hidden" }}>
                    {isCurrent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: phase.color }}/>}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ color: isCurrent ? phase.color : "#9ca3af", fontSize: 12, fontWeight: 700, margin: "0 0 2px" }}>Week {wNum}{isCurrent ? " 📍" : ""}</p>
                        <p style={{ color: "#6b7280", fontSize: 11, margin: 0 }}>{done}/{total} done</p>
                      </div>
                      <div style={{ width: 32, height: 32, position: "relative" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="13" fill="none" stroke="#1f2937" strokeWidth="3"/>
                          <circle cx="16" cy="16" r="13" fill="none" stroke={done===total ? "#4ade80" : phase.color} strokeWidth="3"
                            strokeDasharray={`${(done/total)*81.7} 81.7`} strokeLinecap="round" transform="rotate(-90 16 16)"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIView({ aiChats, aiLoading, sendAiMessage, Icon }) {
  const [aiInput, setAiInput] = useState("");
  const suggestions = [
    "Analyze my recent performance and suggest adjustments for next week",
    "I'm feeling tired — should I deload?",
    "What weight should I aim for on today's back squat?",
    "How am I progressing overall?",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f0f0f, #1a0e2e)", padding: "50px 20px 16px", borderBottom: "1px solid #222", flexShrink: 0 }}>
        <p style={{ color: "#a78bfa", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 4px" }}>AI Powered</p>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: 0 }}>Your Coach</h2>
        <p style={{ color: "#6b7280", fontSize: 12, margin: "4px 0 0" }}>Analyzes your logs & adapts your program</p>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
        {aiChats.length === 0 && (
          <div style={{ paddingBottom: 16 }}>
            <div style={{ background: "#1a0e2e", border: "1px solid #4c1d95", borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <p style={{ color: "#a78bfa", fontWeight: 700, margin: "0 0 8px" }}>👋 Hey, I'm your AI CrossFit Coach!</p>
              <p style={{ color: "#c4b5fd", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                I have full access to your workout logs, performance data, and your 20-week program. Ask me anything — I'll analyze your progress and adapt your training.
              </p>
            </div>
            <p style={{ color: "#6b7280", fontSize: 12, margin: "0 0 10px" }}>Try asking:</p>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => sendAiMessage(s)}
                style={{ display: "block", width: "100%", background: "#111", border: "1px solid #374151", borderRadius: 12, padding: "12px 14px", color: "#d1d5db", fontSize: 13, textAlign: "left", cursor: "pointer", marginBottom: 8 }}>
                {s}
              </button>
            ))}
          </div>
        )}
        {aiChats.map((msg, i) => (
          <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%",
              background: msg.role === "user" ? "#4c1d95" : "#111",
              border: msg.role === "assistant" ? "1px solid #374151" : "none",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "12px 14px",
            }}>
              {msg.role === "assistant" && <p style={{ color: "#a78bfa", fontSize: 10, fontFamily: "monospace", margin: "0 0 6px", letterSpacing: 1 }}>COACH</p>}
              <p style={{ color: msg.role === "user" ? "#e9d5ff" : "#d1d5db", fontSize: 14, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{msg.content}</p>
              <p style={{ color: msg.role === "user" ? "#7c3aed" : "#374151", fontSize: 10, margin: "6px 0 0", textAlign: "right" }}>{msg.time}</p>
            </div>
          </div>
        ))}
        {aiLoading && (
          <div style={{ display: "flex", gap: 4, padding: "12px 0" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, background: "#a78bfa", borderRadius: "50%", animation: `bounce 1s ${i*0.2}s infinite` }}/>)}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px 16px", borderTop: "1px solid #1f2937", background: "#0a0a0a", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={aiInput} onChange={e => setAiInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendAiMessage()}
            placeholder="Ask your coach..."
            style={{ flex: 1, background: "#111", border: "1px solid #374151", borderRadius: 14, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none" }}/>
          <button onClick={() => sendAiMessage()} disabled={!aiInput.trim() || aiLoading}
            style={{ background: aiInput.trim() && !aiLoading ? "#7c3aed" : "#1f2937", color: "#fff", border: "none", borderRadius: 14, padding: "12px 16px", cursor: aiInput.trim() ? "pointer" : "default", display: "flex", alignItems: "center" }}>
            <Icon name="send" size={18}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsView({ logs, completedWorkouts, Icon }) {
  const benchmarks = ["Fran", "Cindy", "Helen", "Annie", "Isabel", "Grace", "Elizabeth", "Diane", "Mary"];
  const benchmarkLogs = Object.entries(logs).map(([key, val]) => {
    const [, w, d] = key.match(/w(\d+)_d(\d+)/) || [];
    const wd = WEEKS_DATA.find(x => x.week == w);
    const dd = wd?.days.find(x => x.day == d);
    return { key, week: +w, day: +d, title: dd?.wod?.name || dd?.title, ...val };
  }).filter(l => l.completed && l.time);

  return (
    <div style={{ padding: "0 0 100px" }}>
      <div style={{ background: "linear-gradient(135deg, #0f0f0f, #0a1628)", padding: "50px 20px 20px", borderBottom: "1px solid #222" }}>
        <p style={{ color: "#60a5fa", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 4px" }}>Performance</p>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: 0 }}>Stats & PRs</h2>
      </div>
      <div style={{ padding: "16px" }}>
        {/* Overall */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <p style={{ color: "#60a5fa", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Overview</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Total Logged", value: Object.keys(logs).length },
              { label: "Completed", value: completedWorkouts },
              { label: "Completion Rate", value: `${Object.keys(logs).length ? Math.round((completedWorkouts/Object.keys(logs).length)*100) : 0}%` },
              { label: "Weeks Done", value: `${new Set(Object.keys(logs).map(k => k.match(/w(\d+)/)?.[1])).size}/20` },
            ].map(s => (
              <div key={s.label} style={{ background: "#0a0a0a", borderRadius: 12, padding: "12px 14px" }}>
                <p style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: 0 }}>{s.value}</p>
                <p style={{ color: "#6b7280", fontSize: 12, margin: "2px 0 0" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timed workouts */}
        {benchmarkLogs.length > 0 && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <p style={{ color: "#f59e0b", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>⏱ Timed Performances</p>
            {benchmarkLogs.map((l, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < benchmarkLogs.length-1 ? "1px solid #1f2937" : "none" }}>
                <div>
                  <p style={{ color: "#e5e7eb", fontSize: 14, fontWeight: 600, margin: 0 }}>{l.title}</p>
                  <p style={{ color: "#6b7280", fontSize: 11, margin: "2px 0 0" }}>Week {l.week} · RPE {l.rpe}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#f59e0b", fontSize: 16, fontWeight: 800, margin: 0 }}>{l.time}</p>
                  {l.weight && <p style={{ color: "#9ca3af", fontSize: 11, margin: "2px 0 0" }}>{l.weight}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RPE Chart */}
        {Object.keys(logs).length > 0 && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 16 }}>
            <p style={{ color: "#a78bfa", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 16px" }}>💥 RPE History</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
              {Object.values(logs).filter(l => l.rpe).slice(-20).map((l, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <div style={{ width: "100%", background: l.rpe > 8 ? "#ef4444" : l.rpe > 6 ? "#f97316" : "#4ade80", borderRadius: "4px 4px 0 0", height: `${(l.rpe/10)*70}px`, minHeight: 4 }}/>
                  <span style={{ color: "#4b5563", fontSize: 8 }}>{l.rpe}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "#4b5563", fontSize: 11, textAlign: "center", marginTop: 8 }}>Last {Math.min(Object.values(logs).filter(l=>l.rpe).length, 20)} sessions</p>
          </div>
        )}

        {Object.keys(logs).length === 0 && (
          <div style={{ textAlign: "center", padding: 40 }}>
            <p style={{ fontSize: 40, marginBottom: 8 }}>📊</p>
            <p style={{ color: "#6b7280", fontSize: 15 }}>Log some workouts to see your stats!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LogModal({ logModal, setLogModal, logForm, setLogForm, submitLog, getPhaseForWeek, WEEKS_DATA, Icon }) {
  if (!logModal) return null;
  const weekData = WEEKS_DATA.find(w => w.week === logModal.week);
  const dayData = weekData?.days.find(d => d.day === logModal.day);
  const phase = getPhaseForWeek(logModal.week);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#0f0f0f", borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 40px", border: "1px solid #222", borderBottom: "none", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ width: 40, height: 4, background: "#374151", borderRadius: 2, margin: "0 auto 20px" }}/>
        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>Log Workout</h3>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 20px" }}>{dayData?.title}</p>

        {/* Completed toggle */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[{ label: "✓ Completed", val: true, color: "#4ade80", bg: "#052e16" }, { label: "✗ Skipped", val: false, color: "#f87171", bg: "#1c0607" }].map(opt => (
            <button key={opt.val.toString()} onClick={() => setLogForm(f => ({ ...f, completed: opt.val }))}
              style={{ flex: 1, padding: 12, borderRadius: 12, border: `2px solid ${logForm.completed === opt.val ? opt.color : "#374151"}`, background: logForm.completed === opt.val ? opt.bg : "#111", color: logForm.completed === opt.val ? opt.color : "#6b7280", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              {opt.label}
            </button>
          ))}
        </div>

        {logForm.completed && <>
          {/* Time */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 6 }}>TIME (e.g. "12:34" or "As Rx")</label>
            <input value={logForm.time} onChange={e => setLogForm(f => ({ ...f, time: e.target.value }))}
              placeholder="12:34" style={{ width: "100%", background: "#111", border: "1px solid #374151", borderRadius: 12, padding: "12px 14px", color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }}/>
          </div>

          {/* Weight */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 6 }}>WEIGHT USED (e.g. "135 lbs" or "95/65")</label>
            <input value={logForm.weight} onChange={e => setLogForm(f => ({ ...f, weight: e.target.value }))}
              placeholder="135 lbs" style={{ width: "100%", background: "#111", border: "1px solid #374151", borderRadius: 12, padding: "12px 14px", color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }}/>
          </div>

          {/* RPE */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 8 }}>RPE (Rate of Perceived Exertion): <strong style={{ color: "#fff" }}>{logForm.rpe}/10</strong></label>
            <div style={{ display: "flex", gap: 4 }}>
              {[1,2,3,4,5,6,7,8,9,10].map(r => (
                <button key={r} onClick={() => setLogForm(f => ({ ...f, rpe: r }))}
                  style={{ flex: 1, height: 40, borderRadius: 8, border: "none", background: logForm.rpe >= r ? (r > 8 ? "#ef4444" : r > 6 ? "#f97316" : "#4ade80") : "#1f2937", cursor: "pointer", fontSize: 10, color: logForm.rpe >= r ? "#fff" : "#6b7280", fontWeight: 700 }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </>}

        {/* Notes */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 6 }}>NOTES (optional)</label>
          <textarea value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="How did it feel? Any PRs? Modifications used?"
            rows={3} style={{ width: "100%", background: "#111", border: "1px solid #374151", borderRadius: 12, padding: "12px 14px", color: "#fff", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}/>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setLogModal(null)} style={{ flex: 0.4, padding: 14, background: "#1f2937", color: "#9ca3af", border: "none", borderRadius: 14, fontSize: 15, cursor: "pointer" }}>Cancel</button>
          <button onClick={submitLog} style={{ flex: 1, padding: 14, background: phase.color, color: "#000", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
            Save Log
          </button>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [logs, setLogs] = useState({});
  const [aiChats, setAiChats] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [logModal, setLogModal] = useState(null); // {week, day}
  const [logForm, setLogForm] = useState({ completed: true, time: "", weight: "", notes: "", rpe: 7 });
  const [storageReady, setStorageReady] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const logsData = lsGet(STORAGE_KEYS.logs);
      if (logsData) setLogs(JSON.parse(logsData));
      const chatData = lsGet(STORAGE_KEYS.aiChats);
      if (chatData) setAiChats(JSON.parse(chatData));
    } catch {}
    setStorageReady(true);
  }, []);

  // Save to localStorage
  const saveLogs = (newLogs) => {
    setLogs(newLogs);
    lsSet(STORAGE_KEYS.logs, JSON.stringify(newLogs));
  };

  const saveChats = (newChats) => {
    setAiChats(newChats);
    lsSet(STORAGE_KEYS.aiChats, JSON.stringify(newChats));
  };

  const logKey = (w, d) => `w${w}_d${d}`;

  const getLog = (w, d) => logs[logKey(w, d)];

  const submitLog = () => {
    const { week, day } = logModal;
    const newLogs = { ...logs, [logKey(week, day)]: { ...logForm, timestamp: new Date().toISOString() } };
    saveLogs(newLogs);
    setLogModal(null);
    setLogForm({ completed: true, time: "", weight: "", notes: "", rpe: 7 });
  };

  // Compute overall stats
  const totalWorkouts = WEEKS_DATA.reduce((s, w) => s + w.days.length, 0);
  const completedWorkouts = Object.values(logs).filter(l => l.completed).length;
  const skippedWorkouts = Object.values(logs).filter(l => !l.completed).length;

  // Current week (first week with incomplete days)
  const currentWeek = (() => {
    for (const wd of WEEKS_DATA) {
      const done = wd.days.every(d => logs[logKey(wd.week, d.day)]);
      if (!done) return wd.week;
    }
    return 20;
  })();

  // AI Trainer
  const sendAiMessage = async (customMsg) => {
    const msg = customMsg || aiInput.trim();
    if (!msg) return;
    setAiLoading(true);

    // Build context from logs
    const recentLogs = Object.entries(logs).slice(-10).map(([k, v]) => {
      const [, w, d] = k.match(/w(\d+)_d(\d+)/) || [];
      const wData = WEEKS_DATA.find(x => x.week == w);
      const dData = wData?.days.find(x => x.day == d);
      return { workout: dData?.title || k, completed: v.completed, time: v.time, weight: v.weight, rpe: v.rpe, notes: v.notes };
    });

    const upcomingWeek = WEEKS_DATA.find(w => w.week === currentWeek);

    const systemPrompt = `You are an elite CrossFit coach and physical therapist with 20+ years experience. You have access to your athlete's workout logs and can see their performance data.

ATHLETE CONTEXT:
- Following a 20-week CrossFit program
- Equipment: pull-up bar, squat rack, Olympic barbell, 260 lbs plates, pairs of 10/20/35 lb dumbbells
- No injuries
- Currently on Week ${currentWeek} of 20
- Completed ${completedWorkouts}/${totalWorkouts} workouts

RECENT PERFORMANCE DATA (last 10 sessions):
${JSON.stringify(recentLogs, null, 2)}

UPCOMING WEEK ${currentWeek} WORKOUTS:
${JSON.stringify(upcomingWeek?.days?.map(d => ({ title: d.title, type: d.type, wod: d.wod?.name })), null, 2)}

PROGRAM PHASES:
- Foundation (Weeks 1-4): Baseline, technique, movement patterns
- Build (Weeks 5-8): Increasing intensity, barbell cycling
- Strength (Weeks 9-12): Heavy lifting, strength-metcon balance
- Peak (Weeks 13-16): High intensity, complex WODs
- Performance (Weeks 17-20): PR testing, competition-style

Your role: Analyze performance data, identify trends, and provide specific, actionable coaching advice. Be direct, encouraging, and specific. Keep responses concise but impactful. If they give RPE/times/weights, analyze what it means for progression. Suggest specific modifications to upcoming workouts based on their data.`;

    const newUserMsg = { role: "user", content: msg, time: new Date().toLocaleTimeString() };
    const updatedChats = [...aiChats, newUserMsg];
    saveChats(updatedChats);

    try {
      const history = updatedChats.slice(-12).map(c => ({ role: c.role, content: c.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I couldn't process that. Try again!";
      const aiMsg = { role: "assistant", content: reply, time: new Date().toLocaleTimeString() };
      saveChats([...updatedChats, aiMsg]);
    } catch (e) {
      const errMsg = { role: "assistant", content: "Connection error. Check your network and try again.", time: new Date().toLocaleTimeString() };
      saveChats([...updatedChats, errMsg]);
    }
    setAiLoading(false);
  };

  // ============================================================
  // VIEWS
  // ============================================================

  // ============================================================
  // LAYOUT
  // ============================================================
  const tabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "program", label: "Program", icon: "calendar" },
    { id: "coach", label: "AI Coach", icon: "brain" },
    { id: "stats", label: "Stats", icon: "chart" },
  ];

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", maxWidth: 430, margin: "0 auto", position: "relative" }}>
      <style>{`
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #4b5563; }
        ::-webkit-scrollbar { width: 0; }
        @keyframes bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      `}</style>

      {/* Main content */}
      <div style={{ paddingBottom: 80 }}>
        {tab === "home" && <HomeView logs={logs} currentWeek={currentWeek} completedWorkouts={completedWorkouts} skippedWorkouts={skippedWorkouts} totalWorkouts={totalWorkouts} setSelectedWeek={setSelectedWeek} setSelectedDay={setSelectedDay} setTab={setTab} getPhaseForWeek={getPhaseForWeek} getDayName={getDayName} logKey={logKey} Icon={Icon} />}
        {tab === "program" && <ProgramView logs={logs} selectedWeek={selectedWeek} selectedDay={selectedDay} setSelectedWeek={setSelectedWeek} setSelectedDay={setSelectedDay} setTab={setTab} getPhaseForWeek={getPhaseForWeek} getDayName={getDayName} logKey={logKey} getLog={getLog} setLogModal={setLogModal} setLogForm={setLogForm} saveLogs={saveLogs} Icon={Icon} currentWeek={currentWeek} />}
        {tab === "coach" && <AIView aiChats={aiChats} aiLoading={aiLoading} sendAiMessage={sendAiMessage} Icon={Icon} />}
        {tab === "stats" && <StatsView logs={logs} completedWorkouts={completedWorkouts} Icon={Icon} />}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid #1f2937", display: "flex", padding: "8px 0 20px", zIndex: 100 }}>
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => { setTab(t.id); if (t.id !== "program") { setSelectedWeek(null); setSelectedDay(null); } }}
              style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 0" }}>
              <div style={{ color: active ? (t.id === "coach" ? "#a78bfa" : t.id === "stats" ? "#60a5fa" : "#4ade80") : "#4b5563", transition: "color 0.2s" }}>
                <Icon name={t.icon} size={22}/>
              </div>
              <span style={{ fontSize: 10, color: active ? "#9ca3af" : "#374151", fontWeight: active ? 600 : 400 }}>{t.label}</span>
            </button>
          );
        })}
      </div>

      <LogModal logModal={logModal} setLogModal={setLogModal} logForm={logForm} setLogForm={setLogForm} submitLog={submitLog} getPhaseForWeek={getPhaseForWeek} WEEKS_DATA={WEEKS_DATA} Icon={Icon} />
    </div>
  );
}
