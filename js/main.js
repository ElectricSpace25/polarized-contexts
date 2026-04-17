// Imports
import { config, ratingFaces } from './config.js';
import { jsPsych } from './init.js';
import * as utils from "./utils.js";
import * as content from './content.js';

const startTime = new Date().toLocaleString(); // Records the date and time at the start of the study
export let complete = false; // This is set to true at the end of the study to indicate completion

// Get Prolific ID from URL
const urlParams = new URLSearchParams(window.location.search);
const prolificID = urlParams.get("participant_id") || "unknown"; // If no Prolific ID is provided in the URL, the ID will be reported as 'unknown'

// Assign Condition
const conditions = ["trustworthy", "untrustworthy", "bimodal"];
const condition = jsPsych.randomization.sampleWithoutReplacement(conditions, 1)[0];
if (config.DEBUG_LOGS) console.log(`Condition: ${condition}`);


// Timeline variables
const adapatationTimelineVariables = utils.setupAdaptation(condition);

const ratingTimelineVariables = ratingFaces.map(face => ({
    face: face,
}));


// Preload
// const preloadVideos = {
//     type: jsPsychPreload,
//     video: , // ADD IMAGES TO PRELOAD
//     message: "Please wait while we load the study.",
//     data: { trial_name: "preload" }
// }

// Trials
const screenerTrial = {
    type: jsPsychSurvey,
    survey_json: content.screenerContent,
    on_finish: function (data) {
        if (data.response.english == "No" || data.response.attention_check != "Other") {
            // Attention/Language check failed -> study will terminate with a failure code and no data saved
            jsPsych.abortExperiment();
        }
    },
    data: { trial_name: "screener" }
};

const adaptationInstructionsTrial = {
    type: jsPsychSurvey,
    survey_json: content.adaptationInstructionsContent,
    data: { trial_name: "adaptation_instructions" }
};

const adaptationTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: jsPsych.timelineVariable("face"),
    choices: [],
    trial_duration: 3000,
    data: { trial_name: "adaptation" }
};

const fixationTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "+",
    choices: [],
    trial_duration: 500,
    data: { trial_name: "fixation" }
};

const instructionsTrial = {
    type: jsPsychSurvey,
    survey_json: content.instructionsContent,
    data: { trial_name: "instructions" }
};

const ratingTrial = {
    type: jsPsychImageButtonResponse,
    stimulus: jsPsych.timelineVariable("face"),
    prompt: `<div id="prompt">How trustworthy is this face?</div>`,
    choices: ["Extremely untrustworthy", "Moderately untrustworthy", "Slightly untrustworthy", "Neutral", "Moderately trustworthy", "Slightly trustworthy", "Extremely trustworthy"],
    data: { trial_name: "rating" }
};

const demographicsTrial = {
    type: jsPsychSurvey,
    survey_json: content.demographicsContent,
    data: { trial_name: "demographics" }
};

const finishedTrial = {
    type: jsPsychSurvey,
    survey_json: content.finishedContent,
    data: { trial_name: "info", prolific_id: prolificID, start_time: startTime, condition: condition},
    on_finish: function (data) {
        // Can't add end_time with data: {} because it will calculate time at start
        data.end_time = new Date().toLocaleString();
        complete = true;
    },
};


// Timeline
var timeline = [];

const adaptationTimeline = {
    timeline: [
        fixationTrial,
        adaptationTrial,
    ],
    timeline_variables: adapatationTimelineVariables
};

const ratingTimeline = {
    timeline: [
        ratingTrial
    ],
    timeline_variables: ratingTimelineVariables
};

timeline.push(
    //preload
    // screenerTrial,
    // adaptationInstructionsTrial,
    adaptationTimeline,
    // instructionsTrial,
    // ratingTimeline,
    // demographicsTrial,
    // finishedTrial
);

jsPsych.run(timeline);