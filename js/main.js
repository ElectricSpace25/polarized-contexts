// Imports
import { config } from './config.js';
import { jsPsych } from './init.js';
import * as content from './content.js';

// Get Prolific ID from URL
const urlParams = new URLSearchParams(window.location.search);
const prolificID = urlParams.get("participant_id") || "unknown"; // If no Prolific ID is provided in the URL, the ID will be reported as 'unknown'
//TODO: Actually save ID to data

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
    survey_json: content.screenerTrial,
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

//TODO: INSERT ADAPATATION TRIAL

const instructionsTrial = {
    type: jsPsychSurvey,
    survey_json: content.instructionsContent,
    data: { trial_name: "instructions" }
};

//TODO: INSERT TEST TRIALS

const demographicsTrial = {
    type: jsPsychSurvey,
    survey_json: content.demographicsContent,
    data: { trial_name: "demographics" }
};


// Timeline
var timeline = [];

timeline.push(
    //preload
    screenerTrial,
    adaptationInstructionsTrial,
    //adaptation trials
    instructionsTrial,
    //test trials
    demographicsTrial
    //finish trial probably
);

jsPsych.run(timeline);