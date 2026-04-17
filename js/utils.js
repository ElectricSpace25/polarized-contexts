import { jsPsych } from './init.js';
import { config, adaptationFaces } from './config.js';

export function setupAdaptation(condition) {
    let faces;

    switch (condition) {
        case "trustworthy":
            faces = adaptationFaces.trustworthy;
            break;
        case "untrustworthy":
            faces = adaptationFaces.untrustworthy;
            break;
        case "bimodal":
            // Expects trustworthy and untrustworthy lists to be same (odd) length
            console.log("howdy")
            faces = [
                ...jsPsych.randomization.shuffle(adaptationFaces.untrustworthy).slice(0, adaptationFaces.untrustworthy.length / 2),
                ...jsPsych.randomization.shuffle(adaptationFaces.trustworthy).slice(0, adaptationFaces.untrustworthy.length / 2)
            ];
            break;
    }

    if (config.DEBUG_LOGS) console.log("Faces set:", faces)

    let adaptationTimelineVariables = [];

    for (let i = 0; i < config.NUM_ADAPTATION_REPETITIONS; i++) {
        // Shuffle faces
        const shuffledFaces = jsPsych.randomization.shuffle(faces);

        // Add img tag and highlight class
        const formattedFaces = shuffledFaces.map((path, index) => {
            const imgTag = index < config.NUM_HIGHLIGHTED_FACES
                ? `<img src="${path}" class="highlighted-face">`
                : `<img src="${path}">`;

            return { face: imgTag };
        });

        // Shuffle again
        const finalFaces = jsPsych.randomization.shuffle(formattedFaces);

        // Add to list
        adaptationTimelineVariables = adaptationTimelineVariables.concat(finalFaces);
    }

    if (config.DEBUG_LOGS) console.log("Adaptation timeline variables:", adaptationTimelineVariables)

    return adaptationTimelineVariables;
}